import { resolve } from 'path';

import loadFile from 'io/loadFile';
import parseToml from 'parsers/parseToml';
import setSchemaDefaults from 'schema/setSchemaDefaults';

import { Schema, SchemaType } from 'types/Schema';

/**
 * Loads a single schema TOML file and resolves with a complete schema JSON object.
 * @param directoryPath {string}
 * @param schemaType {SchemaType}
 * @returns {Promise<Schema>}
 */
export default async function loadSchema(
  directoryPath: string,
  schemaType: SchemaType
): Promise<Schema> {
  const fileName = `${schemaType}.toml`;
  const filePath = resolve(directoryPath, fileName);

  const tomlStr = await loadFile(filePath);
  const userSchema = await parseToml(tomlStr);

  const schema = setSchemaDefaults(schemaType, userSchema);

  return schema;
}
