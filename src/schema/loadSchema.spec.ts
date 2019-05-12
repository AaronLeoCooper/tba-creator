import loadFile from 'io/loadFile';
import parseToml from 'parsers/parseToml';
import setSchemaDefaults from './setSchemaDefaults';

import { SchemaType } from 'types/Schema';
import { MainSchema } from 'types/MainSchema';

import loadSchema from './loadSchema';

jest.mock('io/loadFile');
jest.mock('parsers/parseToml');

describe('loadSchema', () => {
  const mainSchemaToml = `[description]
name = "My game"
about = """
My game description
"""

[options.input]
caseSensitive = true
quitPhrases = [ "quit", "exit" ]

[options.scene]
postDelayMs: 50
`;

  const mainSchemaJson = {
    description: {
      name: 'My game',
      about: 'My game description'
    },
    options: {
      input: {
        caseSensitive: true,
        quitPhrases: ['quit', 'exit']
      },
      scene: {
        postDelayMs: 50
      }
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should pass the complete TOML file path to loadFile', () => {
    loadSchema('dir/path', SchemaType.main);

    expect(loadFile).toHaveBeenCalledTimes(1);

    // @ts-ignore
    const filePath = loadFile.mock.calls[0][0].replace(new RegExp('\\\\', 'g'), '/');

    expect(filePath).toEqual(expect.stringContaining('dir/path/main.toml'));
  });

  it('Should reject with an error when the specified schema file fails to load', async () => {
    // @ts-ignore
    loadFile.mockRejectedValueOnce(new Error('File load error'));

    try {
      await loadSchema('dir/path', SchemaType.main);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toBe('File load error');
    }
  });

  it('Should reject with an error when the TOML file schema fails to be parsed', async () => {
    // @ts-ignore
    loadFile.mockResolvedValueOnce(mainSchemaToml);
    // @ts-ignore
    parseToml.mockRejectedValueOnce(new Error('TOML parse error'));

    try {
      await loadSchema('dir/path', SchemaType.main);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toBe('TOML parse error');
    }
  });

  it('Should resolve with a complete main schema from the TOML file and defaults', async () => {
    // @ts-ignore
    loadFile.mockResolvedValueOnce(mainSchemaToml);
    // @ts-ignore
    parseToml.mockResolvedValueOnce(mainSchemaJson);

    const expectedSchema: MainSchema = setSchemaDefaults(SchemaType.main, mainSchemaJson);

    await expect(loadSchema('dir/path', SchemaType.main)).resolves.toEqual(expectedSchema);
  });
});
