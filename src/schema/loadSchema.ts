import { resolve } from 'path';

import { Schema, SchemaType } from 'types/Schema';
import { MainSchema } from 'types/MainSchema';
import { DictionarySchema } from 'types/DictionarySchema';
import { StorySchema } from 'types/StorySchema';

import loadFile from 'io/loadFile';
import parseToml from 'parsers/parseToml';
import setSchemaDefaults from 'schema/setSchemaDefaults';
import validateMainSchema from 'schema/validateMainSchema';
import validateDictionarySchema from 'schema/validateDictionarySchema';
import validateStorySchema from 'schema/validateStorySchema';

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

  const tomlStr = await loadFile(filePath, fileName);
  const userSchema = await parseToml(tomlStr);

  const schema = setSchemaDefaults(schemaType, userSchema);

  switch (schemaType) {
    case SchemaType.main:
      validateMainSchema(schema as MainSchema);
      break;

    case SchemaType.dictionary:
      validateDictionarySchema(schema as DictionarySchema);
      break;

    case SchemaType.story:
      validateStorySchema(schema as StorySchema);
      break;
  }

  return schema;
}

export default loadSchema;
