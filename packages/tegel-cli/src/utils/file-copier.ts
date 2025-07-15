import fs from 'fs-extra';
import path from 'path';
import prompts from 'prompts';
import { ComponentEntry, TransformContext } from '../types/index';
import { TransformationEngine } from '../core/transformer/transformation-engine';
import { logger } from '../core/logger';
import { TegelSourceInfo } from './tegel-source-resolver';

export interface CopyResult {
  success: boolean;
  copiedFiles: string[];
  errors?: string[];
}

export interface FileCopierOptions {
  force?: boolean;
  update?: boolean;
  skipPrompts?: boolean;
}

export class FileCopier {
  private transformationEngine: TransformationEngine;

  private copiedFiles: Set<string> = new Set();

  private actualCopiedFiles: Set<string> = new Set();

  private overrideDecisions: Map<string, boolean> = new Map();

  private filesToCheck: Map<string, string> = new Map(); // targetPath -> sourcePath

  constructor(
    private context: TransformContext,
    private tegelSource: TegelSourceInfo,
    private options: FileCopierOptions = {},
  ) {
    this.transformationEngine = new TransformationEngine(context);
  }

  getActualCopiedFiles(): string[] {
    return Array.from(this.actualCopiedFiles);
  }

  async collectExistingFiles(
    components: ComponentEntry[],
    dependencies?: {
      utilities?: Set<string>;
      mixins?: Set<string>;
      types?: Set<string>;
      assets?: Map<string, string>;
    },
  ): Promise<void> {
    // Clear previous collections
    this.filesToCheck.clear();

    // Collect all files that would be copied
    await Promise.all(
      components.map(async (component) => {
        // Main component file
        const componentPath = path.join(this.context.sourceRoot, component.files.component);
        const targetComponentPath = this.getTargetPath(component.files.component);
        if (await fs.pathExists(targetComponentPath)) {
          this.filesToCheck.set(targetComponentPath, componentPath);
        }

        // Style files
        await Promise.all(
          component.files.styles.map(async (styleFile) => {
            const sourcePath = path.join(this.context.sourceRoot, styleFile);
            const targetPath = this.getTargetPath(styleFile);
            if (await fs.pathExists(targetPath)) {
              this.filesToCheck.set(targetPath, sourcePath);
            }
          }),
        );

        // Type files
        if (component.files.types) {
          await Promise.all(
            component.files.types.map(async (typeFile) => {
              const sourcePath = path.join(this.context.sourceRoot, typeFile);
              const targetPath = this.getTargetPath(typeFile);
              if (await fs.pathExists(targetPath)) {
                this.filesToCheck.set(targetPath, sourcePath);
              }
            }),
          );
        }

        // Test files
        if (this.context.config.includeTests && component.files.tests) {
          await Promise.all(
            component.files.tests.map(async (testFile) => {
              const sourcePath = path.join(this.context.sourceRoot, testFile);
              const targetPath = this.getTargetPath(testFile);
              if (await fs.pathExists(targetPath)) {
                this.filesToCheck.set(targetPath, sourcePath);
              }
            }),
          );
        }
      }),
    );

    // Check dependencies if provided
    if (dependencies) {
      // Utilities
      if (dependencies.utilities) {
        await Promise.all(
          Array.from(dependencies.utilities).map(async (utility) => {
            const targetPath = path.join(this.context.targetRoot, 'utils', `${utility}.ts`);
            if (await fs.pathExists(targetPath)) {
              const sourcePath = path.join(this.tegelSource.utilsPath, `${utility}.ts`);
              this.filesToCheck.set(targetPath, sourcePath);
            }
          }),
        );
      }

      // Mixins
      if (dependencies.mixins) {
        await Promise.all(
          Array.from(dependencies.mixins).map(async (mixin) => {
            const targetPath = path.join(this.context.targetRoot, 'mixins', `_${mixin}.scss`);
            if (await fs.pathExists(targetPath)) {
              const sourcePath = path.join(this.tegelSource.mixinsPath, `_${mixin}.scss`);
              this.filesToCheck.set(targetPath, sourcePath);
            }
          }),
        );
      }

      // Assets
      if (dependencies.assets) {
        await Promise.all(
          Array.from(dependencies.assets).map(async ([assetName, componentPath]) => {
            const targetComponentDir = path.dirname(this.getTargetPath(componentPath));
            const targetPath = path.join(targetComponentDir, `${assetName}.js`);
            if (await fs.pathExists(targetPath)) {
              const componentDir = path.dirname(path.join(this.context.sourceRoot, componentPath));
              const sourcePath = path.join(componentDir, `${assetName}.js`);
              this.filesToCheck.set(targetPath, sourcePath);
            }
          }),
        );
      }

      // Icon types
      if (dependencies.types?.has('icons')) {
        const targetPath = path.join(this.context.targetRoot, 'types', 'icons.ts');
        if (await fs.pathExists(targetPath)) {
          const sourcePath = path.join(this.tegelSource.typesPath, 'icons.ts');
          this.filesToCheck.set(targetPath, sourcePath);
        }
      }
    }
  }

  async promptForOverrides(): Promise<void> {
    // Skip if no files to check or if force/update flags are set
    if (
      this.filesToCheck.size === 0 ||
      this.options.force ||
      this.options.update ||
      this.options.skipPrompts
    ) {
      return;
    }

    const existingFiles = Array.from(this.filesToCheck.keys()).map((filePath) => {
      const relativePath = path.relative(this.context.targetRoot, filePath);
      return {
        title: relativePath,
        value: filePath,
        selected: false, // Default to not overriding
      };
    });

    logger.newline();
    logger.warn(`Found ${existingFiles.length} existing file(s)`);

    const response = await prompts({
      type: 'multiselect',
      name: 'filesToOverride',
      message: 'Select files to override (Space to select, Enter to confirm, a to toggle all)',
      choices: existingFiles,
      hint: 'Use arrow keys to navigate, Space to toggle selection',
      instructions: false,
    });

    // Handle cancelled prompt
    if (!response.filesToOverride) {
      logger.info('Operation cancelled by user');
      process.exit(0);
    }

    // Store decisions
    Array.from(this.filesToCheck.keys()).forEach((targetPath) => {
      this.overrideDecisions.set(targetPath, response.filesToOverride.includes(targetPath));
    });
  }

  async copyComponent(component: ComponentEntry): Promise<CopyResult> {
    const errors: string[] = [];
    const copiedFiles: string[] = [];

    try {
      // Copy main component file
      const componentPath = path.join(this.context.sourceRoot, component.files.component);
      const targetComponentPath = this.getTargetPath(component.files.component);

      const wasCopied = await this.copyAndTransform(componentPath, targetComponentPath);
      if (wasCopied) {
        copiedFiles.push(targetComponentPath);
      }

      // Copy style files
      // eslint-disable-next-line no-restricted-syntax
      for (const styleFile of component.files.styles) {
        const sourcePath = path.join(this.context.sourceRoot, styleFile);
        const targetPath = this.getTargetPath(styleFile);

        // eslint-disable-next-line no-await-in-loop
        const styleCopied = await this.copyAndTransform(sourcePath, targetPath);
        if (styleCopied) {
          copiedFiles.push(targetPath);
        }
      }

      // Copy type definition files if they exist
      if (component.files.types) {
        // eslint-disable-next-line no-restricted-syntax
        for (const typeFile of component.files.types) {
          const sourcePath = path.join(this.context.sourceRoot, typeFile);
          const targetPath = this.getTargetPath(typeFile);

          // eslint-disable-next-line no-await-in-loop
          const typeCopied = await this.copyAndTransform(sourcePath, targetPath);
          if (typeCopied) {
            copiedFiles.push(targetPath);
          }
        }
      }

      // Handle test files if needed (usually we don't copy tests)
      if (this.context.config.includeTests && component.files.tests) {
        // eslint-disable-next-line no-restricted-syntax
        for (const testFile of component.files.tests) {
          const sourcePath = path.join(this.context.sourceRoot, testFile);
          const targetPath = this.getTargetPath(testFile);

          // eslint-disable-next-line no-await-in-loop
          const testCopied = await this.copyAndTransform(sourcePath, targetPath);
          if (testCopied) {
            copiedFiles.push(targetPath);
          }
        }
      }

      return {
        success: true,
        copiedFiles,
      };
    } catch (error: unknown) {
      errors.push(
        `Failed to copy component ${component.name}: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
      return {
        success: false,
        copiedFiles,
        errors,
      };
    }
  }

  async copyUtility(_utilityName: string, utilityPath: string): Promise<boolean> {
    const sourcePath = path.join(this.tegelSource.utilsPath, utilityPath);
    const targetPath = path.join(this.context.targetRoot, 'utils', utilityPath);

    // Don't copy if already copied
    if (this.copiedFiles.has(targetPath)) {
      return false;
    }

    const wasCopied = await this.copyAndTransform(sourcePath, targetPath);
    if (wasCopied) {
      this.copiedFiles.add(targetPath);
    }
    return wasCopied;
  }

  async copyMixin(_mixinName: string, mixinPath: string): Promise<boolean> {
    const sourcePath = path.join(this.tegelSource.mixinsPath, mixinPath);
    const targetPath = path.join(this.context.targetRoot, 'mixins', mixinPath);

    // Don't copy if already copied
    if (this.copiedFiles.has(targetPath)) {
      return false;
    }

    const wasCopied = await this.copyAndTransform(sourcePath, targetPath);
    if (wasCopied) {
      this.copiedFiles.add(targetPath);
    }
    return wasCopied;
  }

  async copyGlobalStyles(): Promise<number> {
    const globalFiles = ['global.scss', 'global-vars.scss', 'scania.scss', 'scania-vars.scss'];
    let copiedCount = 0;

    // eslint-disable-next-line no-restricted-syntax
    for (const file of globalFiles) {
      const sourcePath = path.join(this.tegelSource.globalPath, file);
      const targetPath = path.join(this.context.targetRoot, 'global', file);

      // eslint-disable-next-line no-await-in-loop
      if (await fs.pathExists(sourcePath)) {
        // eslint-disable-next-line no-await-in-loop
        const wasCopied = await this.copyAndTransform(sourcePath, targetPath);
        if (wasCopied) {
          this.copiedFiles.add(targetPath);
          copiedCount += 1;
        }
      }
    }
    return copiedCount;
  }

  async copyIconTypes(): Promise<boolean> {
    const iconTypesPath = path.join(this.tegelSource.typesPath, 'icons.ts');
    const targetPath = path.join(this.context.targetRoot, 'types', 'icons.ts');

    if (await fs.pathExists(iconTypesPath)) {
      // Read icons.ts to find its dependencies
      const content = await fs.readFile(iconTypesPath, 'utf-8');
      const imports = this.extractTypeImports(content);

      // Copy dependent type files first
      // eslint-disable-next-line no-restricted-syntax
      for (const importFile of imports) {
        const sourceTypePath = path.join(this.tegelSource.typesPath, `${importFile}.ts`);
        const targetTypePath = path.join(this.context.targetRoot, 'types', `${importFile}.ts`);

        // eslint-disable-next-line no-await-in-loop
        if ((await fs.pathExists(sourceTypePath)) && !this.copiedFiles.has(targetTypePath)) {
          // eslint-disable-next-line no-await-in-loop
          const wasCopied = await this.copyAndTransform(sourceTypePath, targetTypePath);
          if (wasCopied) {
            this.copiedFiles.add(targetTypePath);
            logger.debug(`Copied type dependency: ${importFile}.ts`);
          }
        }
      }

      // Copy the main icons.ts file
      const wasCopied = await this.copyAndTransform(iconTypesPath, targetPath);
      if (wasCopied) {
        this.copiedFiles.add(targetPath);
      }
      return wasCopied;
    }
    return false;
  }

  // eslint-disable-next-line class-methods-use-this
  private extractTypeImports(content: string): string[] {
    const imports: string[] = [];
    const importRegex = /import\s+(?:type\s+)?{[^}]+}\s+from\s+['"]\.\/([^'"]+)['"]/g;
    let match;

    // eslint-disable-next-line no-cond-assign
    while ((match = importRegex.exec(content)) !== null) {
      imports.push(match[1]);
    }

    return imports;
  }

  async copyAsset(assetName: string, componentPath: string): Promise<boolean> {
    // Find asset file in the component directory
    const componentDir = path.dirname(path.join(this.context.sourceRoot, componentPath));
    const assetPath = path.join(componentDir, `${assetName}.js`);

    // Target path in the same component directory structure
    const targetComponentDir = path.dirname(this.getTargetPath(componentPath));
    const targetPath = path.join(targetComponentDir, `${assetName}.js`);

    // Don't copy if already copied
    if (this.copiedFiles.has(targetPath)) {
      return false;
    }

    if (await fs.pathExists(assetPath)) {
      // Check if file exists and handle override
      if (await fs.pathExists(targetPath)) {
        const shouldOverride = await this.shouldOverrideFile(targetPath);
        if (!shouldOverride) {
          logger.debug(`Skipped asset: ${assetName}.js (user declined override)`);
          return false;
        }
      }

      // Copy without transformation for JS files
      await fs.ensureDir(path.dirname(targetPath));
      await fs.copyFile(assetPath, targetPath);
      this.copiedFiles.add(targetPath);
      this.actualCopiedFiles.add(targetPath);
      logger.debug(`Copied asset: ${assetName}.js`);
      return true;
    }

    logger.warn(`Asset file not found: ${assetPath}`);
    return false;
  }

  private async copyAndTransform(sourcePath: string, targetPath: string): Promise<boolean> {
    // Check if file exists and handle override
    if (await fs.pathExists(targetPath)) {
      const shouldOverride = await this.shouldOverrideFile(targetPath);
      if (!shouldOverride) {
        logger.debug(`Skipped: ${path.basename(targetPath)} (user declined override)`);
        return false;
      }
    }

    // Ensure target directory exists
    await fs.ensureDir(path.dirname(targetPath));

    // Read source file
    const content = await fs.readFile(sourcePath, 'utf-8');

    // Apply aliased import transformation
    const transformed = this.applyImportAliases(content);

    // Transform content for prefix changes
    const { content: finalContent, errors } = await this.transformationEngine.transformFile(
      transformed,
      targetPath, // Use targetPath for both to calculate correct relative paths
      targetPath,
    );

    if (errors && errors.length > 0) {
      errors.forEach((error) => {
        logger.warn(`Transformation warning in ${error.file}: ${error.message}`);
      });
    }

    // Write transformed content
    await fs.writeFile(targetPath, finalContent, 'utf-8');

    // Track this as an actually copied file
    this.actualCopiedFiles.add(targetPath);

    logger.debug(
      `Copied and transformed: ${path.basename(sourcePath)} → ${path.basename(targetPath)}`,
    );

    return true;
  }

  private async shouldOverrideFile(filePath: string): Promise<boolean> {
    // If force flag is set, always override
    if (this.options.force) {
      return true;
    }

    // If update flag is set, always override (for update command)
    if (this.options.update) {
      return true;
    }

    // If skip prompts is set, don't override
    if (this.options.skipPrompts) {
      return false;
    }

    // Check if we have a pre-collected decision for this file
    if (this.overrideDecisions.has(filePath)) {
      return this.overrideDecisions.get(filePath)!;
    }

    // If we get here, it means this file wasn't in our pre-collection
    // This could happen for dependencies (utils, mixins, etc.)
    // Default to not overriding for safety
    logger.debug(`No override decision found for ${filePath}, skipping`);
    return false;
  }

  // eslint-disable-next-line class-methods-use-this
  private applyImportAliases(content: string): string {
    let transformed = content;

    // Replace relative imports with aliased paths
    // Handle utils imports
    transformed = transformed.replace(
      /from\s+['"](\.\.\/)+utils\/([^'"]+)['"]/g,
      `from '@/lib/tegel/utils/$2'`,
    );

    // Handle component imports
    transformed = transformed.replace(
      /from\s+['"](\.\.\/)+components\/([^'"]+)['"]/g,
      `from '@/lib/tegel/components/$2'`,
    );

    // Handle mixin imports
    transformed = transformed.replace(
      /from\s+['"](\.\.\/)+mixins\/([^'"]+)['"]/g,
      `from '@/lib/tegel/mixins/$2'`,
    );

    // Handle types imports (including icons)
    transformed = transformed.replace(
      /from\s+['"](\.\.\/)+types\/([^'"]+)['"]/g,
      `from '@/lib/tegel/types/$2'`,
    );

    // Handle global imports
    transformed = transformed.replace(
      /from\s+['"](\.\.\/)+global\/([^'"]+)['"]/g,
      `from '@/lib/tegel/global/$2'`,
    );

    // Handle SCSS imports
    transformed = transformed.replace(
      /@import\s+['"](\.\.\/)+mixins\/([^'"]+)['"]/g,
      `@import '@/lib/tegel/mixins/$2'`,
    );

    transformed = transformed.replace(
      /@import\s+['"](\.\.\/)+global\/([^'"]+)['"]/g,
      `@import '@/lib/tegel/global/$2'`,
    );

    // Handle @use statements
    transformed = transformed.replace(
      /@use\s+['"](\.\.\/)+mixins\/([^'"]+)['"]/g,
      `@use '@/lib/tegel/mixins/$2'`,
    );

    transformed = transformed.replace(
      /@use\s+['"](\.\.\/)+global\/([^'"]+)['"]/g,
      `@use '@/lib/tegel/global/$2'`,
    );

    return transformed;
  }

  public getTargetPath(relativePath: string): string {
    // Update component path to use new structure
    return path.join(this.context.targetRoot, relativePath);
  }
}
