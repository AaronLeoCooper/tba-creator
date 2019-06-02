import { Scene, StorySchema } from '../../types/StorySchema';

import SchemaValidationError, { SchemaValidationErrorType } from '../errors/SchemaValidationError';
import getNextDuplicateIndex from './getNextDuplicateIndex';
import { DictionarySchema } from '../../types/DictionarySchema';

const fileName = 'story.toml';

/**
 * Validates mandatory scene fields.
 * @param scene {Scene}
 * @param sceneIndex {number}
 * @throws {SchemaValidationError}
 * @returns {boolean}
 */
const validateMandatoryFields = (scene: Scene, sceneIndex: number): boolean => {
  const { name, description, responses, ending } = scene;

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

  if (!ending && responses && responses.length === 0) {
    throw new SchemaValidationError(fileName, SchemaValidationErrorType.emptyField, [
      `scenes[${sceneIndex}]`,
      'responses'
    ]);
  }

  const oneOfSceneFields: (keyof Scene)[] = ['ending', 'responses'];

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
 * Validates all responses for a scene.
 * @param dictionary {DictionarySchema}
 * @param scenes {Scene[]}
 * @param scene {Scene}
 * @param sceneIndex {number}
 * @throws {SchemaValidationError}
 * @returns {boolean}
 */
const validateResponses = (
  dictionary: DictionarySchema,
  scenes: Scene[],
  scene: Scene,
  sceneIndex: number
): boolean => {
  const { responses } = scene;

  if (responses) {
    responses.forEach(
      ({ grammar, description, nextScene }, responseIndex): void => {
        const responseLocation = [`scenes[${sceneIndex}]`, `responses[${responseIndex}]`];

        if (grammar.length === 0) {
          throw new SchemaValidationError(fileName, SchemaValidationErrorType.emptyField, [
            ...responseLocation,
            'grammar'
          ]);
        }

        if (!description && !nextScene) {
          throw new SchemaValidationError(
            fileName,
            SchemaValidationErrorType.missingOneOf,
            [...responseLocation, 'grammar'],
            {
              missingFieldNames: ['nextScene', 'description']
            }
          );
        }

        if (nextScene) {
          const linkedNextScene = scenes.find(
            (comparedScene): boolean => comparedScene.name === nextScene
          );

          if (!linkedNextScene) {
            throw new SchemaValidationError(
              fileName,
              SchemaValidationErrorType.invalidReference,
              [...responseLocation, 'nextScene'],
              {
                fieldValue: nextScene,
                referenceFieldName: 'scenes'
              }
            );
          }
        }

        grammar.forEach(
          (phraseReference): void => {
            const [phraseType, phraseName] = phraseReference.split('.');

            const phrases = dictionary[phraseType];

            if (!phrases || !phrases.some((phrase): boolean => phrase.name === phraseName)) {
              throw new SchemaValidationError(
                fileName,
                SchemaValidationErrorType.invalidReference,
                [...responseLocation, 'grammar'],
                {
                  fieldValue: phraseReference,
                  referenceFieldName: 'dictionary'
                }
              );
            }
          }
        );
      }
    );
  }

  return true;
};

/**
 * Validates a story schema object.
 * An error is thrown when validation fails, otherwise true is returned.
 * @param schema {StorySchema}
 * @param dictionary {DictionarySchema}
 * @throws {SchemaValidationError}
 * @returns {boolean}
 */
export default function validateStorySchema(
  schema: StorySchema,
  dictionary: DictionarySchema
): boolean {
  const { scenes } = schema;

  if (scenes.length === 0) {
    throw new SchemaValidationError(fileName, SchemaValidationErrorType.emptyField, ['scenes']);
  }

  scenes.forEach(
    (scene, sceneIndex): void => {
      validateMandatoryFields(scene, sceneIndex);
      validateDuplicateScenes(scenes, scene, sceneIndex);
      validateResponses(dictionary, scenes, scene, sceneIndex);
    }
  );

  return true;
}
