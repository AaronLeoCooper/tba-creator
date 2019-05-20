import { schemaMap, storySchema } from 'schema/__mocks__/mockSchema';

import getStateDescriptor from './getStateDescriptor';

describe('getStateDescriptor', () => {
  it('Should return a descriptor with running: false when a quit phrase is entered', () => {
    const result = getStateDescriptor(schemaMap, storySchema.scenes[0], 'quit');

    expect(result).toEqual({
      running: false,
      awaitInput: false,
      nextScene: storySchema.scenes[0]
    });
  });

  it('Should return a descriptor with nextScene loaded from the current scene', () => {
    const result = getStateDescriptor(schemaMap, storySchema.scenes[1]);

    expect(result).toEqual({
      running: true,
      awaitInput: true,
      nextScene: storySchema.scenes[3]
    });
  });
});
