import { StorySchema } from '../../types/StorySchema';

import SchemaValidationError from '../errors/SchemaValidationError';

import validateStorySchema from './validateStorySchema';

describe('validateStorySchema', () => {
  it('Should throw an SchemaValidationError when scenes is empty', () => {
    try {
      const schema: StorySchema = {
        scenes: []
      };

      validateStorySchema(schema);
    } catch (err) {
      expect(err).toBeInstanceOf(SchemaValidationError);
      expect(err.message).toBe('story.toml has an empty "scenes"');
    }
  });

  it('Should return true when passed object has no validation errors', () => {
    const schema: StorySchema = {
      scenes: [
        {
          name: '1',
          description: 'An awesome scene'
        }
      ]
    };

    const result = validateStorySchema(schema);

    expect(result).toBe(true);
  });
});
