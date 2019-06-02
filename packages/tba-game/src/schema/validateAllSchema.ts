import { SchemaMap } from '../types/Schema';

import validateMainSchema from './validators/validateMainSchema';
import validateDictionarySchema from './validators/validateDictionarySchema';
import validateStorySchema from './validators/validateStorySchema';

/**
 * Validates all passed sets of schema, returning true if all
 * are valid. An error will be thrown if validation fails in a schema.
 * @throws {SchemaValidationError}
 * @returns {boolean}
 */
export default function validateAllSchema(schemaMap: SchemaMap): boolean {
  const validMainSchema = validateMainSchema(schemaMap.mainSchema);
  const validDictionarySchema = validateDictionarySchema(schemaMap.dictionarySchema);
  const validStorySchema = validateStorySchema(schemaMap.storySchema, schemaMap.dictionarySchema);

  return Boolean(validMainSchema && validDictionarySchema && validStorySchema);
}
