import { readFile } from 'fs';
import { resolve as resolvePath } from 'path';

import FileMissingError from '../schema/errors/FileMissingError';

/**
 * Load a single file at the given path and return its content as a string.
 * @param filePath {string}
 * @param fileName {string}
 * @returns {Promise<string>}
 */
export default function loadFile(filePath: string, fileName: string): Promise<string> {
  return new Promise(
    (resolve, reject): void => {
      readFile(
        resolvePath(filePath, fileName),
        'utf8',
        (err, data: string): void => {
          if (err) {
            reject(new FileMissingError(fileName));
          }

          resolve(data);
        }
      );
    }
  );
}
