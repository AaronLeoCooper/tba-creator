import { readFile } from 'fs';

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
    loadFile('file/path');

    expect(readFile).toHaveBeenCalledTimes(1);

    // @ts-ignore
    expect(readFile.mock.calls[0][0]).toBe('file/path');
  });

  it('Should reject with an error when file read operation fails', async () => {
    // @ts-ignore
    readFile.mockImplementationOnce((path, encoding, cb) => cb(new Error('File read error')));

    await expect(loadFile('file/path')).rejects.toBeInstanceOf(Error);
  });

  it('Should resolve with the expected file content string', async () => {
    // @ts-ignore
    readFile.mockImplementationOnce((path, encoding, cb) => cb(undefined, textContent));

    await expect(loadFile('file/path')).resolves.toBe(textContent);
  });
});
