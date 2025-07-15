import path from 'path';
import fs from 'fs-extra';
import { ComponentEntry, TransformContext, TegelConfig } from '../types/index';
import { FileCopier } from '../utils/file-copier';
import { DependencyAnalyzer } from './registry/dependency-analyzer';
import { logger } from './logger';
import { TegelSourceInfo } from '../utils/tegel-source-resolver';

export interface InstallOptions {
  components: string[];
  componentMap: Map<string, ComponentEntry>;
  analyzer: DependencyAnalyzer;
  config: TegelConfig;
  tegelSource: TegelSourceInfo;
  force?: boolean;
  dryRun?: boolean;
  update?: boolean;
}

export interface InstallResult {
  success: boolean;
  installedComponents: string[];
  copiedFiles: string[];
  errors?: string[];
}

export class ComponentInstaller {
  static async install(options: InstallOptions): Promise<InstallResult> {
    const {
      components,
      componentMap,
      analyzer,
      config,
      tegelSource,
      force = false,
      dryRun = false,
    } = options;

    const errors: string[] = [];
    const installedComponents: string[] = [];

    // Create transform context
    const context: TransformContext = {
      config,
      component: null!, // Will be set for each component
      sourceRoot: tegelSource.componentsPath,
      targetRoot: path.resolve(config.targetDir),
    };

    // Initialize file copier with Tegel source info and options
    const copier = new FileCopier(context, tegelSource, {
      force,
      update: options.update,
      skipPrompts: dryRun,
    });

    try {
      // Ensure target directory exists
      if (!dryRun) {
        await fs.ensureDir(context.targetRoot);
      }

      // Collect all components to be installed
      const componentsToInstall = components
        .map((name) => componentMap.get(name))
        .filter((c): c is ComponentEntry => c !== undefined);

      // Collect dependencies for all components
      const allUtilities = new Set<string>();
      const allMixins = new Set<string>();
      const allTypes = new Set<string>();
      const allAssets = new Map<string, string>();

      // eslint-disable-next-line no-restricted-syntax
      for (const componentName of components) {
        const component = componentMap.get(componentName);
        if (!component) continue; // eslint-disable-line no-continue

        const utils = analyzer.getAllUtilities(componentName);
        const mixins = analyzer.getAllMixins(componentName);
        const types = analyzer.getAllTypes(componentName);
        const assets = component.dependencies.assets || [];

        utils.forEach((u) => allUtilities.add(u));
        mixins.forEach((m) => allMixins.add(m));
        types.forEach((t) => allTypes.add(t));
        assets.forEach((a) => allAssets.set(a, component.files.component));
      }

      // Collect existing files and prompt for overrides before starting
      if (!dryRun && !force && !options.update) {
        await copier.collectExistingFiles(componentsToInstall, {
          utilities: allUtilities,
          mixins: allMixins,
          types: allTypes,
          assets: allAssets,
        });
        await copier.promptForOverrides();
      }

      // Copy each component
      // eslint-disable-next-line no-restricted-syntax
      for (const componentName of components) {
        const component = componentMap.get(componentName);
        if (!component) {
          errors.push(`Component not found: ${componentName}`);
          continue; // eslint-disable-line no-continue
        }

        logger.info(`Installing ${componentName}...`);

        // Update context with current component
        context.component = component;

        if (dryRun) {
          logger.info(`Would copy component: ${componentName}`);
          logger.list([
            `Main: ${component.files.component}`,
            ...component.files.styles.map((s) => `Style: ${s}`),
          ]);
        } else {
          // Copy component files
          // eslint-disable-next-line no-await-in-loop
          const result = await copier.copyComponent(component);
          if (result.success && result.copiedFiles.length > 0) {
            installedComponents.push(componentName);
          } else if (result.errors) {
            errors.push(...result.errors);
          } else if (result.copiedFiles.length === 0) {
            logger.debug(`No files were copied for ${componentName} (user declined all overrides)`);
          }
        }
      }

      if (!dryRun && installedComponents.length > 0) {
        // Re-collect dependencies only for components that were actually installed
        allUtilities.clear();
        allMixins.clear();
        allTypes.clear();
        allAssets.clear();

        // eslint-disable-next-line no-restricted-syntax
        for (const componentName of installedComponents) {
          const component = componentMap.get(componentName);
          if (!component) continue; // eslint-disable-line no-continue

          const utils = analyzer.getAllUtilities(componentName);
          const mixins = analyzer.getAllMixins(componentName);
          const types = analyzer.getAllTypes(componentName);
          const assets = component.dependencies.assets || [];

          utils.forEach((u) => allUtilities.add(u));
          mixins.forEach((m) => allMixins.add(m));
          types.forEach((t) => allTypes.add(t));
          assets.forEach((a) => allAssets.set(a, component.files.component));
        }

        // Copy utilities
        // eslint-disable-next-line no-restricted-syntax
        for (const utility of allUtilities) {
          logger.debug(`Copying utility: ${utility}`);
          try {
            // eslint-disable-next-line no-await-in-loop
            await copier.copyUtility(utility, `${utility}.ts`);
          } catch (error: unknown) {
            logger.warn(
              `Failed to copy utility ${utility}: ${
                error instanceof Error ? error.message : String(error)
              }`,
            );
          }
        }

        // Copy mixins
        // eslint-disable-next-line no-restricted-syntax
        for (const mixin of allMixins) {
          logger.debug(`Copying mixin: ${mixin}`);
          try {
            // eslint-disable-next-line no-await-in-loop
            await copier.copyMixin(mixin, `_${mixin}.scss`);
          } catch (error: unknown) {
            logger.warn(
              `Failed to copy mixin ${mixin}: ${
                error instanceof Error ? error.message : String(error)
              }`,
            );
          }
        }

        // Copy assets
        // eslint-disable-next-line no-restricted-syntax
        for (const [assetName, componentPath] of allAssets) {
          logger.debug(`Copying asset: ${assetName}`);
          try {
            // eslint-disable-next-line no-await-in-loop
            await copier.copyAsset(assetName, componentPath);
          } catch (error: unknown) {
            logger.warn(
              `Failed to copy asset ${assetName}: ${
                error instanceof Error ? error.message : String(error)
              }`,
            );
          }
        }

        // Copy type dependencies (e.g., icons)
        if (allTypes.has('icons')) {
          logger.debug('Copying icon types...');
          try {
            // eslint-disable-next-line no-await-in-loop
            await copier.copyIconTypes();
          } catch (error: unknown) {
            logger.warn(
              `Failed to copy icon types: ${
                error instanceof Error ? error.message : String(error)
              }`,
            );
          }
        }

        // Copy global styles if this is the first installation and we actually installed components
        if (installedComponents.length > 0) {
          // eslint-disable-next-line no-await-in-loop
          const hasExistingComponents = await ComponentInstaller.hasExistingComponents(
            context.targetRoot,
          );
          if (!hasExistingComponents) {
            logger.debug('Copying global styles...');
            // eslint-disable-next-line no-await-in-loop
            const globalFilesCopied = await copier.copyGlobalStyles();
            logger.debug(`Copied ${globalFilesCopied} global style files`);
          }
        }
      }

      // Get the actual copied files from the copier
      const finalCopiedFiles = copier.getActualCopiedFiles();

      return {
        success: errors.length === 0,
        installedComponents,
        copiedFiles: finalCopiedFiles,
        errors: errors.length > 0 ? errors : undefined,
      };
    } catch (error: unknown) {
      errors.push(`Installation failed: ${error instanceof Error ? error.message : String(error)}`);
      return {
        success: false,
        installedComponents,
        copiedFiles: allCopiedFiles,
        errors,
      };
    }
  }

  private static async hasExistingComponents(targetDir: string): Promise<boolean> {
    try {
      const entries = await fs.readdir(targetDir);
      // Check if there are any directories that look like components
      return entries.some((entry) => !entry.startsWith('_') && !entry.startsWith('.'));
    } catch {
      return false;
    }
  }

  // Generate a summary of what will be installed
  static async generateInstallSummary(options: InstallOptions): Promise<string[]> {
    const { components, componentMap, analyzer } = options;
    const summary: string[] = [];

    summary.push('Installation Summary:');
    summary.push('');
    summary.push('Components to install:');

    // eslint-disable-next-line no-restricted-syntax
    for (const componentName of components) {
      const component = componentMap.get(componentName);
      if (component) {
        summary.push(`  - ${componentName} (${component.tag})`);

        // Show dependencies
        const deps = analyzer.getFullDependencyTree(componentName);
        const utils = analyzer.getAllUtilities(componentName);
        const mixins = analyzer.getAllMixins(componentName);
        const types = analyzer.getAllTypes(componentName);

        if (deps.size > 0) {
          summary.push(`    Component deps: ${Array.from(deps).join(', ')}`);
        }
        if (utils.size > 0) {
          summary.push(`    Utilities: ${Array.from(utils).join(', ')}`);
        }
        if (mixins.size > 0) {
          summary.push(`    Mixins: ${Array.from(mixins).join(', ')}`);
        }
        if (types.size > 0) {
          summary.push(`    Types: ${Array.from(types).join(', ')}`);
        }
      }
    }

    // Calculate total files
    const totalFiles = components.reduce((total, componentName) => {
      const component = componentMap.get(componentName);
      if (component) {
        let fileCount = 1 + component.files.styles.length;
        if (component.files.types) {
          fileCount += component.files.types.length;
        }
        return total + fileCount;
      }
      return total;
    }, 0);

    summary.push('');
    summary.push(`Total files to copy: ~${totalFiles}`);

    return summary;
  }
}
