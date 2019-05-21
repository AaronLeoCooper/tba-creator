import { DictionarySchema } from 'types/DictionarySchema';
import { InputResponse, Scene } from 'types/StorySchema';

import isMatchingResponse from 'story/matchers/isMatchingResponse';

/**
 * Returns a matching response from the
 * @param dictionarySchema {DictionarySchema}
 * @param currentScene {Scene}
 * @param userInput {string=}
 * @returns {InputResponse}
 */
export default function getMatchingResponse(
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
