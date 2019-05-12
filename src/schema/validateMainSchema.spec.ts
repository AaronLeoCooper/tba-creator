import setSchemaDefaults from './setSchemaDefaults';
import { MissingFieldError } from './errors';

import { SchemaType } from '../types/Schema';

import validateMainSchema from './validateMainSchema';

describe('validateMainSchema', () => {
  it('Should reject with an MissingFieldError when a required field is empty', () => {
    const schema = setSchemaDefaults(SchemaType.main, {
      description: { name: '' }
    });

    try {
      validateMainSchema(schema);
    } catch (err) {
      expect(err).toBeInstanceOf(MissingFieldError);
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
