import { resolve } from 'path';

import loadFile from 'io/loadFile';
import parseToml from 'parsers/parseToml';
import setSchemaDefaults from 'schema/setSchemaDefaults';
import { UnreachableCaseError } from 'schema/errors';

import { Schema, SchemaType } from 'types/Schema';
import validateMainSchema from 'schema/validateMainSchema';
import { MainSchema } from 'types/MainSchema';

/**
 * Loads a single schema TOML file and resolves with a complete schema JSON object.
 * @param directoryPath {string}
 * @param schemaType {SchemaType}
 * @returns {Promise<Schema>}
 */
async function loadSchema<T extends SchemaType>(
  directoryPath: string,
  schemaType: T
): Promise<Schema<T>> {
  const fileName = `${schemaType}.toml`;
  const filePath = resolve(directoryPath, fileName);

  const tomlStr = await loadFile(filePath);
  const userSchema = await parseToml(tomlStr);

  const schema = setSchemaDefaults(schemaType, userSchema);

  switch (schemaType) {
    case SchemaType.main:
      validateMainSchema(schema as MainSchema);
      break;

    case SchemaType.dictionary:
      break;

    case SchemaType.story:
      break;

    default:
      throw new UnreachableCaseError(schemaType);
  }

  return schema;
}

export default loadSchema;
