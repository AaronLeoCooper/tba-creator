import { SchemaMap } from 'types/Schema';
import { StateDescriptor } from 'types/Story';

import * as print from 'io/print';
import prompt from 'io/prompt';
import getStateDescriptor from 'story/utils/getStateDescriptor';

/**
 * Starts the main story loop.
 * @param schemaMap {SchemaMap}
 */
export default async function beginStory(schemaMap: SchemaMap): Promise<boolean> {
  const { storySchema } = schemaMap;

  const state: StateDescriptor = {
    running: true,
    scene: storySchema.scenes[0],
    description: undefined
  };

  while (state.running) {
    const { scene, description } = state;

    print.msg(description || scene.description);

    if (scene.ending) {
      return true;
    }

    const userInput = await prompt();

    const nextState = getStateDescriptor(schemaMap, scene, userInput);

    Object.assign(state, nextState);
  }

  return true;
}
