import { Scene } from 'types/StorySchema';
import { SchemaMap } from 'types/Schema';
import { InputOptions } from 'types/MainSchema';

interface StateDescriptor {
  running: boolean;
  scene: Scene;
}

/**
 * Returns true if the user input string matches one of the main
 * input options quit phrases.
 * @param options {InputOptions}
 * @param userInput {string=}
 */
function isQuitPhrase(options: InputOptions, userInput?: string): boolean {
  return options.quitPhrases.includes(String(userInput));
}

/**
 * Returns the next scene found
 * @param schemaMap {SchemaMap}
 * @param currentScene {Scene}
 * @param userInput {string=}
 * @returns {StateDescriptor}
 */
function getNextScene(
  schemaMap: SchemaMap,
  currentScene: Scene,
  userInput?: string
): Scene {
  return currentScene;
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
  const { mainSchema } = schemaMap;

  if (isQuitPhrase(mainSchema.options.input, userInput)) {
    return {
      running: false,
      scene: currentScene
    };
  }

  const nextScene = getNextScene(schemaMap, currentScene, userInput);

  return {
    running: !Boolean(nextScene.ending),
    scene: nextScene
  };
}
