import loadSchema from 'schema/loadSchema';
import FileMissingError from 'schema/FileMissingError';

import loadAllSchema from './loadAllSchema';

jest.mock('schema/loadSchema');

describe('loadAllSchema', () => {
  it('Should reject with an error when once of the schema files fails to load', async () => {
    expect.hasAssertions();

    loadSchema
      // @ts-ignore
      .mockResolvedValueOnce({ a: 1 })
      .mockRejectedValueOnce(new FileMissingError('file.txt'));

    try {
      await loadAllSchema('schema/dir');
    } catch (err) {
      expect(err).toBeInstanceOf(FileMissingError);
    }
  });

  it('Should resolve with an object containing all schema objects', async () => {
    expect.hasAssertions();

    loadSchema
      // @ts-ignore
      .mockResolvedValueOnce({ a: 1 })
      .mockResolvedValueOnce({ b: 2 })
      .mockResolvedValueOnce({ c: 3 });

    const result = await loadAllSchema('schema/dir');

    expect(result).toEqual({
      mainSchema: { a: 1 },
      dictionarySchema: { b: 2 },
      storySchema: { c: 3 }
    });
  });
});
