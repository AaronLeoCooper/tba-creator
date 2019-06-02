import { Scene, StorySchema } from '../../types/StorySchema';

import SchemaValidationError, { SchemaValidationErrorType } from '../errors/SchemaValidationError';
import getNextDuplicateIndex from './getNextDuplicateIndex';

const fileName = 'story.toml';

const oneOfSceneFields: (keyof Scene)[] = ['ending', 'responses'];

/**
 * Validates a story schema object.
 * An error is thrown when validation fails, otherwise true is returned.
 * @param schema {StorySchema}
 * @throws {SchemaValidationError}
 * @returns {boolean}
 */
export default function validateStorySchema(schema: StorySchema): boolean {
  const { scenes } = schema;

  if (scenes.length === 0) {
    throw new SchemaValidationError(fileName, SchemaValidationErrorType.emptyField, ['scenes']);
  }

  scenes.forEach(
    (item, itemIndex): void => {
      const { name, description } = item;

      if (!name) {
        throw new SchemaValidationError(fileName, SchemaValidationErrorType.emptyField, [
          `scenes[${itemIndex}]`,
          'name'
        ]);
      }

      if (!description) {
        throw new SchemaValidationError(fileName, SchemaValidationErrorType.emptyField, [
          `scenes[${itemIndex}]`,
          'description'
        ]);
      }

      const duplicateItemIndex = getNextDuplicateIndex(scenes, ['name', name], itemIndex);

      if (duplicateItemIndex > -1) {
        throw new SchemaValidationError(
          fileName,
          SchemaValidationErrorType.duplicateItemField,
          ['scenes', 'name'],
          {
            duplicateIndexes: [itemIndex, duplicateItemIndex]
          }
        );
      }

      const missingOneOfSceneFields = !oneOfSceneFields.some(
        (fieldName): boolean => Boolean(item[fieldName])
      );

      if (missingOneOfSceneFields) {
        throw new SchemaValidationError(
          fileName,
          SchemaValidationErrorType.missingOneOf,
          [`scenes[${itemIndex}]`],
          {
            missingFieldNames: oneOfSceneFields
          }
        );
      }
    }
  );

  return true;
}
