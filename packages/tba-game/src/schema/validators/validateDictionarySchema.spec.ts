import { DictionarySchema } from '../../types/DictionarySchema';

import SchemaValidationError from '../errors/SchemaValidationError';

import validateDictionarySchema from './validateDictionarySchema';

describe('validateDictionarySchema', () => {
  it('Should throw an SchemaValidationError when an empty object is passed', () => {
    expect.hasAssertions();

    try {
      validateDictionarySchema({});
    } catch (err) {
      expect(err).toBeInstanceOf(SchemaValidationError);
      expect(err.message).toBe('dictionary.toml must contain at least one "phrase type"');
    }
  });

  it('Should throw an SchemaValidationError when a phrase has an empty "name" field', () => {
    expect.hasAssertions();

    const dictionary = {
      actions: [
        { name: 'a', aka: ['something'] },
        { name: '', aka: ['something'] },
        { name: 'c', aka: ['something'] }
      ]
    };

    try {
      validateDictionarySchema(dictionary);
    } catch (err) {
      expect(err).toBeInstanceOf(SchemaValidationError);
      expect(err.message).toBe('dictionary.toml has an empty "name" at: 2nd actions');
    }
  });

  it('Should throw an SchemaValidationError when a phrase type contains a duplicate name', () => {
    expect.hasAssertions();

    const dictionary = {
      actions: [
        { name: 'a', aka: ['something'] },
        { name: 'b' },
        { name: 'b', aka: ['something'] }
      ]
    };

    try {
      validateDictionarySchema(dictionary);
    } catch (err) {
      expect(err).toBeInstanceOf(SchemaValidationError);
      expect(err.message).toBe('dictionary.toml has two actions with the same "name", check the 2nd and 3rd actions');
    }
  });

  it('Should return true when passed object has no validation errors', () => {
    expect.hasAssertions();

    const schema: DictionarySchema = {
      actions: [{ name: 'walk', aka: ['run'] }]
    };

    const result = validateDictionarySchema(schema);

    expect(result).toBe(true);
  });
});
