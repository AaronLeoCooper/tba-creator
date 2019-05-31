import chalk from 'chalk';

const newLine = '\r\n';

/**
 * Print to stdout with a trailing newline.
 * @param messages {string[]}
 */
export function msg(...messages: string[]): void {
  console.log(...messages, newLine);
}

/**
 * Print to stderr with a trailing newline and "ERROR" prefix.
 * @param messages {string[]}
 */
export function err(...messages: string[]): void {
  console.error(chalk.red('ERROR:', ...messages), newLine);
}
