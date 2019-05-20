import { SchemaType } from 'types/Schema';
import { MainSchema } from 'types/MainSchema';
import { DictionarySchema } from 'types/DictionarySchema';
import { StorySchema } from 'types/StorySchema';

import loadFile from 'io/loadFile';
import parseToml from 'schema/parsers/parseToml';
import setSchemaDefaults from './setSchemaDefaults';

import {
  partialDictionarySchemaJson,
  partialDictionarySchemaToml,
  partialMainSchemaJson,
  partialMainSchemaToml, partialStorySchemaJson, partialStorySchemaToml
} from '../__mocks__/mockSchema';

import loadSchema from './loadSchema';

jest.mock('io/loadFile');
jest.mock('schema/parsers/parseToml');

describe('loadSchema', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should pass the complete TOML file path to loadFile', () => {
    loadSchema('dir/path', SchemaType.main);

    expect(loadFile).toHaveBeenCalledTimes(1);

    // @ts-ignore
    expect(loadFile.mock.calls[0][0]).toBe('dir/path');
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
    loadFile.mockResolvedValueOnce(partialMainSchemaToml);
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
    loadFile.mockResolvedValueOnce(partialMainSchemaToml);
    // @ts-ignore
    parseToml.mockResolvedValueOnce(partialMainSchemaJson);

    const expectedSchema: MainSchema = setSchemaDefaults(SchemaType.main, partialMainSchemaJson);

    await expect(loadSchema('dir/path', SchemaType.main)).resolves.toEqual(expectedSchema);
  });

  it('Should resolve with a complete dictionary schema from the TOML file and defaults', async () => {
    // @ts-ignore
    loadFile.mockResolvedValueOnce(partialDictionarySchemaToml);
    // @ts-ignore
    parseToml.mockResolvedValueOnce(partialDictionarySchemaJson);

    const expectedSchema: DictionarySchema = setSchemaDefaults(
      SchemaType.dictionary,
      partialDictionarySchemaJson
    );

    await expect(loadSchema('dir/path', SchemaType.dictionary)).resolves.toEqual(expectedSchema);
  });

  it('Should resolve with a complete story schema from the TOML file and defaults', async () => {
    // @ts-ignore
    loadFile.mockResolvedValueOnce(partialStorySchemaToml);
    // @ts-ignore
    parseToml.mockResolvedValueOnce(partialStorySchemaJson);

    const expectedSchema: StorySchema = setSchemaDefaults(SchemaType.story, partialStorySchemaJson);

    await expect(loadSchema('dir/path', SchemaType.story)).resolves.toEqual(expectedSchema);
  });
});
