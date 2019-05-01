import { MainSchema } from 'types/MainSchema';
import { DictionarySchema } from 'types/DictionarySchema';
import { StorySchema } from 'types/StorySchema';

export type Schema = MainSchema | DictionarySchema | StorySchema;

export type SchemaType = 'main' | 'dictionary' | 'story';
