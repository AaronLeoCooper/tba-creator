import defaultsDeep from 'lodash.defaultsdeep';

import { Schema, SchemaType } from 'types/Schema';
import { MainSchema } from 'types/MainSchema';
import { DictionarySchema } from 'types/DictionarySchema';
import { StorySchema } from 'types/StorySchema';

export const mainDefaults: MainSchema = {
  description: { name: '', about: '' },
  options: {
    scene: { preDelayMs: 0, postDelayMs: 0 },
    input: {
      caseSensitive: false,
      quitPhrases: ['quit'],
      unknownPhraseWarnings: ["Sorry, I don't understand"]
    }
  }
};

export const dictionaryDefaults: DictionarySchema = {};

export const storyDefaults: StorySchema = {
  scenes: []
};

const schemaDefaults = {
  main: mainDefaults,
  dictionary: dictionaryDefaults,
  story: storyDefaults
};

/**
 * Given a schema type and a partial schema object, returns a complete schema object.
 * @param schemaType {SchemaType}
 * @param partialSchema {object}
 * @returns {Schema}
 */
function setSchemaDefaults<T extends SchemaType>(schemaType: T, partialSchema: object): Schema<T> {
  const schemaDefault = schemaDefaults[schemaType];

  return defaultsDeep(partialSchema, schemaDefault);
}

export default setSchemaDefaults;
