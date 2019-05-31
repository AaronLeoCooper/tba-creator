import { stdout } from './std';

/**
 * Writes a character sequence to stdout that clears the terminal in Windows & Unix.
 */
export default function clearScreen(): void {
  stdout.write('\u001b[2J\u001b[0;0H');
}
