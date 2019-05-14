import { SchemaType } from 'types/Schema';

import setSchemaDefaults from './setSchemaDefaults';
import SchemaValidationError from './SchemaValidationError';

import validateMainSchema from './validateMainSchema';

describe('validateMainSchema', () => {
  it('Should reject with an SchemaValidationError when a required field is empty', () => {
    const schema = setSchemaDefaults(SchemaType.main, {
      description: { name: '' }
    });

    try {
      validateMainSchema(schema);
    } catch (err) {
      expect(err).toBeInstanceOf(SchemaValidationError);
      expect(err.message).toBe('main.toml is missing "name" under [description]');
    }
  });

  it('Should return true when there are no validation errors', () => {
    const schema = setSchemaDefaults(SchemaType.main, {
      description: { name: 'name' }
    });

    expect(validateMainSchema(schema)).toBe(true);
  });
});
