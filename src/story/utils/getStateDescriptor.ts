import { SchemaMap } from 'types/Schema';
import { InputResponse, Scene } from 'types/StorySchema';
import { DictionarySchema } from 'types/DictionarySchema';
import { StateDescriptor } from 'types/Story';

import isQuitPhrase from 'story/matchers/isQuitPhrase';
import isMatchingResponse from 'story/matchers/isMatchingResponse';

/**
 * Returns a matching response from the
 * @param dictionarySchema {DictionarySchema}
 * @param currentScene {Scene}
 * @param userInput {string=}
 * @returns {InputResponse}
 */
function getMatchingResponse(
  dictionarySchema: DictionarySchema,
  currentScene: Scene,
  userInput?: string
): InputResponse | void {
  const { responses = [] } = currentScene;

  if (!userInput) {
    return;
  }

  return responses.find(
    ({ grammar }): boolean => isMatchingResponse(dictionarySchema, grammar, userInput)
  );
}

/**
 * Returns the next scene object, or the current scene, based on the
 * passed input response object.
 * @param scenes {Scene[]}
 * @param currentScene {Scene}
 * @param inputResponse {InputResponse}
 * @returns {Scene}
 */
function getNextScene(scenes: Scene[], currentScene: Scene, inputResponse: InputResponse): Scene {
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

/**
 * Returns a new story state descriptor object.
 * @param schemaMap {SchemaMap}
 * @param currentScene {Scene}
 * @param userInput {string=}
 * @returns {StateDescriptor}
 */
export default function getStateDescriptor(
  schemaMap: SchemaMap,
  currentScene: Scene,
  userInput?: string
): StateDescriptor {
  const { mainSchema, dictionarySchema, storySchema } = schemaMap;

  const defaultStateDescriptor = {
    running: true,
    scene: currentScene
  };

  if (isQuitPhrase(mainSchema.options.input.quitPhrases, userInput)) {
    return {
      ...defaultStateDescriptor,
      running: false
    };
  }

  const matchingResponse = getMatchingResponse(dictionarySchema, currentScene, userInput);

  if (!matchingResponse) {
    return defaultStateDescriptor;
  }

  return {
    ...defaultStateDescriptor,
    scene: getNextScene(storySchema.scenes, currentScene, matchingResponse),
    description: matchingResponse.description
  };
}
