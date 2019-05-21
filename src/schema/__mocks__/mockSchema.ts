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
      caseSensitive: false,
      quitPhrases: ['quit', 'exit'],
      unknownPhraseWarnings: ['Unknown phrase 1', 'Unknown phrase 2', 'Unknown phrase 3']
    },
    scene: {
      preDelayMs: 0,
      postDelayMs: 0
    }
  }
};

export const dictionarySchema: DictionarySchema = {
  actions: [{ name: 'open', aka: ['grab'] }],
  objects: [{ name: 'red door' }, { name: 'blue door' }]
};

export const storySchema: StorySchema = {
  scenes: [
    {
      name: 'scene1',
      description: 'First scene',
      responses: [
        { grammar: ['actions.open', 'objects.blue door'], description: 'Response 1 description' },
        { grammar: ['actions.open', 'objects.red door'], nextScene: 'scene2' }
      ]
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
