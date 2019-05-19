import { SchemaType } from 'types/Schema';

import { exit } from 'io/std';
import * as print from 'io/print';
import loadSchema from 'schema/loadSchema';

import main from './index';

jest.mock('io/std');
jest.mock('io/print');
jest.mock('schema/loadSchema', () => jest.fn().mockResolvedValue({}));

describe('index', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should call loadSchema once for each schema file then exit with code 0', async () => {
    expect.hasAssertions();

    // @ts-ignore
    exit.mockReturnValueOnce(true);

    const result = await main('test/dir');

    expect(result).toBe(true);

    expect(loadSchema).toHaveBeenCalledTimes(3);
    expect(loadSchema).toHaveBeenCalledWith('test/dir', SchemaType.main);
    expect(loadSchema).toHaveBeenCalledWith('test/dir', SchemaType.dictionary);
    expect(loadSchema).toHaveBeenCalledWith('test/dir', SchemaType.story);

    expect(exit).toHaveBeenCalledTimes(1);
    expect(exit).toHaveBeenCalledWith(0);
  });

  it('Should print a message & exit code 0 when running only validation stage', async () => {
    expect.hasAssertions();

    // @ts-ignore
    exit.mockReturnValueOnce(true);

    const result = await main('test/dir', { onlyValidate: true });

    expect(result).toBe(true);

    expect(loadSchema).toHaveBeenCalledTimes(3);
    expect(loadSchema).toHaveBeenCalledWith('test/dir', SchemaType.main);
    expect(loadSchema).toHaveBeenCalledWith('test/dir', SchemaType.dictionary);
    expect(loadSchema).toHaveBeenCalledWith('test/dir', SchemaType.story);

    expect(print.msg).toHaveBeenCalledTimes(1);
    expect(print.msg).toHaveBeenCalledWith('All required schema files are present and valid');

    expect(exit).toHaveBeenCalledTimes(1);
    expect(exit).toHaveBeenCalledWith(0);
  });

  it('Should call print.err then exit with code 1 when loadSchema throws an error', async () => {
    expect.hasAssertions();

    // @ts-ignore
    exit.mockReturnValueOnce(false);

    // @ts-ignore
    loadSchema.mockRejectedValueOnce(new Error('Test error'));

    const result = await main('test/dir');

    expect(result).toBe(false);

    expect(exit).toHaveBeenCalledTimes(1);
    expect(exit).toHaveBeenCalledWith(1);
  });
});
