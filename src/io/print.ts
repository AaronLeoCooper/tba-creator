import chalk from 'chalk';

/**
 * Print to stdout with a trailing newline.
 * @param messages {string[]}
 */
export function msg(...messages: string[]): void {
  console.log(...messages);
}

/**
 * Print to stderr with a trailing newline and "ERROR" prefix.
 * @param messages {string[]}
 */
export function err(...messages: string[]): void {
  console.error(chalk.red('ERROR:', ...messages));
}
