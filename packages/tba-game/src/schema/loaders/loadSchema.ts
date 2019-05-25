import { Schema, SchemaType } from '../../types/Schema';

import loadFile from '../../io/loadFile';
import parseToml from '../parsers/parseToml';
import setSchemaDefaults from './setSchemaDefaults';

/**
 * Loads a single schema TOML file and resolves with a complete schema JSON object.
 * @param schemaDir {string}
 * @param schemaType {SchemaType}
 * @throws {FileMissingError}
 * @returns {Promise<Schema>}
 */
async function loadSchema<T extends SchemaType>(
  schemaDir: string,
  schemaType: T
): Promise<Schema<T>> {
  const fileName = `${schemaType}.toml`;

  const tomlStr = await loadFile(schemaDir, fileName);
  const userSchema = await parseToml(tomlStr);

  return setSchemaDefaults(schemaType, userSchema);
}

export default loadSchema;
