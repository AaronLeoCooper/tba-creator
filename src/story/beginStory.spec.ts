import { schemaMap } from 'schema/__mocks__/mockSchema';

import * as print from 'io/print';
import { exit } from 'io/std';
import prompt from 'io/prompt';

import beginStory from './beginStory';

jest.mock('io/print');
jest.mock('io/std');
jest.mock('io/prompt');

describe('beginStory', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should display the first story scene description', () => {
    beginStory(schemaMap);

    expect(print.msg).toHaveBeenCalledTimes(1);
    expect(print.msg).toHaveBeenCalledWith(schemaMap.storySchema.scenes[0].description);
  });

  it('Should exit the program with code 0 when user input matches an exit phrase', async () => {
    expect.hasAssertions();

    // @ts-ignore
    prompt.mockResolvedValueOnce('quit');

    await beginStory(schemaMap);

    expect(exit).toHaveBeenCalledTimes(1);
    expect(exit).toHaveBeenCalledWith(0);
  });
});
