import { resolve } from 'path';

import { SchemaType } from 'types/Schema';

import loadSchema from 'schema/loadSchema';
import SchemaValidationError from 'schema/SchemaValidationError';

async function start(schemaDir: string): Promise<boolean> {
  try {
    const mainSchema = await loadSchema(schemaDir, SchemaType.main);
    const dictionarySchema = await loadSchema(schemaDir, SchemaType.dictionary);
    const storySchema = await loadSchema(schemaDir, SchemaType.story);

    console.log('Loaded all 3 schema without issue!');
  } catch (err) {
    if (err instanceof SchemaValidationError) {
      console.error(err.message);
    }

    console.error(err.message);

    return false;
  }

  return true;
}

const [userSchemaDir = './'] = process.argv.slice(2);

const schemaDir = resolve(process.cwd(), userSchemaDir);

start(schemaDir);
