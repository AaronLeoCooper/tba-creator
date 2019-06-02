import { StorySchema } from '../../types/StorySchema';

import SchemaValidationError from '../errors/SchemaValidationError';

import validateStorySchema from './validateStorySchema';

describe('validateStorySchema', () => {
  it('Should throw a SchemaValidationError when scenes is empty', () => {
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

  it('Should throw a SchemaValidationError when a scene has an empty "name"', () => {
    try {
      const schema: StorySchema = {
        scenes: [
          { name: 'a', description: 'a', responses: [] },
          { name: 'b', description: 'b', responses: [] },
          { name: '', description: 'c', ending: true }
        ]
      };

      validateStorySchema(schema);
    } catch (err) {
      expect(err).toBeInstanceOf(SchemaValidationError);
      expect(err.message).toBe('story.toml has an empty "name" at: 3rd scenes');
    }
  });

  it('Should throw a SchemaValidationError when a scene has an empty "description"', () => {
    try {
      const schema: StorySchema = {
        scenes: [
          { name: 'a', description: '' },
          { name: 'b', description: 'b' },
          { name: 'c', description: 'c' }
        ]
      };

      validateStorySchema(schema);
    } catch (err) {
      expect(err).toBeInstanceOf(SchemaValidationError);
      expect(err.message).toBe('story.toml has an empty "description" at: 1st scenes');
    }
  });

  it('Should throw a SchemaValidationError when two scenes have the same "name"', () => {
    try {
      const schema: StorySchema = {
        scenes: [
          { name: 'a', description: 'a' },
          { name: 'a', description: 'a' },
          { name: 'b', description: 'b' }
        ]
      };

      validateStorySchema(schema);
    } catch (err) {
      expect(err).toBeInstanceOf(SchemaValidationError);
      expect(err.message).toBe('story.toml has two scenes with the same "name", check the 1st and 2nd scenes');
    }
  });

  it('Should throw a SchemaValidationError when a scene has none of: ending, responses', () => {
    try {
      const schema: StorySchema = {
        scenes: [
          { name: 'a', description: 'a', responses: [] },
          { name: 'b', description: 'b' },
          { name: 'c', description: 'c', ending: true }
        ]
      };

      validateStorySchema(schema);
    } catch (err) {
      expect(err).toBeInstanceOf(SchemaValidationError);
      expect(err.message).toBe('story.toml must have at least one of the following fields: ending, responses at: 2nd scenes');
    }
  });

  it('Should return true when passed object has no validation errors', () => {
    const schema: StorySchema = {
      scenes: [
        { name: 'a', description: 'a', responses: [] },
        { name: 'b', description: 'b', responses: [] },
        { name: 'c', description: 'c', ending: true }
      ]
    };

    const result = validateStorySchema(schema);

    expect(result).toBe(true);
  });
});
