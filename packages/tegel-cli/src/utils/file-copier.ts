import fs from 'fs-extra';
import path from 'path';
import { ComponentEntry, TransformContext } from '../types/index';
import { TransformationEngine } from '../core/transformer/transformation-engine';
import { logger } from '../core/logger';
import { TegelSourceInfo } from './tegel-source-resolver';

export interface CopyResult {
  success: boolean;
  copiedFiles: string[];
  errors?: string[];
}

export class FileCopier {
  private transformationEngine: TransformationEngine;

  private copiedFiles: Set<string> = new Set();

  constructor(private context: TransformContext, private tegelSource: TegelSourceInfo) {
    this.transformationEngine = new TransformationEngine(context);
  }

  async copyComponent(component: ComponentEntry): Promise<CopyResult> {
    const errors: string[] = [];
    const copiedFiles: string[] = [];

    try {
      // Copy main component file
      const componentPath = path.join(this.context.sourceRoot, component.files.component);
      const targetComponentPath = this.getTargetPath(component.files.component);

      await this.copyAndTransform(componentPath, targetComponentPath);
      copiedFiles.push(targetComponentPath);

      // Copy style files
      // eslint-disable-next-line no-restricted-syntax
      for (const styleFile of component.files.styles) {
        const sourcePath = path.join(this.context.sourceRoot, styleFile);
        const targetPath = this.getTargetPath(styleFile);

        // eslint-disable-next-line no-await-in-loop
        await this.copyAndTransform(sourcePath, targetPath);
        copiedFiles.push(targetPath);
      }

      // Copy type definition files if they exist
      if (component.files.types) {
        // eslint-disable-next-line no-restricted-syntax
        for (const typeFile of component.files.types) {
          const sourcePath = path.join(this.context.sourceRoot, typeFile);
          const targetPath = this.getTargetPath(typeFile);

          // eslint-disable-next-line no-await-in-loop
          await this.copyAndTransform(sourcePath, targetPath);
          copiedFiles.push(targetPath);
        }
      }

      // Handle test files if needed (usually we don't copy tests)
      if (this.context.config.includeTests && component.files.tests) {
        // eslint-disable-next-line no-restricted-syntax
        for (const testFile of component.files.tests) {
          const sourcePath = path.join(this.context.sourceRoot, testFile);
          const targetPath = this.getTargetPath(testFile);

          // eslint-disable-next-line no-await-in-loop
          await this.copyAndTransform(sourcePath, targetPath);
          copiedFiles.push(targetPath);
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

  async copyUtility(_utilityName: string, utilityPath: string): Promise<void> {
    const sourcePath = path.join(this.tegelSource.utilsPath, utilityPath);
    const targetPath = path.join(this.context.targetRoot, 'utils', utilityPath);

    // Don't copy if already copied
    if (this.copiedFiles.has(targetPath)) {
      return;
    }

    await this.copyAndTransform(sourcePath, targetPath);
    this.copiedFiles.add(targetPath);
  }

  async copyMixin(_mixinName: string, mixinPath: string): Promise<void> {
    const sourcePath = path.join(this.tegelSource.mixinsPath, mixinPath);
    const targetPath = path.join(this.context.targetRoot, 'mixins', mixinPath);

    // Don't copy if already copied
    if (this.copiedFiles.has(targetPath)) {
      return;
    }

    await this.copyAndTransform(sourcePath, targetPath);
    this.copiedFiles.add(targetPath);
  }

  async copyGlobalStyles(): Promise<void> {
    const globalFiles = ['global.scss', 'global-vars.scss', 'scania.scss', 'scania-vars.scss'];

    // eslint-disable-next-line no-restricted-syntax
    for (const file of globalFiles) {
      const sourcePath = path.join(this.tegelSource.globalPath, file);
      const targetPath = path.join(this.context.targetRoot, 'global', file);

      // eslint-disable-next-line no-await-in-loop
      if (await fs.pathExists(sourcePath)) {
        // eslint-disable-next-line no-await-in-loop
        await this.copyAndTransform(sourcePath, targetPath);
        this.copiedFiles.add(targetPath);
      }
    }
  }

  async copyIconTypes(): Promise<void> {
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
          await this.copyAndTransform(sourceTypePath, targetTypePath);
          this.copiedFiles.add(targetTypePath);
          logger.debug(`Copied type dependency: ${importFile}.ts`);
        }
      }

      // Copy the main icons.ts file
      await this.copyAndTransform(iconTypesPath, targetPath);
      this.copiedFiles.add(targetPath);
    }
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

  async copyAsset(assetName: string, componentPath: string): Promise<void> {
    // Find asset file in the component directory
    const componentDir = path.dirname(path.join(this.context.sourceRoot, componentPath));
    const assetPath = path.join(componentDir, `${assetName}.js`);

    // Target path in the same component directory structure
    const targetComponentDir = path.dirname(this.getTargetPath(componentPath));
    const targetPath = path.join(targetComponentDir, `${assetName}.js`);

    // Don't copy if already copied
    if (this.copiedFiles.has(targetPath)) {
      return;
    }

    if (await fs.pathExists(assetPath)) {
      // Copy without transformation for JS files
      await fs.ensureDir(path.dirname(targetPath));
      await fs.copyFile(assetPath, targetPath);
      this.copiedFiles.add(targetPath);
      logger.debug(`Copied asset: ${assetName}.js`);
    } else {
      logger.warn(`Asset file not found: ${assetPath}`);
    }
  }

  private async copyAndTransform(sourcePath: string, targetPath: string): Promise<void> {
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

    logger.debug(
      `Copied and transformed: ${path.basename(sourcePath)} → ${path.basename(targetPath)}`,
    );
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

  // Create an index file that exports all copied components
  async createIndexFile(components: ComponentEntry[]): Promise<void> {
    const exports: string[] = [
      `// Generated by Tegel CLI`,
      `// Components with prefix: ${this.context.config.prefix}`,
      '',
    ];

    // eslint-disable-next-line no-restricted-syntax
    for (const component of components) {
      const componentName = this.toPascalCase(component.tag.replace('tds-', ''));
      // Get the actual file path to determine the correct import path
      const componentFilePath = component.files.component;
      const pathParts = componentFilePath.split(path.sep);

      // Remove the last part (filename) to get the directory path
      const dirPath = pathParts.slice(0, -1).join('/');
      const fileName = path.basename(component.files.component, '.tsx');

      const componentPath = `./${dirPath}/${fileName}`;

      exports.push(`export { ${componentName} } from '${componentPath}';`);
    }

    const indexPath = path.join(this.context.targetRoot, 'index.ts');
    await fs.writeFile(indexPath, exports.join('\n'), 'utf-8');
  }

  // eslint-disable-next-line class-methods-use-this
  private toPascalCase(str: string): string {
    return str
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join('');
  }
}
