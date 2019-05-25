import { existsSync, writeFileSync } from 'fs';

import createGame, { getFilledTemplate } from './createGame';

jest.mock('fs', () => ({
  readdirSync: jest.fn().mockReturnValue(['file1.toml.txt', 'file2.toml.txt', 'file3.toml.txt']),
  existsSync: jest.fn().mockReturnValue(false),
  mkdirSync: jest.fn(),
  readFileSync: jest
    .fn()
    .mockReturnValue('title: $title$, about: $about$, dirName: $dirName$, version: $version$'),
  writeFileSync: jest.fn()
}));

describe('createGame', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should write one file for each template file with any template variables replaced', () => {
    jest.spyOn(console, 'log').mockImplementationOnce(() => {});

    const result = createGame({
      title: 'Test title',
      about: 'Test about',
      dirName: 'test-dir',
      template: 'basic'
    });

    expect(result).toBe(0);

    expect(writeFileSync).toHaveBeenCalledTimes(3);

    const expectedFileContent =
      'title: Test title, about: Test about, dirName: test-dir, version: *';

    expect(writeFileSync).toHaveBeenNthCalledWith(
      1,
      expect.stringContaining('file1.toml'),
      expectedFileContent
    );

    expect(writeFileSync).toHaveBeenNthCalledWith(
      2,
      expect.stringContaining('file2.toml'),
      expectedFileContent
    );

    expect(writeFileSync).toHaveBeenNthCalledWith(
      3,
      expect.stringContaining('file3.toml'),
      expectedFileContent
    );
  });

  it('Should print an error and not write any files when the directory already exists', () => {
    jest.spyOn(console, 'error').mockImplementationOnce(() => {});

    // @ts-ignore
    existsSync.mockReturnValueOnce(true);

    const result = createGame({
      title: 'Test title',
      about: 'Test about',
      dirName: 'test-dir',
      template: 'basic'
    });

    expect(result).toBe(1);

    expect(console.error).toHaveBeenCalledTimes(1);

    expect(writeFileSync).toHaveBeenCalledTimes(0);
  });

  describe('getFilledTemplate', () => {
    it('Should return the passed template string with variable names replaced', () => {
      const templateContent = 'abc def$title$ ghi $ignored$ title $about$jfk$title$';
      const replacements = [['title', '<<TITLE>>'], ['about', '{{ABOUT}}']];

      const result = getFilledTemplate(templateContent, replacements);

      expect(result).toBe('abc def<<TITLE>> ghi $ignored$ title {{ABOUT}}jfk<<TITLE>>');
    });
  });
});
