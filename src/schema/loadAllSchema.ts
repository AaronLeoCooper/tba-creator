import { SchemaMap, SchemaType } from 'types/Schema';

import loadSchema from 'schema/loaders/loadSchema';

/**
 * Asynchronously loads all schema files and returns an object containing all
 * schema objects.
 * @param schemaDir {string}
 * @throws {FileMissingError}
 * @returns {SchemaMap}
 */
export default async function loadAllSchema(schemaDir: string): Promise<SchemaMap> {
  const mainSchema = await loadSchema(schemaDir, SchemaType.main);
  const dictionarySchema = await loadSchema(schemaDir, SchemaType.dictionary);
  const storySchema = await loadSchema(schemaDir, SchemaType.story);

  return {
    mainSchema,
    dictionarySchema,
    storySchema
  };
}
