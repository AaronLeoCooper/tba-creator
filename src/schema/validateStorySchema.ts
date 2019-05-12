import { EmptyFieldError } from 'schema/errors';
import { StorySchema } from 'types/StorySchema';

const fileName = 'story.toml';

/**
 * Validates a story schema object.
 * An error is thrown when validation fails, otherwise true is returned.
 * @param schema {StorySchema}
 * @throws {EmptyFieldError}
 * @returns {boolean}
 */
export default function validateStorySchema(schema: StorySchema): boolean {
  if (schema.scenes.length === 0) {
    throw new EmptyFieldError(fileName, ['scenes']);
  }

  return true;
}
