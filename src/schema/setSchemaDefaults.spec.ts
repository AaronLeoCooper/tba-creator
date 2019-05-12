import { SchemaType } from 'types/Schema';
import { MainSchema } from 'types/MainSchema';
import { DictionarySchema } from 'types/DictionarySchema';
import { StorySchema } from 'types/StorySchema';

import setSchemaDefaults, {
  dictionaryDefaults,
  mainDefaults,
  storyDefaults
} from './setSchemaDefaults';

describe('setSchemaDefaults', () => {
  describe('main schema', () => {
    it('Should return the default main schema when an empty object is passed', () => {
      const result: MainSchema = setSchemaDefaults(SchemaType.main, {});

      expect(result).toEqual(mainDefaults);
    });

    it('Should return a merged main schema when a partial schema is passed', () => {
      const partialSchema = {
        description: { name: 'My Game' },
        options: {
          input: {
            unknownPhraseWarnings: ['Unknown phrase 1', 'Unknown phrase 2']
          }
        }
      };

      const result: MainSchema = setSchemaDefaults(SchemaType.main, partialSchema);

      expect(result).toEqual({
        description: {
          ...mainDefaults.description,
          name: 'My Game'
        },
        options: {
          ...mainDefaults.options,
          input: {
            ...mainDefaults.options.input,
            unknownPhraseWarnings: ['Unknown phrase 1', 'Unknown phrase 2']
          }
        }
      });
    });
  });

  describe('dictionary schema', () => {
    it('Should return the default dictionary schema when an empty object is passed', () => {
      const result: DictionarySchema = setSchemaDefaults(SchemaType.dictionary, {});

      expect(result).toEqual(dictionaryDefaults);
    });

    it('Should return a merged dictionary schema when a partial schema is passed', () => {
      const partialSchema: DictionarySchema = {
        phrases: [{ name: 'name1', aka: ['aka1'] }, { name: 'name2', aka: ['aka2'] }]
      };

      const result: DictionarySchema = setSchemaDefaults(SchemaType.dictionary, partialSchema);

      expect(result).toEqual({
        ...dictionaryDefaults,
        ...partialSchema
      });
    });
  });

  describe('story schema', () => {
    it('Should return the default story schema when an empty object is passed', () => {
      const result: StorySchema = setSchemaDefaults(SchemaType.story, {});

      expect(result).toEqual(storyDefaults);
    });

    it('Should return a merged story schema when a partial schema is passed', () => {
      const partialSchema: StorySchema = {
        scenes: [
          {
            name: 'name1',
            description: 'desc1',
            responses: [{ grammar: [''], nextScene: '' }]
          }
        ]
      };

      const result: StorySchema = setSchemaDefaults(SchemaType.story, partialSchema);

      expect(result).toEqual({
        ...storyDefaults,
        ...partialSchema
      });
    });
  });
});
