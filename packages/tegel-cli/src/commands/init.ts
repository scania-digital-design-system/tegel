import { Command } from 'commander';
import prompts from 'prompts';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { configManager } from '../core/config-manager.js';
import { logger } from '../core/logger.js';
import { TegelConfig } from '../types/index.js';

export const initCommand = new Command()
  .name('init')
  .description('Initialize Tegel in your project')
  .option('-p, --prefix <prefix>', 'component prefix', 'tds')
  .option('-d, --dir <path>', 'target directory', './src/components/tegel')
  .option('-s, --style <type>', 'style format (scss|css)', 'scss')
  .option('--no-typescript', 'disable TypeScript')
  .option('-f, --force', 'overwrite existing configuration')
  .option('--skip-prompts', 'skip interactive prompts and use defaults')
  .action(async (options) => {
    try {
      logger.info('Initializing Tegel configuration...');
      
      // Check if config already exists
      const configPath = path.join(process.cwd(), 'tegel.config.json');
      if (await fs.pathExists(configPath) && !options.force) {
        logger.error('Configuration already exists. Use --force to overwrite.');
        process.exit(1);
      }
      
      let config: Partial<TegelConfig>;
      
      if (options.skipPrompts) {
        // Use command line options or defaults
        config = {
          prefix: options.prefix,
          targetDir: options.dir,
          style: options.style,
          typescript: options.typescript,
        };
      } else {
        // Interactive prompts
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
            type: 'select',
            name: 'style',
            message: 'Style format',
            choices: [
              { title: 'SCSS', value: 'scss' },
              { title: 'CSS', value: 'css' },
            ],
            initial: options.style === 'scss' ? 0 : 1,
          },
          {
            type: 'confirm',
            name: 'typescript',
            message: 'Use TypeScript?',
            initial: options.typescript,
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
        
        config = response;
        
        // Create target directory if requested
        if (response.createDir) {
          const targetPath = path.resolve(response.targetDir);
          await fs.ensureDir(targetPath);
          logger.success(`Created directory: ${targetPath}`);
        }
      }
      
      // Save configuration
      await configManager.init(process.cwd(), config);
      
      // Create .gitignore entries
      await addGitignoreEntries();
      
      // Show next steps
      logger.newline();
      logger.success('Tegel initialized successfully!');
      logger.newline();
      logger.info('Next steps:');
      logger.list([
        `Run ${chalk.cyan('tegel-cli add <component>')} to add components`,
        `Example: ${chalk.cyan('tegel-cli add button dropdown')}`,
        `Run ${chalk.cyan('tegel-cli add --help')} for more options`,
      ]);
      
    } catch (error: any) {
      logger.error('Failed to initialize:', error);
      process.exit(1);
    }
  });

async function addGitignoreEntries(): Promise<void> {
  const gitignorePath = path.join(process.cwd(), '.gitignore');
  const tegelIgnoreEntries = [
    '',
    '# Tegel CLI',
    'tegel-cache/',
    '.tegel-backup/',
    '',
  ].join('\\n');
  
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
      await fs.writeFile(gitignorePath, tegelIgnoreEntries.trim() + '\\n');
      logger.debug('Created .gitignore with Tegel entries');
    }
  } catch (error) {
    logger.warn('Could not update .gitignore');
  }
}