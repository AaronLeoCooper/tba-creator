import { readFile } from 'fs';

/**
 * Load a single file at the given path and return its content as a string.
 * @param filePath {string}
 * @returns {Promise<string>}
 */
export default function loadFile(filePath: string): Promise<string> {
  return new Promise(
    (resolve, reject): void => {
      readFile(
        filePath,
        'utf8',
        (err, data: string): void => {
          if (err) {
            reject(err);
          }

          resolve(data);
        }
      );
    }
  );
}
