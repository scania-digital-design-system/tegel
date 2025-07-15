import { Command } from 'commander';
import prompts from 'prompts';
import chalk from 'chalk';
import semver from 'semver';
import path from 'path';
import fs from 'fs-extra';
import { configManager } from '../core/config-manager';
import { logger } from '../core/logger';
import { ComponentScanner } from '../core/registry/component-scanner';
import { DependencyAnalyzer } from '../core/registry/dependency-analyzer';
import { CLIOptions } from '../types/index';

export const updateCommand = new Command()
  .name('update')
  .description('Update existing Tegel components to the latest version')
  .argument('[components...]', 'specific component names to update')
  .option('-a, --all', 'update all installed components')
  .option('--dry-run', 'preview changes without writing files')
  .option('-f, --force', 'skip confirmation prompts')
  .action(async (components: string[], options: CLIOptions) => {
    try {
      // Load configuration
      const config = await configManager.load();

      // Resolve Tegel source location
      const { resolveTegelSource } = await import('../utils/tegel-source-resolver');
      const tegelSource = await resolveTegelSource();

      logger.debug(`Using Tegel source from: ${tegelSource.root}`);
      logger.debug(`Tegel version: ${tegelSource.version}`);
      logger.debug(`Current config version: ${config.version}`);

      // Check if update is needed based on version
      const needsUpdate = semver.gt(tegelSource.version, config.version);

      if (needsUpdate) {
        logger.info(
          `New Tegel version available: ${chalk.cyan(config.version)} → ${chalk.green(
            tegelSource.version,
          )}`,
        );
      } else if (!components.length && !options.all) {
        logger.info('All components are up to date');
        return;
      }

      // Initialize component scanner
      logger.startSpinner('Scanning for installed components...');
      const scanner = new ComponentScanner(tegelSource.componentsPath);
      const scanResult = await scanner.scanAll();
      const { allComponents } = scanResult;

      // Find installed components
      const installedComponents = new Set<string>();
      const componentDir = path.resolve(config.targetDir);

      if (await fs.pathExists(componentDir)) {
        const dirs = await fs.readdir(componentDir);
        await Promise.all(
          dirs.map(async (dir) => {
            const dirPath = path.join(componentDir, dir);
            const stat = await fs.stat(dirPath);
            if (stat.isDirectory() && allComponents.has(dir)) {
              installedComponents.add(dir);
            }
          }),
        );
      }

      logger.stopSpinner(true, `Found ${installedComponents.size} installed components`);

      if (installedComponents.size === 0) {
        logger.warn('No installed components found');
        return;
      }

      // Determine which components to update
      let componentsToUpdate: string[] = [];

      if (options.all || (needsUpdate && components.length === 0)) {
        componentsToUpdate = Array.from(installedComponents);
      } else if (components.length > 0) {
        // Validate specified components
        const invalidComponents = components.filter((c) => !installedComponents.has(c));
        if (invalidComponents.length > 0) {
          logger.error(`Components not installed: ${invalidComponents.join(', ')}`);
          logger.info('Installed components:');
          logger.list(Array.from(installedComponents).sort());
          process.exit(1);
        }
        componentsToUpdate = components;
      } else {
        // Interactive selection
        const choices = Array.from(installedComponents)
          .sort()
          .map((name) => ({
            title: name,
            value: name,
            description: allComponents.get(name)?.metadata.description,
          }));

        const response = await prompts({
          type: 'multiselect',
          name: 'components',
          message: 'Select components to update',
          choices,
          hint: 'Space to select, Enter to confirm',
          instructions: false,
        });

        if (!response.components || response.components.length === 0) {
          logger.info('No components selected');
          return;
        }

        componentsToUpdate = response.components;
      }

      // Initialize dependency analyzer
      const analyzer = new DependencyAnalyzer(tegelSource.componentsPath, allComponents);
      await analyzer.analyzeAll();

      // Resolve all dependencies
      const allComponentsToUpdate = new Set<string>();
      componentsToUpdate.forEach((comp) => {
        allComponentsToUpdate.add(comp);
        const deps = analyzer.getFullDependencyTree(comp);
        deps.forEach((dep) => {
          if (installedComponents.has(dep)) {
            allComponentsToUpdate.add(dep);
          }
        });
      });

      // Show what will be updated
      logger.newline();
      logger.info(`Will update ${allComponentsToUpdate.size} component(s):`);
      logger.list(Array.from(allComponentsToUpdate).sort());

      if (options.dryRun) {
        logger.newline();
        logger.info('Dry run mode - no files will be written');
        return;
      }

      // Confirm before proceeding
      if (!options.force) {
        const { proceed } = await prompts({
          type: 'confirm',
          name: 'proceed',
          message: needsUpdate
            ? `Update all components to version ${tegelSource.version}?`
            : 'Continue with update?',
          initial: true,
        });

        if (!proceed) {
          logger.info('Update cancelled');
          return;
        }
      }

      // Update components
      logger.newline();
      logger.startSpinner('Updating components...');

      const { ComponentInstaller } = await import('../core/component-installer');

      // Update config version
      config.version = tegelSource.version;

      const result = await ComponentInstaller.install({
        components: Array.from(allComponentsToUpdate),
        componentMap: allComponents,
        analyzer,
        config,
        tegelSource,
        force: true, // Force update existing files
        dryRun: false,
        update: true, // Add update flag
      });

      if (result.success) {
        logger.stopSpinner(
          true,
          `Successfully updated ${result.installedComponents.length} component(s)`,
        );

        // Save updated config
        await configManager.save(config);

        logger.newline();
        logger.success('Update complete!');
        logger.info(`Updated to version: ${tegelSource.version}`);

        if (result.copiedFiles.length > 0) {
          logger.newline();
          logger.info(`Updated ${result.copiedFiles.length} files`);
        }
      } else {
        logger.stopSpinner(false, 'Update failed');
        if (result.errors) {
          result.errors.forEach((error) => logger.error(error));
        }
        process.exit(1);
      }
    } catch (error: unknown) {
      logger.error('Failed to update components:', error instanceof Error ? error : String(error));
      process.exit(1);
    }
  });
