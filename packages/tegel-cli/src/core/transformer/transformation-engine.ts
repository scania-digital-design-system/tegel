import path from 'path';
import { TransformContext, TransformResult, TransformError } from '../../types/index';
import { TypeScriptTransformer } from './typescript-transformer';
import { ScssTransformer } from './scss-transformer';
import { logger } from '../logger';

export class TransformationEngine {
  private context: TransformContext;

  private tsTransformer: TypeScriptTransformer;

  private scssTransformer: ScssTransformer;

  constructor(context: TransformContext) {
    this.context = context;
    this.tsTransformer = new TypeScriptTransformer(context);
    this.scssTransformer = new ScssTransformer(context);
  }

  async transformFile(
    content: string,
    filePath: string,
    targetPath: string,
  ): Promise<{ content: string; errors?: TransformError[] }> {
    const ext = path.extname(filePath).toLowerCase();
    const errors: TransformError[] = [];
    let transformed = content;

    try {
      switch (ext) {
        case '.ts':
        case '.tsx':
        case '.js':
        case '.jsx':
          transformed = this.tsTransformer.transform(content, filePath);
          break;

        case '.scss':
        case '.sass': {
          transformed = this.scssTransformer.transform(content, filePath);

          // Validate SCSS transformation
          const validation = this.scssTransformer.validateTransformation(transformed);
          if (!validation.valid && validation.errors) {
            validation.errors.forEach((error) => {
              errors.push({
                file: targetPath,
                message: error,
                code: 'SCSS_VALIDATION_ERROR',
              });
            });
          }
          break;
        }

        case '.css':
          // For plain CSS, we can use a subset of SCSS transformations
          transformed = this.transformCss(content, filePath);
          break;

        default:
          // No transformation for other file types
          logger.debug(`No transformation for file type: ${ext}`);
      }

      // Update import paths based on new location
      transformed = this.updateImportPaths(transformed, filePath, targetPath);
    } catch (error: unknown) {
      errors.push({
        file: targetPath,
        message: error instanceof Error ? error.message : 'Unknown transformation error',
        code: 'TRANSFORMATION_ERROR',
      });
    }

    return { content: transformed, errors: errors.length > 0 ? errors : undefined };
  }

  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  private transformCss(content: string, filePath: string): string {
    logger.debug(`Transforming CSS file: ${filePath}`);

    const oldPrefix = 'tds';
    const newPrefix = this.context.config.prefix;

    if (oldPrefix === newPrefix) {
      return content;
    }

    let transformed = content;

    // Transform @import statements with absolute paths to relative paths
    transformed = transformed.replace(
      // eslint-disable-next-line prefer-regex-literals
      new RegExp(`@import\\s+['"]@/lib/tegel/([^'"]+)['"]`, 'g'),
      (match: string, tegelPath: string) => {
        const relativePath = this.calculateRelativePath(filePath, tegelPath);
        return `@import '${relativePath}'`;
      },
    );

    // Only transform element selectors (tag names)
    // Do NOT transform class names or CSS custom properties
    transformed = transformed.replace(
      new RegExp(`(?<![-\\.])${oldPrefix}-([a-z-]+)(?=[\\s\\[\\{\\,\\:\\)\\>\\+\\~]|$)`, 'g'),
      `${newPrefix}-$1`,
    );

    // Transform attribute selectors containing tag names
    transformed = transformed.replace(
      new RegExp(`\\[([^\\]]*?)${oldPrefix}-([a-z-]+)([^\\]]*?)\\]`, 'g'),
      `[$1${newPrefix}-$2$3]`,
    );

    // Note: CSS class names and custom properties remain unchanged

    return transformed;
  }

  // eslint-disable-next-line class-methods-use-this
  private updateImportPaths(content: string, sourcePath: string, targetPath: string): string {
    // Calculate the relative path difference
    const sourceDir = path.dirname(sourcePath);
    const targetDir = path.dirname(targetPath);

    // If the directory structure is the same, no need to update paths
    const sourceDepth = sourceDir.split(path.sep).length;
    const targetDepth = targetDir.split(path.sep).length;

    if (sourceDepth === targetDepth) {
      return content;
    }

    // Update relative imports based on the new location
    const depthDiff = targetDepth - sourceDepth;
    let updatedContent = content;

    if (depthDiff > 0) {
      // Moving deeper, need more ../
      const additionalDots = '../'.repeat(depthDiff);

      // Update imports that start with ../
      updatedContent = updatedContent.replace(
        /from\s+['"](\.\.[^'"]+)['"]/g,
        (_match, importPath) => `from '${additionalDots}${importPath}'`,
      );
    } else if (depthDiff < 0) {
      // Moving shallower, need fewer ../
      const dotsToRemove = Math.abs(depthDiff);

      updatedContent = updatedContent.replace(
        /from\s+['"](\.\.[^'"]+)['"]/g,
        (match, importPath) => {
          // Count existing ../
          const existingDots = (importPath.match(/\.\.\//g) || []).length;
          if (existingDots > dotsToRemove) {
            // Remove some ../
            const newPath = importPath.replace(new RegExp(`(\\.\\./){${dotsToRemove}}`), '');
            return `from '${newPath}'`;
          }
          return match;
        },
      );
    }

    return updatedContent;
  }

  // Get a preview of all transformations for a file
  previewFile(content: string, filePath: string): string[] {
    const ext = path.extname(filePath).toLowerCase();

    switch (ext) {
      case '.ts':
      case '.tsx':
      case '.js':
      case '.jsx':
        return this.tsTransformer.preview(content);

      case '.scss':
      case '.sass':
        return this.scssTransformer.preview(content);

      case '.css':
        return ['CSS class and selector transformations'];

      default:
        return [];
    }
  }

  // Batch transform multiple files
  async transformFiles(
    files: Array<{ content: string; sourcePath: string; targetPath: string }>,
  ): Promise<TransformResult> {
    const transformedFiles: string[] = [];
    const allErrors: TransformError[] = [];
    const warnings: string[] = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const file of files) {
      // eslint-disable-next-line no-await-in-loop
      const result = await this.transformFile(file.content, file.sourcePath, file.targetPath);

      if (result.errors) {
        allErrors.push(...result.errors);
      }

      transformedFiles.push(file.targetPath);

      // Check for potential issues
      const preview = this.previewFile(file.content, file.sourcePath);
      if (preview.length === 0 && this.shouldTransform(file.sourcePath)) {
        warnings.push(`No transformations found for ${path.basename(file.sourcePath)}`);
      }
    }

    return {
      success: allErrors.length === 0,
      transformedFiles,
      errors: allErrors.length > 0 ? allErrors : undefined,
      warnings: warnings.length > 0 ? warnings : undefined,
    };
  }

  // eslint-disable-next-line class-methods-use-this
  private shouldTransform(filePath: string): boolean {
    const ext = path.extname(filePath).toLowerCase();
    return ['.ts', '.tsx', '.js', '.jsx', '.scss', '.sass', '.css'].includes(ext);
  }

  // Calculate relative path from current file to target Tegel resource
  // eslint-disable-next-line class-methods-use-this
  private calculateRelativePath(currentFilePath: string, tegelPath: string): string {
    // Determine the imported resource path relative to Tegel root
    let resourceSubPath: string;

    if (tegelPath.startsWith('mixins/')) {
      resourceSubPath = path.join('mixins', tegelPath.replace('mixins/', ''));
    } else if (tegelPath.startsWith('utils/')) {
      resourceSubPath = path.join('utils', tegelPath.replace('utils/', ''));
    } else if (tegelPath.startsWith('types/')) {
      resourceSubPath = path.join('types', tegelPath.replace('types/', ''));
    } else if (tegelPath.startsWith('components/')) {
      resourceSubPath = tegelPath.replace('components/', '');
    } else {
      resourceSubPath = tegelPath;
    }

    // Get the current file's directory relative to the Tegel root
    const targetDir = this.context.config.targetDir.replace(/^\.\//, '');
    const currentFileRelative = path.relative(targetDir, currentFilePath);
    const currentDirRelative = path.dirname(currentFileRelative);

    // Calculate the relative path from current file to target resource
    const from = currentDirRelative === '.' ? '' : currentDirRelative;
    const to = resourceSubPath;

    const relativePath = path.relative(from, to);

    // Ensure forward slashes for CSS/SCSS imports
    const normalizedPath = relativePath.split(path.sep).join('/');

    // If the path doesn't start with .. or ., add ./
    if (!normalizedPath.startsWith('.')) {
      return `./${normalizedPath}`;
    }

    return normalizedPath;
  }
}
