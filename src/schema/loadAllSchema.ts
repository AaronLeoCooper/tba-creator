import { MainSchema } from 'types/MainSchema';
import { DictionarySchema } from 'types/DictionarySchema';
import { StorySchema } from 'types/StorySchema';
import { SchemaType } from 'types/Schema';

import loadSchema from 'schema/loadSchema';

interface SchemaMap {
  mainSchema: MainSchema;
  dictionarySchema: DictionarySchema;
  storySchema: StorySchema;
}

/**
 * Asynchronously loads all schema files and returns an object containing all
 * schema objects.
 * @param schemaDir {string}
 * @throws {(FileMissingError|SchemaValidationError|Error)}
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
