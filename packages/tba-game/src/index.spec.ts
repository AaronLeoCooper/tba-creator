import { exit } from './io/std';
import * as print from './io/print';
import loadAllSchema from './schema/loadAllSchema';
import validateAllSchema from './schema/validateAllSchema';
import beginStory from './story/beginStory';

import main from './index';

jest.mock('./io/std');
jest.mock('./io/print');
jest.mock('./schema/loadAllSchema', () =>
  jest.fn().mockResolvedValue({
    mainSchema: {},
    dictionarySchema: {},
    storySchema: {}
  })
);
jest.mock('./schema/validateAllSchema', () => jest.fn().mockReturnValue(true));
jest.mock('./story/beginStory', () => jest.fn().mockResolvedValue(true));

describe('index', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should load & validate schema before executing beginStory when there are no errors', async () => {
    expect.hasAssertions();

    // @ts-ignore
    exit.mockReturnValueOnce(true);

    const result = await main('test/dir');

    expect(result).toBe(true);

    expect(loadAllSchema).toHaveBeenCalledTimes(1);
    expect(loadAllSchema).toHaveBeenCalledWith('test/dir');

    expect(validateAllSchema).toHaveBeenCalledTimes(1);
    expect(validateAllSchema).toHaveBeenCalledWith({
      mainSchema: {},
      dictionarySchema: {},
      storySchema: {}
    });

    expect(beginStory).toHaveBeenCalledTimes(1);
    expect(beginStory).toHaveBeenCalledWith({
      mainSchema: {},
      dictionarySchema: {},
      storySchema: {}
    });

    expect(exit).toHaveBeenCalledTimes(1);
    expect(exit).toHaveBeenCalledWith(0);

    expect(print.msg).not.toHaveBeenCalled();
  });

  it('Should print a message & exit code 0 when running only validation stage', async () => {
    expect.hasAssertions();

    // @ts-ignore
    exit.mockReturnValueOnce(true);

    const result = await main('test/dir', { onlyValidate: true });

    expect(result).toBe(true);

    expect(loadAllSchema).toHaveBeenCalledTimes(1);
    expect(loadAllSchema).toHaveBeenCalledWith('test/dir');

    expect(validateAllSchema).toHaveBeenCalledTimes(1);
    expect(validateAllSchema).toHaveBeenCalledWith({
      mainSchema: {},
      dictionarySchema: {},
      storySchema: {}
    });

    expect(print.msg).toHaveBeenCalledTimes(1);
    expect(print.msg).toHaveBeenCalledWith('All required schema files are present and valid');

    expect(exit).toHaveBeenCalledTimes(1);
    expect(exit).toHaveBeenCalledWith(0);

    expect(beginStory).not.toHaveBeenCalled();
  });

  it('Should call print.err then exit with code 1 when loadSchema throws an error', async () => {
    expect.hasAssertions();

    // @ts-ignore
    exit.mockReturnValueOnce(false);

    // @ts-ignore
    loadAllSchema.mockRejectedValueOnce(new Error('Test error'));

    const result = await main('test/dir');

    expect(result).toBe(false);

    expect(print.err).toHaveBeenCalledTimes(1);
    expect(print.err).toHaveBeenCalledWith('Test error');

    expect(exit).toHaveBeenCalledTimes(1);
    expect(exit).toHaveBeenCalledWith(1);

    expect(beginStory).not.toHaveBeenCalled();
  });
});
