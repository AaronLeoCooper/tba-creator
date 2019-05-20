import { readFile } from 'fs';

import FileMissingError from 'schema/errors/FileMissingError';

import loadFile from './loadFile';

jest.mock('fs');

describe('loadFile', () => {
  const textContent = `This is the first line
This is the second line
This is the third line`;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should pass the file path to fs.readFile', () => {
    loadFile('file/path', 'fileName');

    expect(readFile).toHaveBeenCalledTimes(1);

    // @ts-ignore
    expect(readFile.mock.calls[0][0].replace(/\\/g, '/')).toContain('file/path/fileName');
  });

  it('Should reject with a FileMissingError when file read operation fails', async () => {
    // @ts-ignore
    readFile.mockImplementationOnce((path, encoding, cb) => cb(new Error('File read error')));

    await expect(loadFile('file/path', 'fileName')).rejects.toBeInstanceOf(FileMissingError);
  });

  it('Should resolve with the expected file content string', async () => {
    // @ts-ignore
    readFile.mockImplementationOnce((path, encoding, cb) => cb(undefined, textContent));

    await expect(loadFile('file/path', 'fileName')).resolves.toBe(textContent);
  });
});
