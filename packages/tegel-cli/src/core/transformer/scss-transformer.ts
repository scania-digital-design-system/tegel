import path from 'path';
import { TransformContext } from '../../types/index';
import { logger } from '../logger';

/**
 * SCSS Transformer
 *
 * Handles two types of transformations:
 * 1. Path transformations: Converts absolute @/lib/tegel paths to relative paths
 *    (Always applied, regardless of prefix)
 *
 * 2. Prefix transformations: Changes component tag prefixes (e.g., tds- to mf-)
 *    (Only applied when prefix differs from default)
 *
 * What gets transformed:
 * - @import, @use, @forward statements with absolute paths
 * - Element selectors with component tags (e.g., tds-button)
 * - Attribute selectors containing component tags
 *
 * What does NOT get transformed:
 * - CSS class names (e.g., .tds-button)
 * - CSS custom properties/variables (e.g., --tds-color)
 * - Mixin names (e.g., @mixin tds-styles)
 * - Placeholder selectors (e.g., %tds-base)
 * - @extend directives
 * - Keyframe names
 */
interface TransformRule {
  pattern: RegExp;
  replacement: string | ((match: string, tegelPath: string) => string);
  description?: string;
  priority?: number;
}

export class ScssTransformer {
  private context: TransformContext;

  private rules: TransformRule[] = [];

  private currentFilePath: string = '';

  constructor(context: TransformContext) {
    this.context = context;
    this.initializeRules();
  }

  private initializeRules(): void {
    const { config } = this.context;
    const oldPrefix = 'tds';
    const newPrefix = config.prefix;

    this.rules = [
      // Fix external typography imports
      {
        pattern: /(@import\s+['"])\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/(typography\/[^'"]+)(['"])/g,
        replacement: '$1../../$2$3',
        description: 'Fix typography import paths (5 levels up to 2 levels)',
        priority: 0,
      },
      {
        pattern: /(@import\s+['"])\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/(typography\/[^'"]+)(['"])/g,
        replacement: '$1../../../$2$3',
        description: 'Fix typography import paths (6 levels up to 3 levels)',
        priority: 0,
      },

      // Fix external grid-deprecated imports
      {
        pattern: /(@import\s+['"])\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/(grid-deprecated\/[^'"]+)(['"])/g,
        replacement: '$1../../$2$3',
        description: 'Fix grid-deprecated import paths (5 levels up to 2 levels)',
        priority: 0,
      },
      {
        pattern:
          /(@import\s+['"])\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/(grid-deprecated\/[^'"]+)(['"])/g,
        replacement: '$1../../../$2$3',
        description: 'Fix grid-deprecated import paths (6 levels up to 3 levels)',
        priority: 0,
      },

      // Convert absolute Tegel @import paths to relative paths
      {
        // eslint-disable-next-line prefer-regex-literals
        pattern: new RegExp(`@import\\s+['"]@/lib/tegel/([^'"]+)['"](?:\\s+as\\s+[^;]+)?`, 'g'),
        replacement: (match: string, tegelPath: string) => {
          const relativePath = this.calculateRelativePath(tegelPath);
          // Preserve any 'as namespace' suffix
          const asMatch = match.match(/(\s+as\s+[^;]+)$/);
          const asSuffix = asMatch ? asMatch[1] : '';
          return `@import '${relativePath}'${asSuffix}`;
        },
        description: 'Convert absolute Tegel imports to relative paths',
        priority: 1,
      },

      // Convert absolute Tegel @use paths to relative paths
      {
        // eslint-disable-next-line prefer-regex-literals
        pattern: new RegExp(`@use\\s+['"]@/lib/tegel/([^'"]+)['"](?:\\s+as\\s+[^;]+)?`, 'g'),
        replacement: (match: string, tegelPath: string) => {
          const relativePath = this.calculateRelativePath(tegelPath);
          // Preserve any 'as namespace' suffix
          const asMatch = match.match(/(\s+as\s+[^;]+)$/);
          const asSuffix = asMatch ? asMatch[1] : '';
          return `@use '${relativePath}'${asSuffix}`;
        },
        description: 'Convert absolute Tegel @use to relative paths',
        priority: 1,
      },

      // Convert absolute Tegel @forward paths to relative paths
      {
        // eslint-disable-next-line prefer-regex-literals
        pattern: new RegExp(
          `@forward\\s+['"]@/lib/tegel/([^'"]+)['"](?:\\s+(?:as\\s+[^;]+|hide\\s+[^;]+|show\\s+[^;]+))?`,
          'g',
        ),
        replacement: (match: string, tegelPath: string) => {
          const relativePath = this.calculateRelativePath(tegelPath);
          // Preserve any 'as namespace', 'hide', or 'show' suffix
          const suffixMatch = match.match(/(\s+(?:as|hide|show)\s+[^;]+)$/);
          const suffix = suffixMatch ? suffixMatch[1] : '';
          return `@forward '${relativePath}'${suffix}`;
        },
        description: 'Convert absolute Tegel @forward to relative paths',
        priority: 1,
      },
    ];

    // Only add prefix transformation rules if prefix is different
    if (oldPrefix !== newPrefix) {
      this.rules.push(
        // Transform component tag prefixes in element selectors (e.g., tds-button → mf-button)
        // Must not be inside a CSS variable (--), class (.), mixin (@mixin), placeholder (%), or @keyframes
        {
          pattern: new RegExp(
            `(?<![-\\.%@])(?<!@mixin\\s+)(?<!@keyframes\\s+)${oldPrefix}-([a-z-]+)(?=[\\s\\[\\{\\,\\:\\)\\>\\+\\~]|$)`,
            'g',
          ),
          replacement: `${newPrefix}-$1`,
          description: 'Transform component tag prefixes in selectors',
          priority: 2,
        },

        // Transform component tag prefixes in attribute selectors (e.g., [data-component="tds-dropdown"])
        {
          pattern: new RegExp(`\\[([^\\]]*?)${oldPrefix}-([a-z-]+)([^\\]]*?)\\]`, 'g'),
          replacement: `[$1${newPrefix}-$2$3]`,
          description: 'Transform component tag prefixes in attribute selectors',
          priority: 3,
        },
      );
    }

    // Sort rules by priority (lower number = higher priority)
    this.rules.sort((a, b) => (a.priority || 999) - (b.priority || 999));
  }

  transform(content: string, filePath: string): string {
    logger.debug(`Transforming SCSS file: ${filePath}`);

    // Store current file path for use in transformation functions
    this.currentFilePath = filePath;

    let transformed = content;
    const appliedRules: string[] = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const rule of this.rules) {
      const before = transformed;

      if (typeof rule.replacement === 'string') {
        transformed = transformed.replace(rule.pattern, rule.replacement);
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        transformed = transformed.replace(rule.pattern, rule.replacement as any);
      }

      if (before !== transformed && rule.description) {
        appliedRules.push(rule.description);
      }
    }

    if (appliedRules.length > 0) {
      logger.debug(`Applied transformations: ${appliedRules.join(', ')}`);
    }

    // Update any file-specific comments
    if (this.context.config.prefix !== 'tds') {
      transformed = this.addTransformationComment(transformed);
    }

    return transformed;
  }

  // eslint-disable-next-line class-methods-use-this
  private addTransformationComment(content: string): string {
    const comment = `/* Transformed by Tegel CLI - prefix: ${this.context.config.prefix} */\n`;

    // Add comment at the beginning if it doesn't already exist
    if (!content.includes('Transformed by Tegel CLI')) {
      return comment + content;
    }

    return content;
  }

  // Get a preview of transformations without applying them
  preview(content: string): string[] {
    const changes: string[] = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const rule of this.rules) {
      const matches = content.match(rule.pattern);
      if (matches && matches.length > 0) {
        changes.push(`${rule.description}: ${matches.length} occurrence(s)`);
      }
    }

    return changes;
  }

  // Calculate relative path from current file to target Tegel resource
  private calculateRelativePath(tegelPath: string): string {
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
    const currentFileRelative = path.relative(targetDir, this.currentFilePath);
    const currentDirRelative = path.dirname(currentFileRelative);

    // Calculate the relative path from current file to target resource
    const from = currentDirRelative === '.' ? '' : currentDirRelative;
    const to = resourceSubPath;

    const relativePath = path.relative(from, to);

    // Ensure forward slashes for SCSS imports
    const normalizedPath = relativePath.split(path.sep).join('/');

    // If the path doesn't start with .. or ., add ./
    if (!normalizedPath.startsWith('.')) {
      return `./${normalizedPath}`;
    }

    return normalizedPath;
  }

  // Validate SCSS after transformation
  // eslint-disable-next-line class-methods-use-this
  validateTransformation(content: string): { valid: boolean; errors?: string[] } {
    const errors: string[] = [];

    // Check for unclosed braces
    const openBraces = (content.match(/{/g) || []).length;
    const closeBraces = (content.match(/}/g) || []).length;
    if (openBraces !== closeBraces) {
      errors.push(`Mismatched braces: ${openBraces} open, ${closeBraces} close`);
    }

    // Check for unclosed parentheses
    const openParens = (content.match(/\(/g) || []).length;
    const closeParens = (content.match(/\)/g) || []).length;
    if (openParens !== closeParens) {
      errors.push(`Mismatched parentheses: ${openParens} open, ${closeParens} close`);
    }

    // Check for unclosed quotes
    const singleQuotes = (content.match(/'/g) || []).length;
    const doubleQuotes = (content.match(/"/g) || []).length;
    if (singleQuotes % 2 !== 0) {
      errors.push('Unclosed single quote detected');
    }
    if (doubleQuotes % 2 !== 0) {
      errors.push('Unclosed double quote detected');
    }

    return {
      valid: errors.length === 0,
      errors: errors.length > 0 ? errors : undefined,
    };
  }
}
