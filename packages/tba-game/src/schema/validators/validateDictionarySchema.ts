import { DictionarySchema } from '../../types/DictionarySchema';

import SchemaValidationError, { SchemaValidationErrorType } from '../errors/SchemaValidationError';

const fileName = 'dictionary.toml';

/**
 * Validates a dictionary schema object.
 * An error is thrown when validation fails, otherwise true is returned.
 * @param schema {DictionarySchema}
 * @throws {SchemaValidationError}
 * @returns {boolean}
 */
export default function validateDictionarySchema(schema: DictionarySchema): boolean {
  const phraseTypes = Object.keys(schema);

  if (phraseTypes.length === 0) {
    throw new SchemaValidationError(fileName, SchemaValidationErrorType.emptySchema, [
      'phrase type'
    ]);
  }

  phraseTypes.forEach(
    (phraseType): void => {
      const dictionaryItems = schema[phraseType];

      dictionaryItems.forEach(
        ({ name }, itemIndex): void => {
          if (!name) {
            throw new SchemaValidationError(fileName, SchemaValidationErrorType.emptyField, [
              `${phraseType}[${itemIndex}]`,
              'name'
            ]);
          }

          const duplicateItemIndex = dictionaryItems.findIndex(
            (dictionaryItem, duplicateIndex): boolean => {
              return name === dictionaryItem.name && duplicateIndex !== itemIndex;
            }
          );

          if (duplicateItemIndex > -1) {
            throw new SchemaValidationError(
              fileName,
              SchemaValidationErrorType.duplicateItemField,
              ['actions', 'name'],
              {
                duplicateIndexes: [itemIndex, duplicateItemIndex]
              }
            );
          }
        }
      );
    }
  );

  return true;
}
