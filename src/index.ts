#!/usr/bin/env node

import { resolve } from 'path';

import { SchemaType } from 'types/Schema';

import * as print from 'io/print';
import { exit } from 'io/std';
import loadSchema from 'schema/loadSchema';
import SchemaValidationError from 'schema/SchemaValidationError';

export default async function start(schemaDir: string): Promise<boolean> {
  try {
    const mainSchema = await loadSchema(schemaDir, SchemaType.main);
    const dictionarySchema = await loadSchema(schemaDir, SchemaType.dictionary);
    const storySchema = await loadSchema(schemaDir, SchemaType.story);
  } catch (err) {
    if (err instanceof SchemaValidationError) {
      print.err(err.message);
    }

    print.err(err.message);

    exit(1);

    return false;
  }

  print.msg('Loaded all 3 schema without issue!');

  exit(0);

  return true;
}

const [userSchemaDir = './'] = process.argv.slice(2);

const schemaDir = resolve(process.cwd(), userSchemaDir);

/* istanbul ignore if */
if (process.env.NODE_ENV !== 'test') {
  start(schemaDir);
}
