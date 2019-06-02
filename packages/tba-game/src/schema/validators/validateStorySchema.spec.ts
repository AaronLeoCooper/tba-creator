import { dictionarySchema } from '../__mocks__/mockSchema';

import { StorySchema } from '../../types/StorySchema';

import SchemaValidationError from '../errors/SchemaValidationError';

import validateStorySchema from './validateStorySchema';

describe('validateStorySchema', () => {
  const validResponse = { grammar: ['actions.open'], nextScene: 'a' };
  const validResponses = [validResponse, validResponse];

  it('Should throw a SchemaValidationError when scenes is empty', () => {
    expect.hasAssertions();

    try {
      const schema: StorySchema = {
        scenes: []
      };

      validateStorySchema(schema, dictionarySchema);
    } catch (err) {
      expect(err).toBeInstanceOf(SchemaValidationError);
      expect(err.message).toBe('story.toml has an empty "scenes"');
    }
  });

  it('Should throw a SchemaValidationError when a scene has an empty "name"', () => {
    expect.hasAssertions();

    try {
      const schema: StorySchema = {
        scenes: [
          { name: 'a', description: 'a', responses: validResponses },
          { name: '', description: 'b', ending: true }
        ]
      };

      validateStorySchema(schema, dictionarySchema);
    } catch (err) {
      expect(err).toBeInstanceOf(SchemaValidationError);
      expect(err.message).toBe('story.toml has an empty "name" at: 2nd scenes');
    }
  });

  it('Should throw a SchemaValidationError when a scene has an empty "description"', () => {
    expect.hasAssertions();

    try {
      const schema: StorySchema = {
        scenes: [
          { name: 'a', description: '', responses: validResponses },
          { name: 'b', description: 'b', responses: validResponses },
          { name: 'c', description: 'c', responses: validResponses }
        ]
      };

      validateStorySchema(schema, dictionarySchema);
    } catch (err) {
      expect(err).toBeInstanceOf(SchemaValidationError);
      expect(err.message).toBe('story.toml has an empty "description" at: 1st scenes');
    }
  });

  it('Should throw a SchemaValidationError when a scene has an empty "responses"', () => {
    expect.hasAssertions();

    try {
      const schema: StorySchema = {
        scenes: [
          { name: 'a', description: 'a', responses: validResponses },
          { name: 'b', description: 'b', responses: [] }
        ]
      };

      validateStorySchema(schema, dictionarySchema);
    } catch (err) {
      expect(err).toBeInstanceOf(SchemaValidationError);
      expect(err.message).toBe('story.toml has an empty "responses" at: 2nd scenes');
    }
  });

  it('Should throw a SchemaValidationError when a scene has none of: ending, responses', () => {
    expect.hasAssertions();

    try {
      const schema: StorySchema = {
        scenes: [
          { name: 'a', description: 'a', responses: validResponses },
          { name: 'b', description: 'b', ending: true },
          { name: 'c', description: 'c' }
        ]
      };

      validateStorySchema(schema, dictionarySchema);
    } catch (err) {
      expect(err).toBeInstanceOf(SchemaValidationError);
      expect(err.message).toBe(
        'story.toml must have at least one of the following fields: ending, responses at: 3rd scenes'
      );
    }
  });

  it('Should throw a SchemaValidationError when two scenes have the same "name"', () => {
    expect.hasAssertions();

    try {
      const schema: StorySchema = {
        scenes: [
          { name: 'a', description: 'a', responses: validResponses },
          { name: 'a', description: 'a', responses: validResponses },
          { name: 'b', description: 'b', ending: true }
        ]
      };

      validateStorySchema(schema, dictionarySchema);
    } catch (err) {
      expect(err).toBeInstanceOf(SchemaValidationError);
      expect(err.message).toBe(
        'story.toml has two scenes with the same "name", check the 1st and 2nd scenes'
      );
    }
  });

  it('Should throw a SchemaValidationError when a scene response has no grammar', () => {
    expect.hasAssertions();

    try {
      const schema: StorySchema = {
        scenes: [
          {
            name: 'a',
            description: 'a',
            responses: [validResponse, validResponse, { grammar: [], nextScene: 'a' }]
          }
        ]
      };

      validateStorySchema(schema, dictionarySchema);
    } catch (err) {
      expect(err).toBeInstanceOf(SchemaValidationError);
      expect(err.message).toBe('story.toml has an empty "grammar" at: 1st scenes > 3rd responses');
    }
  });

  it('Should throw a SchemaValidationError when a scene response has none of: nextScene, description', () => {
    expect.hasAssertions();

    try {
      const schema: StorySchema = {
        scenes: [
          {
            name: 'a',
            description: 'a',
            responses: [validResponse, { grammar: ['actions.open'] }]
          }
        ]
      };

      validateStorySchema(schema, dictionarySchema);
    } catch (err) {
      expect(err).toBeInstanceOf(SchemaValidationError);
      expect(err.message).toBe(
        'story.toml must have at least one of the following fields: nextScene, description at: 1st scenes > 2nd responses > grammar'
      );
    }
  });

  it('Should throw a SchemaValidationError when a scene response nextScene references a non-existent scene name', () => {
    expect.hasAssertions();

    try {
      const schema: StorySchema = {
        scenes: [
          {
            name: 'a',
            description: 'a',
            responses: [{ grammar: ['actions.open'], nextScene: 'unknown' }]
          }
        ]
      };

      validateStorySchema(schema, dictionarySchema);
    } catch (err) {
      expect(err).toBeInstanceOf(SchemaValidationError);
      expect(err.message).toBe(
        'story.toml has a "nextScene" at: 1st scenes > 1st responses, with a value of "unknown", but this doesn\'t exist in scenes'
      );
    }
  });

  it('Should throw a SchemaValidationError when a scene response grammar entry references a non-existent dictionary phrase type', () => {
    expect.hasAssertions();

    try {
      const schema: StorySchema = {
        scenes: [
          {
            name: 'a',
            description: 'a',
            responses: [validResponse, { grammar: ['colours.red'], nextScene: 'a' }]
          }
        ]
      };

      validateStorySchema(schema, dictionarySchema);
    } catch (err) {
      expect(err).toBeInstanceOf(SchemaValidationError);
      expect(err.message).toBe(
        'story.toml has a "grammar" at: 1st scenes > 2nd responses, with a value of "colours.red", but this doesn\'t exist in dictionary'
      );
    }
  });

  it('Should throw a SchemaValidationError when a scene response grammar entry references a non-existent dictionary phrase name', () => {
    expect.hasAssertions();

    try {
      const schema: StorySchema = {
        scenes: [
          {
            name: 'a',
            description: 'a',
            responses: [validResponse, { grammar: ['actions.hop'], nextScene: 'a' }]
          }
        ]
      };

      validateStorySchema(schema, dictionarySchema);
    } catch (err) {
      expect(err).toBeInstanceOf(SchemaValidationError);
      expect(err.message).toBe(
        'story.toml has a "grammar" at: 1st scenes > 2nd responses, with a value of "actions.hop", but this doesn\'t exist in dictionary'
      );
    }
  });

  it('Should return true when passed object has no validation errors', () => {
    expect.hasAssertions();

    const schema: StorySchema = {
      scenes: [
        { name: 'a', description: 'a', responses: validResponses },
        { name: 'b', description: 'b', responses: validResponses },
        { name: 'c', description: 'c', ending: true }
      ]
    };

    const result = validateStorySchema(schema, dictionarySchema);

    expect(result).toBe(true);
  });
});
