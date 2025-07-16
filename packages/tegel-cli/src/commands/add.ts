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
import { CLI_VERSION } from '../core/metadata';

export const addCommand = new Command()
  .name('add')
  .description('Add Tegel components to your project')
  .argument('[components...]', 'component names to add')
  .option('-p, --prefix <prefix>', 'override default prefix')
  .option('-a, --all', 'add all available components')
  .option('--no-deps', 'skip dependency installation')
  .option('--dry-run', 'preview changes without writing files')
  .option('-f, --force', 'overwrite existing files')
  .action(async (components: string[], options: CLIOptions) => {
    try {
      const config = await configManager.load();

      if (options.prefix) {
        config.prefix = options.prefix;
      }

      const { resolveTegelSource } = await import('../utils/tegel-source-resolver');
      const tegelSource = await resolveTegelSource();

      logger.debug(`Using Tegel source from: ${tegelSource.root}`);
      logger.debug(`CLI version: ${CLI_VERSION}`);
      logger.debug(`Source type: ${tegelSource.isLocal ? 'local development' : 'bundled'}`);

      if (config.version && semver.gt(CLI_VERSION, config.version)) {
        logger.newline();
        logger.warn(
          `New Tegel version available: ${chalk.cyan(config.version)} → ${chalk.green(
            CLI_VERSION,
          )}`,
        );

        const { shouldUpdate } = await prompts({
          type: 'confirm',
          name: 'shouldUpdate',
          message: 'Would you like to update all installed components to the new version?',
          initial: true,
        });

        if (shouldUpdate) {
          logger.info('Running update command...');
          logger.newline();

          const { updateCommand: updateCmd } = await import('./update');
          await updateCmd.parseAsync(['update', '--all'], { from: 'user' });
          return;
        }
      }

      config.version = CLI_VERSION;

      logger.startSpinner('Scanning Tegel components...');
      const scanner = new ComponentScanner(tegelSource.componentsPath);
      const scanResult = await scanner.scanAll();
      const { allComponents, topLevelComponents } = scanResult;
      logger.stopSpinner(
        true,
        `Found ${allComponents.size} components (${topLevelComponents.size} available to add)`,
      );

      logger.startSpinner('Analyzing dependencies...');
      const analyzer = new DependencyAnalyzer(tegelSource.componentsPath, allComponents);
      await analyzer.analyzeAll();
      logger.stopSpinner(true, 'Dependencies analyzed');

      let componentsToAdd: string[] = [];

      if (options.all) {
        // When using --all, only add top-level components
        componentsToAdd = Array.from(topLevelComponents.keys());
      } else if (components.length === 0) {
        // Interactive selection - only show top-level components
        const choices = Array.from(topLevelComponents.entries()).map(([name, entry]) => ({
          title: `${name} (${entry.tag})`,
          value: name,
          description: entry.metadata.description,
        }));

        const response = await prompts({
          type: 'multiselect',
          name: 'components',
          message: 'Select components to add',
          choices,
          hint: 'Space to select, Enter to confirm',
          instructions: false,
        });

        if (!response.components || response.components.length === 0) {
          logger.info('No components selected');
          process.exit(0);
        }

        componentsToAdd = response.components;
      } else {
        const invalidComponents = components.filter((name) => !topLevelComponents.has(name));
        if (invalidComponents.length > 0) {
          logger.error(`Invalid components: ${invalidComponents.join(', ')}`);

          const subComponentNames = invalidComponents.filter((name) => allComponents.has(name));
          if (subComponentNames.length > 0) {
            logger.info(
              'Note: Sub-components cannot be added directly. They will be included automatically with their parent components.',
            );
            subComponentNames.forEach((subName) => {
              const subComponent = allComponents.get(subName);
              if (subComponent?.metadata.parentComponent) {
                logger.info(
                  `  ${subName} → add '${subComponent.metadata.parentComponent}' instead`,
                );
              }
            });
          }

          logger.info('Available components:');
          logger.list(Array.from(topLevelComponents.keys()).sort());
          process.exit(1);
        }
        componentsToAdd = components;
      }

      const allComponentsToInstall = new Set<string>();
      componentsToAdd.forEach((comp) => {
        allComponentsToInstall.add(comp);
        if (!options.skipDeps) {
          const deps = analyzer.getFullDependencyTree(comp);
          deps.forEach((dep) => allComponentsToInstall.add(dep));
        }
      });

      logger.newline();
      logger.info(`Will add ${allComponentsToInstall.size} component(s):`);

      const componentList = Array.from(allComponentsToInstall).map((name) => {
        const isDep = !componentsToAdd.includes(name);
        return isDep ? `${name} ${chalk.gray('(dependency)')}` : name;
      });
      logger.list(componentList);

      if (options.dryRun) {
        logger.newline();
        logger.info('Dry run mode - no files will be written');

        Array.from(allComponentsToInstall).forEach((compName) => {
          const component = allComponents.get(compName)!;
          logger.newline();
          logger.info(`Component: ${compName}`);
          logger.list([
            `Tag: ${component.tag} → ${config.prefix}-${component.tag.replace('tds-', '')}`,
            `Files: ${component.files.component}`,
            ...component.files.styles.map((f) => `       ${f}`),
          ]);
        });

        process.exit(0);
      }

      if (!options.force) {
        const { proceed } = await prompts({
          type: 'confirm',
          name: 'proceed',
          message: 'Continue with installation?',
          initial: true,
        });

        if (!proceed) {
          logger.info('Installation cancelled');
          process.exit(0);
        }
      }

      // Check for npm dependencies
      const dependenciesPath = path.join(tegelSource.root, 'dependencies.json');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let componentDependencies: any = {};

      if (await fs.pathExists(dependenciesPath)) {
        const dependenciesData = await fs.readJSON(dependenciesPath);
        componentDependencies = dependenciesData.componentDependencies || {};
      }

      // Collect all npm dependencies for components being installed
      const npmDependencies = new Map<string, string>();
      const componentNpmDeps: Array<{ component: string; deps: string[] }> = [];

      allComponentsToInstall.forEach((compName) => {
        const deps = componentDependencies[compName];
        if (deps && deps.npm && deps.npm.length > 0) {
          componentNpmDeps.push({ component: compName, deps: deps.npm });
          deps.npm.forEach((dep: string) => {
            const [name, version] = dep.split('@').filter(Boolean);
            npmDependencies.set(`@${name}`, version || 'latest');
          });
        }
      });

      // If there are npm dependencies, inform the user
      if (npmDependencies.size > 0 && !options.dryRun) {
        logger.newline();
        logger.warn('The following components require npm dependencies:');

        componentNpmDeps.forEach(({ component, deps }) => {
          logger.info(`  ${component}: ${deps.join(', ')}`);
        });

        logger.newline();
        logger.info('To install the required dependencies, run:');
        const depsArray = Array.from(npmDependencies.entries()).map(([name, version]) =>
          version === 'latest' ? name : `${name}@${version}`,
        );
        logger.info(chalk.cyan(`  npm install ${depsArray.join(' ')}`));
        logger.newline();

        if (!options.force) {
          const { proceedWithoutDeps } = await prompts({
            type: 'confirm',
            name: 'proceedWithoutDeps',
            message: 'Continue without installing npm dependencies?',
            initial: true,
          });

          if (!proceedWithoutDeps) {
            logger.info('Installation cancelled. Please install the dependencies and try again.');
            process.exit(0);
          }
        }
      }

      logger.newline();
      logger.startSpinner('Installing components...');

      const { ComponentInstaller } = await import('../core/component-installer');

      const result = await ComponentInstaller.install({
        components: Array.from(allComponentsToInstall),
        componentMap: allComponents,
        analyzer,
        config,
        tegelSource,
        force: options.force,
        dryRun: false,
      });

      if (result.success) {
        logger.stopSpinner(
          true,
          `Successfully installed ${result.installedComponents.length} component(s)`,
        );

        logger.newline();
        logger.success('Installation complete!');
        logger.info(`Installed to: ${config.targetDir}`);

        if (result.copiedFiles.length > 0) {
          logger.newline();
          logger.info(`Created ${result.copiedFiles.length} files`);
        }

        logger.newline();
        logger.info('Usage example:');
        const exampleComponent = allComponents.get(componentsToAdd[0]);
        if (exampleComponent) {
          const newTag = exampleComponent.tag.replace('tds', config.prefix);
          logger.code(`<${newTag}>Example</${newTag}>`, 'html');
        }
      } else {
        logger.stopSpinner(false, 'Installation failed');
        if (result.errors) {
          result.errors.forEach((error) => logger.error(error));
        }
        process.exit(1);
      }
    } catch (error: unknown) {
      logger.error('Failed to add components:', error instanceof Error ? error : undefined);
      process.exit(1);
    }
  });
