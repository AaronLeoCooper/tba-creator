import { StorySchema } from 'types/StorySchema';

import SchemaValidationError, { SchemaValidationErrorType } from 'schema/errors/SchemaValidationError';

const fileName = 'story.toml';

/**
 * Validates a story schema object.
 * An error is thrown when validation fails, otherwise true is returned.
 * @param schema {StorySchema}
 * @throws {SchemaValidationError}
 * @returns {boolean}
 */
export default function validateStorySchema(schema: StorySchema): boolean {
  if (schema.scenes.length === 0) {
    throw new SchemaValidationError(fileName, SchemaValidationErrorType.emptyField, ['scenes']);
  }

  return true;
}
