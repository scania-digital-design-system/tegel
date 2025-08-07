import { Command } from 'commander';
import prompts from 'prompts';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { configManager, type TegelConfig } from '../core/config-manager';
import { logger } from '../core/logger';
import { CLI_VERSION } from '../core/metadata';

function transformCssPrefix(cssContent: string, newPrefix: string): string {
  if (newPrefix === 'tds') {
    return cssContent;
  }

  // For minified CSS, we need to handle everything in one go, not line by line
  // Strategy:
  // 1. Protect strings and comments first
  // 2. Transform only in selector contexts
  // 3. Restore protected content

  // Temporarily replace content that should not be transformed
  const protectedStrings: string[] = [];
  let protectedIndex = 0;

  // Protect quoted strings
  let protectedContent = cssContent.replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, (match) => {
    const placeholder = `__PROTECTED_STRING_${protectedIndex++}__`;
    protectedStrings.push(match);
    return placeholder;
  });

  // Protect CSS comments
  protectedContent = protectedContent.replace(/\/\*[\s\S]*?\*\//g, (match) => {
    const placeholder = `__PROTECTED_STRING_${protectedIndex++}__`;
    protectedStrings.push(match);
    return placeholder;
  });

  // Now we need to identify selector contexts vs declaration contexts
  // Split by { and } to separate selectors from declarations
  const parts = protectedContent.split(/([{}])/);
  let inDeclaration = false;

  const transformedParts = parts.map((part) => {
    if (part === '{') {
      inDeclaration = true;
      return part;
    }
    if (part === '}') {
      inDeclaration = false;
      return part;
    }

    if (inDeclaration) {
      // Inside declarations - don't transform
      return part;
    }
    // In selector context - transform component names
    // Skip @keyframes rules
    if (part.trim().startsWith('@keyframes')) {
      return part;
    }

    // Transform tds- component selectors
    // Match patterns:
    // - tds-component at start of selector or after whitespace/combinators
    // - But not after . (class) or -- (CSS variable) or @ (at-rules)
    return part.replace(
      /(?<![.\-@#])(?:^|(?<=[,\s>+~[]))tds-([a-z]+(?:-[a-z]+)*)\b/g,
      `${newPrefix}-$1`,
    );
  });

  // Join the parts back together
  let result = transformedParts.join('');

  // Restore protected strings
  protectedStrings.forEach((str, i) => {
    result = result.replace(`__PROTECTED_STRING_${i}__`, str);
  });

  return result;
}

async function addGitignoreEntries(): Promise<void> {
  const gitignorePath = path.join(process.cwd(), '.gitignore');
  const tegelIgnoreEntries = ['', '# Tegel CLI', 'tegel-cache/', '.tegel-backup/', ''].join('\\n');

  try {
    if (await fs.pathExists(gitignorePath)) {
      const content = await fs.readFile(gitignorePath, 'utf-8');

      // Check if entries already exist
      if (!content.includes('# Tegel CLI')) {
        await fs.appendFile(gitignorePath, tegelIgnoreEntries);
        logger.debug('Added Tegel entries to .gitignore');
      }
    } else {
      // Create new .gitignore
      await fs.writeFile(gitignorePath, `${tegelIgnoreEntries.trim()}\\n`);
      logger.debug('Created .gitignore with Tegel entries');
    }
  } catch (error) {
    logger.warn('Could not update .gitignore');
  }
}

async function copyInitialFiles(config: TegelConfig, includeCss: boolean): Promise<void> {
  try {
    // Import and use resolveTegelSource to find the tegel-source directory
    const { resolveTegelSource } = await import('../utils/tegel-source-resolver');
    const tegelSource = await resolveTegelSource();

    // Copy utils directory
    const utilsSourcePath = path.join(tegelSource.root, 'utils');
    if (await fs.pathExists(utilsSourcePath)) {
      const utilsDestPath = path.join(config.targetDir, 'utils');
      await fs.copy(utilsSourcePath, utilsDestPath);
      logger.success(`Utils copied to: ${utilsDestPath}`);
    }

    // Copy types directory
    const typesSourcePath = path.join(tegelSource.root, 'types');
    if (await fs.pathExists(typesSourcePath)) {
      const typesDestPath = path.join(config.targetDir, 'types');
      await fs.copy(typesSourcePath, typesDestPath);
      logger.success(`Types copied to: ${typesDestPath}`);
    }

    // Copy global directory
    const globalSourcePath = path.join(tegelSource.root, 'global');
    if (await fs.pathExists(globalSourcePath)) {
      const globalDestPath = path.join(config.targetDir, 'global');
      await fs.copy(globalSourcePath, globalDestPath);
      logger.success(`Global copied to: ${globalDestPath}`);
    }

    // Copy mixins directory
    const mixinsSourcePath = path.join(tegelSource.root, 'mixins');
    if (await fs.pathExists(mixinsSourcePath)) {
      const mixinsDestPath = path.join(config.targetDir, 'mixins');
      await fs.copy(mixinsSourcePath, mixinsDestPath);
      logger.success(`Mixins copied to: ${mixinsDestPath}`);
    }

    // Copy typography directory
    const typographySourcePath = path.join(tegelSource.root, 'typography');
    if (await fs.pathExists(typographySourcePath)) {
      const typographyDestPath = path.join(config.targetDir, 'typography');
      await fs.copy(typographySourcePath, typographyDestPath);
      logger.success(`Typography copied to: ${typographyDestPath}`);
    }

    // Copy grid-deprecated directory
    const gridSourcePath = path.join(tegelSource.root, 'grid-deprecated');
    if (await fs.pathExists(gridSourcePath)) {
      const gridDestPath = path.join(config.targetDir, 'grid-deprecated');
      await fs.copy(gridSourcePath, gridDestPath);
      logger.success(`Grid-deprecated copied to: ${gridDestPath}`);
    }

    // Copy CSS file if requested
    if (includeCss) {
      const cssFileName = 'tegel.css';
      const sourcePath = path.join(tegelSource.root, 'styles', cssFileName);

      if (!(await fs.pathExists(sourcePath))) {
        logger.warn(`CSS file not found: ${sourcePath}`);
        return;
      }

      // Read CSS content
      let cssContent = await fs.readFile(sourcePath, 'utf-8');

      // Apply prefix transformation if needed
      if (config.prefix && config.prefix !== 'tds') {
        cssContent = transformCssPrefix(cssContent, config.prefix);
        logger.info(`Applied CSS prefix transformation: tds → ${config.prefix}`);
      }

      // Determine output path
      const stylesDir = path.join(config.targetDir, 'styles');
      await fs.ensureDir(stylesDir);

      const outputPath = path.join(stylesDir, 'tegel.css');
      await fs.writeFile(outputPath, cssContent, 'utf-8');

      logger.success(`CSS file copied to: ${outputPath}`);
    }
  } catch (error) {
    logger.warn('Could not copy initial files');
  }
}

export const initCommand = new Command()
  .name('init')
  .description('Initialize Tegel in your project')
  .option('-p, --prefix <prefix>', 'component prefix', 'tds')
  .option('-d, --dir <path>', 'target directory', './src/components/tegel')
  .option('-f, --force', 'overwrite existing configuration')
  .option('--skip-prompts', 'skip interactive prompts and use defaults')
  .option('--include-css', 'include pre-built CSS file', true)
  .action(async (options) => {
    try {
      logger.info('Initializing Tegel configuration...');

      const configPath = path.join(process.cwd(), 'tegel.config.json');
      if ((await fs.pathExists(configPath)) && !options.force) {
        logger.error('Configuration already exists. Use --force to overwrite.');
        process.exit(1);
      }

      let config: Partial<TegelConfig>;

      if (options.skipPrompts) {
        config = {
          version: CLI_VERSION,
          prefix: options.prefix,
          targetDir: options.dir,
        };
      } else {
        const response = await prompts([
          {
            type: 'text',
            name: 'prefix',
            message: 'Component prefix',
            initial: options.prefix,
            validate: (value) => {
              if (!/^[a-z][a-z0-9-]*$/.test(value)) {
                return 'Prefix must start with lowercase letter and contain only lowercase letters, numbers, and hyphens';
              }
              return true;
            },
          },
          {
            type: 'text',
            name: 'targetDir',
            message: 'Target directory for components',
            initial: options.dir,
          },
          {
            type: 'confirm',
            name: 'createDir',
            message: (_prev, values) => `Create directory ${values.targetDir}?`,
            initial: true,
          },
        ]);

        if (Object.keys(response).length === 0) {
          logger.info('Initialization cancelled');
          process.exit(0);
        }

        config = {
          version: CLI_VERSION,
          ...response,
        };

        if (response.createDir) {
          const targetPath = path.resolve(response.targetDir);
          await fs.ensureDir(targetPath);
          logger.success(`Created directory: ${targetPath}`);
        }
      }

      await configManager.init(process.cwd(), config);

      await addGitignoreEntries();

      // Copy initial files (utils, types, mixins, and optionally CSS)
      const finalConfig = await configManager.load();
      await copyInitialFiles(finalConfig, options.includeCss);

      logger.newline();
      logger.success('Tegel initialized successfully!');
      logger.newline();
      logger.info('Next steps:');
      const steps = [
        `Run ${chalk.cyan('npx @scania/tegel-cli add <component>')} to add components`,
        `Example: ${chalk.cyan('npx @scania/tegel-cli add button dropdown')}`,
        `Run ${chalk.cyan('npx @scania/tegel-cli add --help')} for more options`,
      ];

      if (options.includeCss) {
        steps.push('', 'To use the CSS file in your project:');
        steps.push(
          `Import ${chalk.cyan(
            `'${config.targetDir}/styles/tegel.css'`,
          )} in your main CSS/SCSS file`,
        );
        if (config.prefix && config.prefix !== 'tds') {
          steps.push(
            `Note: Component selectors have been transformed to use your prefix: ${chalk.green(
              config.prefix,
            )}`,
          );
        }
      }

      logger.list(steps);
    } catch (error: unknown) {
      logger.error('Failed to initialize:', error instanceof Error ? error : undefined);
      process.exit(1);
    }
  });
