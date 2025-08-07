#!/usr/bin/env node
import { Command } from 'commander';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { logger, LogLevel } from './core/logger';
import { initCommand } from './commands/init';
import { addCommand } from './commands/add';
import { updateCommand } from './commands/update';

const filename = fileURLToPath(import.meta.url);
const dirName = dirname(filename);
const packageJson = JSON.parse(readFileSync(join(dirName, '..', 'package.json'), 'utf-8'));

const program = new Command();

program
  .name('tegel-cli')
  .description('CLI tool for copying and transforming Tegel components')
  .version(packageJson.version)
  .option('-v, --verbose', 'enable verbose logging')
  .option('--no-color', 'disable colored output')
  .hook('preAction', (thisCommand) => {
    const options = thisCommand.opts();
    if (options.verbose) {
      logger.setLevel(LogLevel.DEBUG);
    }
  });

program.addCommand(initCommand);
program.addCommand(addCommand);
program.addCommand(updateCommand);

program.exitOverride();

async function main() {
  try {
    await program.parseAsync(process.argv);
  } catch (error: unknown) {
    if (error instanceof Error) {
      const commanderError = error as Error & { code?: string; exitCode?: number };
      if (commanderError.code === 'commander.executeSubCommandAsync') {
        process.exit(commanderError.exitCode || 0);
      } else if (commanderError.code === 'commander.help') {
        process.exit(0);
      } else if (commanderError.code === 'commander.version') {
        process.exit(0);
      } else {
        logger.error(error.message || 'An unexpected error occurred', error);
        process.exit(1);
      }
    } else {
      logger.error('An unexpected error occurred', error instanceof Error ? error : undefined);
      process.exit(1);
    }
  }
}

main().catch((error) => {
  logger.error('Fatal error:', error instanceof Error ? error : undefined);
  process.exit(1);
});
