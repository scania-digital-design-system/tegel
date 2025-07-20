import { TransformContext } from '../../types/index';
import { logger } from '../logger';

/**
 * TypeScript/JavaScript Transformer
 *
 * Handles three types of transformations:
 *
 * 1. Import path transformations:
 *    - Converts absolute @/lib/tegel paths to project-specific paths
 *    - Transforms relative imports (../../utils) to absolute/aliased paths
 *    (Always applied, regardless of prefix)
 *
 * 2. Prefix transformations:
 *    - Changes component tag prefixes (e.g., tds- to mf-) in code
 *    - Updates type definitions (e.g., HTMLTdsButtonElement)
 *    (Only applied when prefix differs from default)
 *
 * 3. Generic transformations:
 *    - String literals containing component names (lowest priority)
 *
 * Transformation contexts:
 * - Component tag definitions (tag: 'tds-button')
 * - DOM queries (querySelector, getElementsByTagName, closest)
 * - JSX/TSX elements (<tds-button>)
 * - Type definitions (HTMLTdsButtonElement)
 * - Import statements (from '@/lib/tegel/...')
 * - String comparisons (tagName.toLowerCase() === 'tds-button')
 */
interface TransformRule {
  pattern: RegExp;
  replacement: string | ((match: string, tegelPath: string) => string);
  description?: string;
  priority?: number;
}

export class TypeScriptTransformer {
  private context: TransformContext;

  private rules: TransformRule[] = [];

  constructor(context: TransformContext) {
    this.context = context;
    this.initializeRules();
  }

  private initializeRules(): void {
    const { config } = this.context;
    const oldPrefix = 'tds';
    const newPrefix = config.prefix;

    // ===== Import Path Transformations (Always Applied) =====
    this.rules = [
      // Transform absolute @/lib/tegel imports to project paths
      {
        // eslint-disable-next-line prefer-regex-literals
        pattern: new RegExp(`from\\s+['"]@/lib/tegel/([^'"]+)['"]`, 'g'),
        replacement: (match: string, tegelPath: string) => {
          const targetDir = config.targetDir.replace(/^\.\//, '');

          if (tegelPath.startsWith('types/')) {
            return `from '@/${targetDir}/types/${tegelPath.replace('types/', '')}'`;
          }
          if (tegelPath.startsWith('utils/')) {
            return `from '@/${targetDir}/utils/${tegelPath.replace('utils/', '')}'`;
          }
          if (tegelPath.startsWith('mixins/')) {
            return `from '@/${targetDir}/mixins/${tegelPath.replace('mixins/', '')}'`;
          }
          if (tegelPath.startsWith('components/')) {
            return `from '@/${targetDir}/${tegelPath.replace('components/', '')}'`;
          }

          return `from '@/${targetDir}/${tegelPath}'`;
        },
        description: 'Convert absolute Tegel imports to project paths',
        priority: 1,
      },

      // Transform type-only imports from @/lib/tegel
      {
        // eslint-disable-next-line prefer-regex-literals
        pattern: new RegExp(
          `import\\s+type\\s+{[^}]+}\\s+from\\s+['"]@/lib/tegel/([^'"]+)['"]`,
          'g',
        ),
        replacement: (match: string, tegelPath: string) => {
          const targetDir = config.targetDir.replace(/^\.\//, '');

          const importMatch = match.match(/import\s+type\s+({[^}]+})\s+from/);
          if (!importMatch) return match;

          const importClause = importMatch[1];

          if (tegelPath.startsWith('types/')) {
            return `import type ${importClause} from '@/${targetDir}/types/${tegelPath.replace(
              'types/',
              '',
            )}'`;
          }

          return `import type ${importClause} from '@/${targetDir}/${tegelPath}'`;
        },
        description: 'Convert type-only Tegel imports to project paths',
        priority: 1,
      },

      // Transform relative utility imports to aliased paths
      {
        // eslint-disable-next-line prefer-regex-literals
        pattern: new RegExp(`from\\s+['"]\\.\\./\\.\\./utils/([^'"]+)['"]`, 'g'),
        replacement: (match: string, utilPath: string) => {
          const alias = config.aliases['@tegel/utils'];
          if (alias) {
            return `from '${alias}/${utilPath}'`;
          }

          const targetDir = config.targetDir.replace(/^\.\//, '');
          return `from '@/${targetDir}/utils/${utilPath}'`;
        },
        description: 'Convert relative utility imports to aliased paths',
        priority: 2,
      },

      // Transform relative type imports to aliased paths
      {
        // eslint-disable-next-line prefer-regex-literals
        pattern: new RegExp(`from\\s+['"]\\.\\./\\.\\./types/([^'"]+)['"]`, 'g'),
        replacement: (match: string, typePath: string) => {
          const alias = config.aliases['@tegel/types'];
          if (alias) {
            return `from '${alias}/${typePath}'`;
          }

          const targetDir = config.targetDir.replace(/^\.\//, '');
          return `from '@/${targetDir}/types/${typePath}'`;
        },
        description: 'Convert relative type imports to aliased paths',
        priority: 2,
      },

      // Transform relative mixin imports to aliased paths
      {
        // eslint-disable-next-line prefer-regex-literals
        pattern: new RegExp(`from\\s+['"]\\.\\./\\.\\./mixins/([^'"]+)['"]`, 'g'),
        replacement: (match: string, mixinPath: string) => {
          const alias = config.aliases['@tegel/mixins'];
          if (alias) {
            return `from '${alias}/${mixinPath}'`;
          }

          const targetDir = config.targetDir.replace(/^\.\//, '');
          return `from '@/${targetDir}/mixins/${mixinPath}'`;
        },
        description: 'Convert relative mixin imports to aliased paths',
        priority: 2,
      },
    ];

    // ===== Prefix Transformations (Only Applied When Prefix Changes) =====
    if (oldPrefix !== newPrefix) {
      this.rules.push(
        // Component tag definitions in StencilJS components
        {
          pattern: new RegExp(`tag:\\s*['"]${oldPrefix}-([^'"]+)['"]`, 'g'),
          replacement: `tag: '${newPrefix}-$1'`,
          description: 'Transform StencilJS component tag definitions',
          priority: 3,
        },

        // DOM querySelector and querySelectorAll
        {
          pattern: new RegExp(`querySelector(All)?\\s*\\(\\s*['"]${oldPrefix}-([^'"]+)['"]`, 'g'),
          replacement: `querySelector$1('${newPrefix}-$2'`,
          description: 'Transform querySelector calls',
          priority: 4,
        },

        // getElementsByTagName
        {
          pattern: new RegExp(`getElementsByTagName\\s*\\(\\s*['"]${oldPrefix}-([^'"]+)['"]`, 'g'),
          replacement: `getElementsByTagName('${newPrefix}-$1'`,
          description: 'Transform getElementsByTagName calls',
          priority: 4,
        },

        // Element.closest() calls
        {
          pattern: new RegExp(`closest\\s*\\(\\s*['"]${oldPrefix}-([^'"]+)['"]`, 'g'),
          replacement: `closest('${newPrefix}-$1'`,
          description: 'Transform closest() calls',
          priority: 4,
        },

        // Tag name comparisons
        {
          pattern: new RegExp(
            `tagName\\.toLowerCase\\(\\)\\s*===\\s*['"]${oldPrefix}-([^'"]+)['"]`,
            'g',
          ),
          replacement: `tagName.toLowerCase() === '${newPrefix}-$1'`,
          description: 'Transform tag name comparisons',
          priority: 4,
        },

        // JSX/TSX opening tags
        {
          pattern: new RegExp(`<(${oldPrefix}-[a-z-]+)`, 'g'),
          replacement: (_match: string, tag: string) => {
            const newTag = tag.replace(oldPrefix, newPrefix);
            return `<${newTag}`;
          },
          description: 'Transform JSX/TSX opening tags',
          priority: 5,
        },

        // JSX/TSX closing tags
        {
          pattern: new RegExp(`</(${oldPrefix}-[a-z-]+)>`, 'g'),
          replacement: (_match: string, tag: string) => {
            const newTag = tag.replace(oldPrefix, newPrefix);
            return `</${newTag}>`;
          },
          description: 'Transform JSX/TSX closing tags',
          priority: 5,
        },

        // HTML element type definitions (e.g., HTMLTdsButtonElement)
        {
          pattern: new RegExp(
            `HTML${TypeScriptTransformer.toPascalCase(oldPrefix)}([A-Z][a-zA-Z]+)Element`,
            'g',
          ),
          replacement: `HTML${TypeScriptTransformer.toPascalCase(newPrefix)}$1Element`,
          description: 'Transform HTML element type definitions',
          priority: 6,
        },
      );
    }

    // Sort rules by priority (lower number = higher priority)
    this.rules.sort((a, b) => (a.priority || 999) - (b.priority || 999));
  }

  transform(content: string, filePath: string): string {
    logger.debug(`Transforming TypeScript file: ${filePath}`);

    let transformed = content;
    const appliedRules: string[] = [];

    this.rules.forEach((rule) => {
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
    });

    if (appliedRules.length > 0) {
      logger.debug(`Applied transformations: ${appliedRules.join(', ')}`);
    }

    return transformed;
  }

  private static toPascalCase(str: string): string {
    return str
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join('');
  }

  // Get a preview of transformations without applying them
  preview(content: string): string[] {
    const changes: string[] = [];

    this.rules.forEach((rule) => {
      const matches = content.match(rule.pattern);
      if (matches && matches.length > 0) {
        changes.push(`${rule.description}: ${matches.length} occurrence(s)`);
      }
    });

    return changes;
  }
}
