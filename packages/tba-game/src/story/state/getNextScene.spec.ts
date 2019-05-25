import { Scene } from '../../types/StorySchema';

import getNextScene from './getNextScene';

describe('getNextScene', () => {
  const scenes: Scene[] = [{ name: '1', description: 'One' }, { name: '2', description: 'Two' }];

  const currentScene: Scene = { name: '0', description: 'Zero' };

  it('Should return the current scene when the input response has no nextScene', () => {
    const result = getNextScene(scenes, currentScene, { grammar: [] });

    expect(result).toEqual(currentScene);
  });

  it('Should return the current scene when the input response nextScene does not match a scene', () => {
    const result = getNextScene(scenes, currentScene, { grammar: [], nextScene: '3' });

    expect(result).toEqual(currentScene);
  });

  it('Should return a new scene when the input response nextScene matches a scene', () => {
    const result = getNextScene(scenes, currentScene, { grammar: [], nextScene: '2' });

    expect(result).toEqual(scenes[1]);
  });
});
