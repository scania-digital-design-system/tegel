import chalk from 'chalk';
import ora from 'ora';
export var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["ERROR"] = 0] = "ERROR";
    LogLevel[LogLevel["WARN"] = 1] = "WARN";
    LogLevel[LogLevel["INFO"] = 2] = "INFO";
    LogLevel[LogLevel["DEBUG"] = 3] = "DEBUG";
})(LogLevel || (LogLevel = {}));
class Logger {
    level = LogLevel.INFO;
    spinner = null;
    setLevel(level) {
        this.level = level;
    }
    error(message, error) {
        if (this.spinner) {
            this.spinner.fail(chalk.red(message));
            this.spinner = null;
        }
        else {
            console.error(chalk.red('✖'), chalk.red(message));
        }
        if (error && this.level >= LogLevel.DEBUG) {
            console.error(chalk.gray(error.stack));
        }
    }
    warn(message) {
        if (this.level >= LogLevel.WARN) {
            if (this.spinner) {
                this.spinner.warn(chalk.yellow(message));
                this.spinner = null;
            }
            else {
                console.warn(chalk.yellow('⚠'), chalk.yellow(message));
            }
        }
    }
    info(message) {
        if (this.level >= LogLevel.INFO) {
            console.log(chalk.blue('ℹ'), message);
        }
    }
    success(message) {
        if (this.spinner) {
            this.spinner.succeed(chalk.green(message));
            this.spinner = null;
        }
        else {
            console.log(chalk.green('✔'), chalk.green(message));
        }
    }
    debug(message) {
        if (this.level >= LogLevel.DEBUG) {
            console.log(chalk.gray('[DEBUG]'), chalk.gray(message));
        }
    }
    startSpinner(message) {
        if (this.level >= LogLevel.INFO) {
            this.spinner = ora(message).start();
        }
    }
    updateSpinner(message) {
        if (this.spinner) {
            this.spinner.text = message;
        }
    }
    stopSpinner(succeed = true, message) {
        if (this.spinner) {
            if (succeed) {
                this.spinner.succeed(message || this.spinner.text);
            }
            else {
                this.spinner.fail(message || this.spinner.text);
            }
            this.spinner = null;
        }
    }
    // Pretty print for lists
    list(items, title) {
        if (this.level >= LogLevel.INFO) {
            if (title) {
                console.log(chalk.bold(title));
            }
            items.forEach(item => {
                console.log(chalk.gray('  •'), item);
            });
        }
    }
    // Pretty print for code blocks
    code(code, language) {
        if (this.level >= LogLevel.INFO) {
            console.log(chalk.gray('```' + (language || '')));
            console.log(chalk.cyan(code));
            console.log(chalk.gray('```'));
        }
    }
    // Pretty print for tables
    table(data) {
        if (this.level >= LogLevel.INFO && data.length > 0) {
            console.table(data);
        }
    }
    // Section divider
    divider() {
        if (this.level >= LogLevel.INFO) {
            console.log(chalk.gray('─'.repeat(50)));
        }
    }
    // Empty line
    newline() {
        console.log();
    }
}
export const logger = new Logger();
// Helper functions
export function logError(message, error) {
    logger.error(message, error);
}
export function logWarn(message) {
    logger.warn(message);
}
export function logInfo(message) {
    logger.info(message);
}
export function logSuccess(message) {
    logger.success(message);
}
export function logDebug(message) {
    logger.debug(message);
}
//# sourceMappingURL=logger.js.map