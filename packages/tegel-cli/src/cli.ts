#!/usr/bin/env node
import { Command } from 'commander';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { logger, LogLevel } from './core/logger';
import { initCommand } from './commands/init';
import { addCommand } from './commands/add';
import { reportCommand } from './commands/report';

// Get package.json info
const filename = fileURLToPath(import.meta.url);
const dirName = dirname(filename);
const packageJson = JSON.parse(readFileSync(join(dirName, '..', 'package.json'), 'utf-8'));

// Create main program
const program = new Command();

program
  .name('tegel-cli')
  .description('CLI tool for copying and transforming Tegel components')
  .version(packageJson.version)
  .option('-v, --verbose', 'enable verbose logging')
  .option('--no-color', 'disable colored output')
  .hook('preAction', (thisCommand) => {
    // Set log level based on verbose flag
    const options = thisCommand.opts();
    if (options.verbose) {
      logger.setLevel(LogLevel.DEBUG);
    }
  });

// Add commands
program.addCommand(initCommand);
program.addCommand(addCommand);
program.addCommand(reportCommand);

// Error handling
program.exitOverride();

async function main() {
  try {
    await program.parseAsync(process.argv);
  } catch (error: unknown) {
    if (error instanceof Error) {
      const commanderError = error as Error & { code?: string; exitCode?: number };
      if (commanderError.code === 'commander.executeSubCommandAsync') {
        // Normal exit from subcommand
        process.exit(commanderError.exitCode || 0);
      } else if (commanderError.code === 'commander.help') {
        // Help was displayed
        process.exit(0);
      } else if (commanderError.code === 'commander.version') {
        // Version was displayed
        process.exit(0);
      } else {
        // Actual error
        logger.error(error.message || 'An unexpected error occurred', error);
        process.exit(1);
      }
    } else {
      logger.error('An unexpected error occurred', error);
      process.exit(1);
    }
  }
}

// Run CLI
main().catch((error) => {
  logger.error('Fatal error:', error);
  process.exit(1);
});
