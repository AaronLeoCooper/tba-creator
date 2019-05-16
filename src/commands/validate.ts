import * as print from 'io/print';
import loadAllSchema from 'schema/loadAllSchema';

/**
 * Attempts to load all schema files and resolves with `true` if all schemas
 * are successfully loaded and valid.
 * Throws an error if a file can't be loaded or if a validation check fails.
 * @param schemaDir {string}
 * @throws {Error}
 * @returns {Promise<boolean>}
 */
export default async function validate(schemaDir: string): Promise<boolean> {
  try {
    await loadAllSchema(schemaDir);
  } catch (err) {
    print.err(err.message);

    throw err;
  }

  print.msg('All schema files are valid');

  return true;
}
