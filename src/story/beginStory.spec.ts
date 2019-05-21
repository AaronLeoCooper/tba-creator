import { schemaMap, storySchema } from 'schema/__mocks__/mockSchema';

import * as print from 'io/print';
import prompt from 'io/prompt';
import getStateDescriptor from 'story/utils/getStateDescriptor';

import beginStory from './beginStory';

jest.mock('io/print');
jest.mock('io/prompt');
jest.mock('story/utils/getStateDescriptor', () =>
  jest.fn().mockReturnValue({
    running: false
  })
);

describe('beginStory', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should print the first scene description & resolve with true when user quits', async () => {
    expect.hasAssertions();

    // @ts-ignore
    prompt.mockResolvedValueOnce('quit');

    // @ts-ignore
    getStateDescriptor.mockReturnValueOnce({
      running: false
    });

    const result = await beginStory(schemaMap);

    expect(getStateDescriptor).toHaveBeenCalledWith(schemaMap, storySchema.scenes[0], 'quit');

    expect(print.msg).toHaveBeenCalledTimes(1);
    expect(print.msg).toHaveBeenCalledWith(schemaMap.storySchema.scenes[0].description);

    expect(result).toBe(true);
  });

  it('Should print a response description when the next state descriptor has a "description"', async () => {
    expect.hasAssertions();

    // @ts-ignore
    prompt.mockResolvedValueOnce('text');

    // @ts-ignore
    getStateDescriptor.mockReturnValueOnce({
      description: 'Response 1 description'
    });

    await beginStory(schemaMap);

    expect(getStateDescriptor).toHaveBeenNthCalledWith(1, schemaMap, storySchema.scenes[0], 'text');
    expect(getStateDescriptor).toHaveBeenNthCalledWith(2, schemaMap, storySchema.scenes[0], '');

    expect(print.msg).toHaveBeenNthCalledWith(1, schemaMap.storySchema.scenes[0].description);
    expect(print.msg).toHaveBeenNthCalledWith(2, 'Response 1 description');
  });

  it('Should print an ending scene description when the next state descriptor has ending: true', async () => {
    expect.hasAssertions();

    // @ts-ignore
    getStateDescriptor.mockReturnValueOnce({
      scene: {
        description: 'Ending description',
        ending: true
      }
    });

    await beginStory(schemaMap);

    expect(print.msg).toHaveBeenNthCalledWith(2, 'Ending description');
  });
});
