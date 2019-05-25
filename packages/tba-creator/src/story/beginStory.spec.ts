import { schemaMap, storySchema } from '../schema/__mocks__/mockSchema';

import prompt from '../io/prompt';
import getStateDescriptor from './state/getStateDescriptor';
import getDelayedPrint from './utils/getDelayedPrint';

import beginStory from './beginStory';

jest.mock('../io/prompt');
jest.mock('./state/getStateDescriptor', () =>
  jest.fn().mockReturnValue({
    running: false,
    scene: { name: 'scene1' }
  })
);
jest.mock('./utils/getDelayedPrint', () => {
  const delayedPrint = jest.fn().mockResolvedValue(undefined);

  return jest.fn().mockReturnValue(delayedPrint);
});

describe('beginStory', () => {
  const delayedPrint = getDelayedPrint();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should initialise a delayed print with pre & post delay values from mainSchema options', async () => {
    expect.hasAssertions();

    await beginStory(schemaMap);

    expect(getDelayedPrint).toHaveBeenCalledTimes(1);
    expect(getDelayedPrint).toHaveBeenCalledWith({
      preDelayMs: 50,
      postDelayMs: 100
    });
  });

  it('Should print the first scene description & resolve with true when user quits', async () => {
    expect.hasAssertions();

    // @ts-ignore
    prompt.mockResolvedValueOnce('quit');

    // @ts-ignore
    getStateDescriptor.mockReturnValueOnce({
      running: false,
      scene: storySchema.scenes[0]
    });

    const result = await beginStory(schemaMap);

    expect(result).toBe(true);

    expect(getStateDescriptor).toHaveBeenCalledWith(schemaMap, storySchema.scenes[0], 'quit');

    expect(delayedPrint).toHaveBeenCalledTimes(1);
    expect(delayedPrint).toHaveBeenCalledWith(schemaMap.storySchema.scenes[0].description);

    expect(prompt).toHaveBeenCalledTimes(1);
  });

  it('Should print only the response description when the next state has a description & no scene change', async () => {
    expect.hasAssertions();

    // @ts-ignore
    prompt.mockResolvedValueOnce('text');

    // @ts-ignore
    getStateDescriptor.mockReturnValueOnce({
      scene: storySchema.scenes[0],
      description: 'Response 1 description'
    });

    await beginStory(schemaMap);

    expect(getStateDescriptor).toHaveBeenNthCalledWith(1, schemaMap, storySchema.scenes[0], 'text');
    expect(getStateDescriptor).toHaveBeenNthCalledWith(2, schemaMap, storySchema.scenes[0], '');

    expect(delayedPrint).toHaveBeenCalledTimes(2);
    expect(delayedPrint).toHaveBeenNthCalledWith(1, schemaMap.storySchema.scenes[0].description);
    expect(delayedPrint).toHaveBeenNthCalledWith(2, 'Response 1 description');

    expect(prompt).toHaveBeenCalledTimes(2);
  });

  it('Should print an end scene description & resolve when the next state descriptor has ending: true', async () => {
    expect.hasAssertions();

    // @ts-ignore
    getStateDescriptor.mockReturnValueOnce({
      scene: {
        description: 'Ending description',
        ending: true
      }
    });

    await beginStory(schemaMap);

    expect(delayedPrint).toHaveBeenNthCalledWith(2, 'Ending description');

    expect(prompt).toHaveBeenCalledTimes(1);
  });

  it('Should print a response description & the next scene description when the scene is changed', async () => {
    expect.hasAssertions();

    // @ts-ignore
    getStateDescriptor.mockReturnValueOnce({
      scene: storySchema.scenes[1],
      description: 'Pre-scene description'
    });

    await beginStory(schemaMap);

    expect(delayedPrint).toHaveBeenNthCalledWith(2, 'Pre-scene description');
    expect(delayedPrint).toHaveBeenNthCalledWith(3, 'Second scene');
  });
});
