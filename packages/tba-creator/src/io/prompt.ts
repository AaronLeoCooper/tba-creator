import { stdin, stdout } from './std';

/**
 * Opens an async prompt in the command line for the user to enter text.
 * @param preText {string=}
 * @returns {Promise<string>}
 */
export default function prompt(preText?: string): Promise<string> {
  return new Promise(
    (resolve: Function): void => {
      stdin.resume();

      if (preText) {
        stdout.write(`${preText} `);
      }

      stdin.once(
        'data',
        (data: object): void => {
          resolve(data.toString().trim());
          stdin.pause();
        }
      );
    }
  );
}
