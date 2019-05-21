import { SchemaMap } from 'types/Schema';

import * as print from 'io/print';
import prompt from 'io/prompt';
import getStateDescriptor from 'story/utils/getStateDescriptor';

/**
 * Starts the main story loop.
 * @param schemaMap {SchemaMap}
 */
export default async function beginStory(schemaMap: SchemaMap): Promise<boolean> {
  const { storySchema } = schemaMap;

  const state = {
    running: true,
    scene: storySchema.scenes[0]
  };

  while (state.running) {
    print.msg(state.scene.description);

    const userInput = await prompt();

    const nextState = getStateDescriptor(schemaMap, state.scene, userInput);

    Object.assign(state, nextState);
  }

  return true;
}
