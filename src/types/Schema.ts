import { MainSchema } from 'types/MainSchema';
import { DictionarySchema } from 'types/DictionarySchema';
import { StorySchema } from 'types/StorySchema';

export type Schema<T> = T extends SchemaType.main
  ? MainSchema
  : T extends SchemaType.dictionary
  ? DictionarySchema
  : T extends SchemaType.story
  ? StorySchema
  : never;

export enum SchemaType {
  main = 'main',
  dictionary = 'dictionary',
  story = 'story'
}

export interface SchemaMap {
  mainSchema: MainSchema;
  dictionarySchema: DictionarySchema;
  storySchema: StorySchema;
}
