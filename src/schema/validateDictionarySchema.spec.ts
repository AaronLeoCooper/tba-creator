import { EmptySchemaError } from 'schema/errors';
import { DictionarySchema } from 'types/DictionarySchema';

import validateDictionarySchema from './validateDictionarySchema';

describe('validateDictionarySchema', () => {
  it('Should throw an EmptySchemaError when an empty object is passed', () => {
    try {
      validateDictionarySchema({});
    } catch (err) {
      expect(err).toBeInstanceOf(EmptySchemaError);
      expect(err.message).toBe('dictionary.toml must contain at least one phrase type');
    }
  });

  it('Should return true when passed object has no validation errors', () => {
    const schema: DictionarySchema = {
      actions: [{ name: 'walk', aka: ['run'] }]
    };

    const result = validateDictionarySchema(schema);

    expect(result).toBe(true);
  });
});
