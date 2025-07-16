// This file contains metadata about the CLI package
// The __CLI_VERSION__ placeholder is replaced at build time by tsup

// eslint-disable-next-line no-underscore-dangle, @typescript-eslint/naming-convention
declare const __CLI_VERSION__: string;

export const CLI_VERSION = __CLI_VERSION__;
export const CLI_NAME = '@scania/tegel-cli';
