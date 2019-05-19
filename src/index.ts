import { resolve } from 'path';
import yargs from 'yargs';

import * as print from 'io/print';
import { exit } from 'io/std';
import loadAllSchema from 'schema/loadAllSchema';

const args = yargs.options({
  o: {
    alias: 'only-validate',
    describe: 'Only validate schema files without running the TBA',
    type: 'boolean'
  }
}).argv;

const [userSchemaDir = './'] = args._;

const schemaDir = resolve(process.cwd(), userSchemaDir);

interface MainOptions {
  onlyValidate?: boolean;
}

/**
 * Initialises the main TBA program.
 * @param schemaDir {string}
 * @param options {MainOptions}
 * @returns {Promise<boolean>}
 */
export default async function main(schemaDir: string, options: MainOptions = {}): Promise<boolean> {
  const { onlyValidate } = options;

  try {
    const schemaMap = await loadAllSchema(schemaDir);

    if (onlyValidate) {
      print.msg('All required schema files are present and valid');

      return exit(0);
    }

    return exit(0);
  } catch (err) {
    print.err(err.message);

    return exit(1);
  }
}

/* istanbul ignore if */
if (process.env.NODE_ENV !== 'test') {
  main(schemaDir, args as MainOptions);
}
