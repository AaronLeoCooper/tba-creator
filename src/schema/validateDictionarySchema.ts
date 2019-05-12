import { EmptySchemaError } from 'schema/errors';
import { DictionarySchema } from 'types/DictionarySchema';

const fileName = 'dictionary.toml';

/**
 * Validates a dictionary schema object.
 * An error is thrown when validation fails, otherwise true is returned.
 * @param schema {DictionarySchema}
 * @throws {EmptySchemaError}
 * @returns {boolean}
 */
export default function validateDictionarySchema(schema: DictionarySchema): boolean {
  if (Object.keys(schema).length === 0) {
    throw new EmptySchemaError(fileName, 'phrase type');
  }

  return true;
}
