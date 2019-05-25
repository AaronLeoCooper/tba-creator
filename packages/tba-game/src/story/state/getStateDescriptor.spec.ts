import { mainSchema, schemaMap, storySchema } from '../../schema/__mocks__/mockSchema';

import getRandomElement from '../utils/getRandomElement';

import getStateDescriptor from './getStateDescriptor';

jest.mock('../utils/getRandomElement', () => jest.fn((arr) => arr[0]));

describe('getStateDescriptor', () => {
  it('Should return a descriptor with running: false when a quit phrase is entered', () => {
    const result = getStateDescriptor(schemaMap, storySchema.scenes[0], 'quit');

    expect(result).toEqual({
      running: false,
      scene: storySchema.scenes[0]
    });
  });

  describe('No matching response', () => {
    it('Should return a descriptor with a random unknown phrase message', () => {
      const result = getStateDescriptor(schemaMap, storySchema.scenes[0]);

      expect(result).toEqual({
        running: true,
        scene: storySchema.scenes[0],
        description: 'Unknown phrase 1'
      });

      expect(getRandomElement).toHaveBeenCalledTimes(1);
      expect(getRandomElement).toHaveBeenCalledWith(mainSchema.options.input.unknownPhraseWarnings);
    });
  });

  describe('Matching response', () => {
    it('Should return a descriptor with the matching response scene', () => {
      const result = getStateDescriptor(schemaMap, storySchema.scenes[0], 'open the red door');

      expect(result).toEqual({
        running: true,
        scene: storySchema.scenes[1]
      });
    });

    it('Should return a descriptor with the matching response description', () => {
      const result = getStateDescriptor(schemaMap, storySchema.scenes[0], 'open the blue door');

      expect(result).toEqual({
        running: true,
        scene: storySchema.scenes[0],
        description: 'Response 1 description'
      });
    });

    it('Should return a descriptor with the matching response description & nextScene', () => {
      const result = getStateDescriptor(schemaMap, storySchema.scenes[0], 'open my burger');

      expect(result).toEqual({
        running: true,
        scene: storySchema.scenes[1],
        description: 'Response 3 description'
      });
    });
  });
});
