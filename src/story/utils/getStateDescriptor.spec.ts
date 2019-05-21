import { schemaMap, storySchema } from 'schema/__mocks__/mockSchema';

import getStateDescriptor from './getStateDescriptor';

describe('getStateDescriptor', () => {
  it('Should return a descriptor with running: false when a quit phrase is entered', () => {
    const result = getStateDescriptor(schemaMap, storySchema.scenes[0], 'quit');

    expect(result).toEqual({
      running: false,
      scene: storySchema.scenes[0]
    });
  });

  describe('No matching response', () => {
    it('Should return a descriptor with the same scene included', () => {
      const result = getStateDescriptor(schemaMap, storySchema.scenes[0]);

      expect(result).toEqual({
        running: true,
        scene: storySchema.scenes[0]
      });
    });
  });
});
