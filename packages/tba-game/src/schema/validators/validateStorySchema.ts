import { Scene, StorySchema } from '../../types/StorySchema';

import SchemaValidationError, { SchemaValidationErrorType } from '../errors/SchemaValidationError';
import getNextDuplicateIndex from './getNextDuplicateIndex';

const fileName = 'story.toml';

const oneOfSceneFields: (keyof Scene)[] = ['ending', 'responses'];

/**
 * Validates mandatory scene fields.
 * @param scene {Scene}
 * @param sceneIndex {number}
 * @throws {SchemaValidationError}
 * @returns {boolean}
 */
const validateMandatoryFields = (scene: Scene, sceneIndex: number): boolean => {
  const { name, description } = scene;

  if (!name) {
    throw new SchemaValidationError(fileName, SchemaValidationErrorType.emptyField, [
      `scenes[${sceneIndex}]`,
      'name'
    ]);
  }

  if (!description) {
    throw new SchemaValidationError(fileName, SchemaValidationErrorType.emptyField, [
      `scenes[${sceneIndex}]`,
      'description'
    ]);
  }

  const missingOneOfSceneFields = !oneOfSceneFields.some(
    (fieldName): boolean => Boolean(scene[fieldName])
  );

  if (missingOneOfSceneFields) {
    throw new SchemaValidationError(
      fileName,
      SchemaValidationErrorType.missingOneOf,
      [`scenes[${sceneIndex}]`],
      {
        missingFieldNames: oneOfSceneFields
      }
    );
  }

  return true;
};

/**
 * Validates scenes to ensure there are no duplicates.
 * @param scenes {Scene[]}
 * @param scene {Scene}
 * @param sceneIndex {number}
 * @throws {SchemaValidationError}
 * @returns {boolean}
 */
const validateDuplicateScenes = (scenes: Scene[], scene: Scene, sceneIndex: number): boolean => {
  const { name } = scene;

  const duplicateItemIndex = getNextDuplicateIndex(scenes, ['name', name], sceneIndex);

  if (duplicateItemIndex > -1) {
    throw new SchemaValidationError(
      fileName,
      SchemaValidationErrorType.duplicateItemField,
      ['scenes', 'name'],
      {
        duplicateIndexes: [sceneIndex, duplicateItemIndex]
      }
    );
  }

  return true;
};

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
      validateMandatoryFields(item, itemIndex);
      validateDuplicateScenes(scenes, item, itemIndex);
    }
  );

  return true;
}
