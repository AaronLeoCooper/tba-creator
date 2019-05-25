import { InputResponse, Scene } from '../../types/StorySchema';

/**
 * Returns the next scene object, or the current scene, based on the
 * passed input response object.
 * @param scenes {Scene[]}
 * @param currentScene {Scene}
 * @param inputResponse {InputResponse}
 * @returns {Scene}
 */
export default function getNextScene(
  scenes: Scene[],
  currentScene: Scene,
  inputResponse: InputResponse
): Scene {
  if (!inputResponse.nextScene) {
    return currentScene;
  }

  const nextScene = scenes.find(
    (scene): boolean => {
      return scene.name === inputResponse.nextScene;
    }
  );

  return nextScene || currentScene;
}
