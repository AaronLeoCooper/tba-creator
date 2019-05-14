import { MainSchema } from 'types/MainSchema';

import SchemaValidationError, { SchemaValidationErrorType } from 'schema/SchemaValidationError';

const fileName = 'main.toml';

/**
 * Validates a main schema object.
 * An error is thrown when validation fails, otherwise true is returned.
 * @param schema {MainSchema}
 * @throws {SchemaValidationError}
 * @returns {boolean}
 */
export default function validateMainSchema(schema: MainSchema): boolean {
  if (schema.description.name.length === 0) {
    throw new SchemaValidationError(fileName, SchemaValidationErrorType.missingField, [
      'description',
      'name'
    ]);
  }

  return true;
}
