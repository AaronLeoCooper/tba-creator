import { dictionarySchema, storySchema } from '../../schema/__mocks__/mockSchema';
import { Scene } from '../../types/StorySchema';

import getMatchingResponse from './getMatchingResponse';

describe('getMatchingResponse', () => {
  const currentScene: Scene = storySchema.scenes[0];

  it('Should return undefined when the user input is empty', () => {
    const result = getMatchingResponse(dictionarySchema, currentScene);

    expect(result).toBeUndefined();
  });

  it('Should return the first matched response for the given user input', () => {
    const result = getMatchingResponse(dictionarySchema, currentScene, 'open the red door');

    // @ts-ignore
    expect(result).toEqual(currentScene.responses[1]);
  });
});
