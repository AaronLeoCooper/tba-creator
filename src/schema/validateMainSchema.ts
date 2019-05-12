import { MainSchema } from 'types/MainSchema';
import { MissingFieldError } from 'schema/errors';

const fileName = 'main.toml';

/**
 * Validates a main schema object.
 * An error is thrown when validation fails, otherwise true is returned.
 * @param schema {MainSchema}
 * @throws {MissingFieldError}
 * @returns {boolean}
 */
export default function validateMainSchema(schema: MainSchema): boolean {
  if (schema.description.name.length === 0) {
    throw new MissingFieldError(fileName, ['description', 'name']);
  }

  return true;
}
