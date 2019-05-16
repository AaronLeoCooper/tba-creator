import { SchemaType } from 'types/Schema';

import { exit } from 'io/std';
import loadSchema from 'schema/loadSchema';
import SchemaValidationError, { SchemaValidationErrorType } from 'schema/SchemaValidationError';
import FileMissingError from 'schema/FileMissingError';

import start from './index';

jest.mock('io/std');
jest.mock('io/print');
jest.mock('schema/loadSchema', () => jest.fn().mockResolvedValue({}));

describe('index', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should call loadSchema once for each schema file then exit with code 0', async () => {
    expect.hasAssertions();

    const result = await start('test/dir');

    expect(result).toBe(true);

    expect(loadSchema).toHaveBeenCalledTimes(3);
    expect(loadSchema).toHaveBeenCalledWith('test/dir', SchemaType.main);
    expect(loadSchema).toHaveBeenCalledWith('test/dir', SchemaType.dictionary);
    expect(loadSchema).toHaveBeenCalledWith('test/dir', SchemaType.story);

    expect(exit).toHaveBeenCalledTimes(1);
    expect(exit).toHaveBeenCalledWith(0);
  });

  it('Should call print.err then exit with code 1 when loadSchema throws a SchemaValidationError', async () => {
    expect.hasAssertions();

    // @ts-ignore
    loadSchema.mockRejectedValueOnce(
      new SchemaValidationError('main.toml', SchemaValidationErrorType.emptySchema, ['property'])
    );

    const result = await start('test/dir');

    expect(result).toBe(false);

    expect(exit).toHaveBeenCalledTimes(1);
    expect(exit).toHaveBeenCalledWith(1);
  });

  it('Should call print.err then exit with code 1 when loadSchema throws a FileMissingError', async () => {
    expect.hasAssertions();

    // @ts-ignore
    loadSchema.mockRejectedValueOnce(new FileMissingError('main.toml'));

    const result = await start('test/dir');

    expect(result).toBe(false);

    expect(exit).toHaveBeenCalledTimes(1);
    expect(exit).toHaveBeenCalledWith(1);
  });

  it('Should call print.err then exit with code 1 when loadSchema throws a generic error', async () => {
    expect.hasAssertions();

    // @ts-ignore
    loadSchema.mockRejectedValueOnce(new Error('Test error'));

    const result = await start('test/dir');

    expect(result).toBe(false);

    expect(exit).toHaveBeenCalledTimes(1);
    expect(exit).toHaveBeenCalledWith(1);
  });
});
