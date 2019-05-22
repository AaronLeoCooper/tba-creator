import { SchemaMap } from 'types/Schema';
import { Scene } from 'types/StorySchema';
import { StateDescriptor } from 'types/Story';

import prompt from 'io/prompt';
import getStateDescriptor from 'story/state/getStateDescriptor';
import getDelayedPrint from 'story/utils/getDelayedPrint';

/**
 * Starts the main story loop.
 * @param schemaMap {SchemaMap}
 */
export default async function beginStory(schemaMap: SchemaMap): Promise<boolean> {
  const { mainSchema, storySchema } = schemaMap;
  const { preDelayMs, postDelayMs } = mainSchema.options.scene;

  const delayedPrint = getDelayedPrint({ preDelayMs, postDelayMs });

  let previousScene: Scene | void;

  const state: StateDescriptor = {
    running: true,
    scene: storySchema.scenes[0],
    description: undefined
  };

  while (state.running) {
    const { scene, description } = state;

    if (description) {
      await delayedPrint(description);

      if (previousScene && previousScene.name !== scene.name) {
        await delayedPrint(scene.description);
      }
    } else {
      await delayedPrint(scene.description);
    }

    if (scene.ending) {
      return true;
    }

    const userInput = await prompt();

    const nextState = getStateDescriptor(schemaMap, scene, userInput);

    if (state.scene.name !== nextState.scene.name) {
      previousScene = state.scene;
    }

    Object.assign(state, nextState);
  }

  return true;
}
