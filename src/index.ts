import { resolve } from 'path';
import yargs from 'yargs';

import * as print from 'io/print';
import { exit } from 'io/std';
import loadAllSchema from 'schema/loadAllSchema';

const args = yargs
  .options({
    n: {
      alias: 'no-validate',
      describe: 'Skip validation when running the TBA',
      type: 'boolean'
    },
    o: {
      alias: 'only-validate',
      describe: 'Only validate schema files without running the TBA',
      type: 'boolean'
    }
  })
  .conflicts('n', 'o').argv;

const [userSchemaDir = './'] = args._;

const schemaDir = resolve(process.cwd(), userSchemaDir);

export default async function main(schemaDir: string): Promise<boolean> {
  try {
    const schemaMap = await loadAllSchema(schemaDir);

    if (args.onlyValidate) {
      exit(0);

      return true;
    }

    exit(0);

    return true;
  } catch (err) {
    print.err(err.message);

    exit(1);

    return false;
  }
}

/* istanbul ignore if */
if (process.env.NODE_ENV !== 'test') {
  main(schemaDir);
}
