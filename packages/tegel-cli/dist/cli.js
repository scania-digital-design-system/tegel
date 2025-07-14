import { Command } from 'commander';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { logger, LogLevel } from './core/logger.js';
import { initCommand } from './commands/init.js';
import { addCommand } from './commands/add.js';
// Get package.json info
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageJson = JSON.parse(readFileSync(join(__dirname, '..', 'package.json'), 'utf-8'));
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
// Error handling
program.exitOverride();
async function main() {
    try {
        await program.parseAsync(process.argv);
    }
    catch (error) {
        if (error.code === 'commander.executeSubCommandAsync') {
            // Normal exit from subcommand
            process.exit(error.exitCode);
        }
        else if (error.code === 'commander.help') {
            // Help was displayed
            process.exit(0);
        }
        else if (error.code === 'commander.version') {
            // Version was displayed
            process.exit(0);
        }
        else {
            // Actual error
            logger.error(error.message || 'An unexpected error occurred', error);
            process.exit(1);
        }
    }
}
// Run CLI
main().catch((error) => {
    logger.error('Fatal error:', error);
    process.exit(1);
});
//# sourceMappingURL=cli.js.map