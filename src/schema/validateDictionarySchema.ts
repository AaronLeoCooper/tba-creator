import { DictionarySchema } from 'types/DictionarySchema';

import SchemaValidationError, { SchemaValidationErrorType } from 'schema/SchemaValidationError';

const fileName = 'dictionary.toml';

/**
 * Validates a dictionary schema object.
 * An error is thrown when validation fails, otherwise true is returned.
 * @param schema {DictionarySchema}
 * @throws {SchemaValidationError}
 * @returns {boolean}
 */
export default function validateDictionarySchema(schema: DictionarySchema): boolean {
  if (Object.keys(schema).length === 0) {
    throw new SchemaValidationError(fileName, SchemaValidationErrorType.emptySchema, [
      'phrase type'
    ]);
  }

  return true;
}
