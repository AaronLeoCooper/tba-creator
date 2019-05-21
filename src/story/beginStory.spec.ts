import { schemaMap } from 'schema/__mocks__/mockSchema';

import * as print from 'io/print';
import prompt from 'io/prompt';

import beginStory from './beginStory';

jest.mock('io/print');
jest.mock('io/prompt');

describe('beginStory', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should print the first scene description and resolve with true when user enters a quit phrase', async () => {
    expect.hasAssertions();

    // @ts-ignore
    prompt.mockResolvedValueOnce('quit');

    const result = await beginStory(schemaMap);

    expect(print.msg).toHaveBeenCalledTimes(1);
    expect(print.msg).toHaveBeenCalledWith(schemaMap.storySchema.scenes[0].description);

    expect(result).toBe(true);
  });
});
