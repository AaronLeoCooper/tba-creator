import { SchemaMap } from 'types/Schema';
import { Scene } from 'types/StorySchema';
import { StateDescriptor } from 'types/Story';

import isQuitPhrase from 'story/matchers/isQuitPhrase';
import getRandomElement from 'story/utils/getRandomElement';
import getMatchingResponse from 'story/state/getMatchingResponse';
import getNextScene from 'story/state/getNextScene';

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

  const inputOptions = mainSchema.options.input;

  const defaultStateDescriptor = {
    running: true,
    scene: currentScene
  };

  if (isQuitPhrase(inputOptions.quitPhrases, userInput)) {
    return {
      ...defaultStateDescriptor,
      running: false
    };
  }

  const matchingResponse = getMatchingResponse(dictionarySchema, currentScene, userInput);

  if (!matchingResponse) {
    return {
      ...defaultStateDescriptor,
      description: getRandomElement(inputOptions.unknownPhraseWarnings)
    };
  }

  return {
    ...defaultStateDescriptor,
    scene: getNextScene(storySchema.scenes, currentScene, matchingResponse),
    description: matchingResponse.description
  };
}
