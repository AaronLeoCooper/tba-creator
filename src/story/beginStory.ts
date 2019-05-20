import { SchemaMap } from 'types/Schema';

import * as print from 'io/print';
import { exit } from 'io/std';
import prompt from 'io/prompt';

/**
 * Starts the main story loop.
 * @param schemaMap {SchemaMap}
 */
export default async function beginStory(schemaMap: SchemaMap): Promise<boolean> {
  const { mainSchema, storySchema } = schemaMap;
  const { options } = mainSchema;

  let running = true;
  let scene = storySchema.scenes[0];

  while (running) {
    print.msg(scene.description);

    const input = await prompt();

    if (options.input.quitPhrases.includes(input)) {
      running = false;

      return exit(0);
    }
  }

  return exit(0);
}
