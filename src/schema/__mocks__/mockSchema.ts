import { MainSchema } from 'types/MainSchema';
import { DictionarySchema } from '../../types/DictionarySchema';
import { StorySchema } from '../../types/StorySchema';
import { SchemaMap } from '../../types/Schema';

export const mainSchema: MainSchema = {
  description: {
    name: 'My game',
    about: 'My game description'
  },
  options: {
    input: {
      caseSensitive: true,
      quitPhrases: ['quit', 'exit'],
      unknownPhraseWarnings: ['Unknown phrase warning']
    },
    scene: {
      preDelayMs: 0,
      postDelayMs: 50
    }
  }
};

export const dictionarySchema: DictionarySchema = {
  actions: [
    { name: 'walk', aka: ['walk', 'run'] },
    { name: 'hop', aka: ['hop'] }
  ]
};

export const storySchema: StorySchema = {
  scenes: [
    {
      name: 'scene1',
      description: 'First scene',
      responses: [{ grammar: ['actions.walk'], nextScene: 'scene2' }]
    },
    {
      name: 'scene2',
      description: 'Second scene',
      ending: true
    }
  ]
};

export const schemaMap: SchemaMap = {
  mainSchema,
  dictionarySchema,
  storySchema
};

export const partialMainSchemaToml = `[description]
name = "My game"
about = """
My game description
"""

[options.input]
caseSensitive = true
quitPhrases = [ "quit", "exit" ]

[options.scene]
postDelayMs: 50
`;

export const partialDictionarySchemaToml = `[[phrases]]
name = "walk"
aka = ["walk", "run"]
`;

export const partialStorySchemaToml = `[[scenes]]
  name = "scene"
  description = "Test scene"
  ending = true
`;

export const partialMainSchemaJson = {
  description: {
    name: 'My game',
    about: 'My game description'
  },
  options: {
    input: {
      caseSensitive: true,
      quitPhrases: ['quit', 'exit']
    },
    scene: {
      postDelayMs: 50
    }
  }
};

export const partialDictionarySchemaJson = {
  phrases: [{ name: 'walk', aka: ['walk', 'run'] }]
};

export const partialStorySchemaJson = {
  scenes: [
    {
      name: 'scene',
      description: 'Test scene',
      ending: true
    }
  ]
};
