import chalk from 'chalk';
import ora, { Ora } from 'ora';

// eslint-disable-next-line no-shadow
export enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3,
}

class Logger {
  private level: LogLevel = LogLevel.INFO;

  private spinner: Ora | null = null;

  setLevel(level: LogLevel): void {
    this.level = level;
  }

  error(message: string, error?: Error): void {
    if (this.spinner) {
      this.spinner.fail(chalk.red(message));
      this.spinner = null;
    } else {
      console.error(chalk.red('✖'), chalk.red(message));
    }
    if (error && this.level >= LogLevel.DEBUG) {
      console.error(chalk.gray(error.stack));
    }
  }

  warn(message: string): void {
    if (this.level >= LogLevel.WARN) {
      if (this.spinner) {
        this.spinner.warn(chalk.yellow(message));
        this.spinner = null;
      } else {
        console.warn(chalk.yellow('⚠'), chalk.yellow(message));
      }
    }
  }

  info(message: string): void {
    if (this.level >= LogLevel.INFO) {
      console.log(chalk.blue('ℹ'), message);
    }
  }

  success(message: string): void {
    if (this.spinner) {
      this.spinner.succeed(chalk.green(message));
      this.spinner = null;
    } else {
      console.log(chalk.green('✔'), chalk.green(message));
    }
  }

  debug(message: string): void {
    if (this.level >= LogLevel.DEBUG) {
      console.log(chalk.gray('[DEBUG]'), chalk.gray(message));
    }
  }

  startSpinner(message: string): void {
    if (this.level >= LogLevel.INFO) {
      this.spinner = ora(message).start();
    }
  }

  updateSpinner(message: string): void {
    if (this.spinner) {
      this.spinner.text = message;
    }
  }

  stopSpinner(succeed: boolean = true, message?: string): void {
    if (this.spinner) {
      if (succeed) {
        this.spinner.succeed(message || this.spinner.text);
      } else {
        this.spinner.fail(message || this.spinner.text);
      }
      this.spinner = null;
    }
  }

  // Pretty print for lists
  list(items: string[], title?: string): void {
    if (this.level >= LogLevel.INFO) {
      if (title) {
        console.log(chalk.bold(title));
      }
      items.forEach((item) => {
        console.log(chalk.gray('  •'), item);
      });
    }
  }

  // Pretty print for code blocks
  code(code: string, language?: string): void {
    if (this.level >= LogLevel.INFO) {
      console.log(chalk.gray(`\`\`\`${language || ''}`));
      console.log(chalk.cyan(code));
      console.log(chalk.gray('```'));
    }
  }

  // Pretty print for tables
  table(data: Record<string, unknown>[]): void {
    if (this.level >= LogLevel.INFO && data.length > 0) {
      console.table(data);
    }
  }

  // Section divider
  divider(): void {
    if (this.level >= LogLevel.INFO) {
      console.log(chalk.gray('─'.repeat(50)));
    }
  }

  // Empty line
  // eslint-disable-next-line class-methods-use-this
  newline(): void {
    console.log();
  }
}

export const logger = new Logger();

// Helper functions
export function logError(message: string, error?: Error): void {
  logger.error(message, error);
}

export function logWarn(message: string): void {
  logger.warn(message);
}

export function logInfo(message: string): void {
  logger.info(message);
}

export function logSuccess(message: string): void {
  logger.success(message);
}

export function logDebug(message: string): void {
  logger.debug(message);
}
