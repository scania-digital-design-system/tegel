export declare enum LogLevel {
    ERROR = 0,
    WARN = 1,
    INFO = 2,
    DEBUG = 3
}
declare class Logger {
    private level;
    private spinner;
    setLevel(level: LogLevel): void;
    error(message: string, error?: Error): void;
    warn(message: string): void;
    info(message: string): void;
    success(message: string): void;
    debug(message: string): void;
    startSpinner(message: string): void;
    updateSpinner(message: string): void;
    stopSpinner(succeed?: boolean, message?: string): void;
    list(items: string[], title?: string): void;
    code(code: string, language?: string): void;
    table(data: Record<string, any>[]): void;
    divider(): void;
    newline(): void;
}
export declare const logger: Logger;
export declare function logError(message: string, error?: Error): void;
export declare function logWarn(message: string): void;
export declare function logInfo(message: string): void;
export declare function logSuccess(message: string): void;
export declare function logDebug(message: string): void;
export {};
//# sourceMappingURL=logger.d.ts.map