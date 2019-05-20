import { schemaMap } from './__mocks__/mockSchema';

import validateMainSchema from 'schema/validators/validateMainSchema';
import validateDictionarySchema from 'schema/validators/validateDictionarySchema';
import validateStorySchema from 'schema/validators/validateStorySchema';

import SchemaValidationError, {
  SchemaValidationErrorType
} from 'schema/errors/SchemaValidationError';

import validateAllSchema from './validateAllSchema';

jest.mock('schema/validators/validateMainSchema', () => jest.fn().mockReturnValue(true));
jest.mock('schema/validators/validateDictionarySchema', () => jest.fn().mockReturnValue(true));
jest.mock('schema/validators/validateStorySchema', () => jest.fn().mockReturnValue(true));

describe('validateAllSchema', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should return true when all validators pass without errors', () => {
    const result = validateAllSchema(schemaMap);

    expect(result).toBe(true);

    expect(validateMainSchema).toHaveBeenCalledTimes(1);
    expect(validateMainSchema).toHaveBeenCalledWith(schemaMap.mainSchema);

    expect(validateDictionarySchema).toHaveBeenCalledTimes(1);
    expect(validateDictionarySchema).toHaveBeenCalledWith(schemaMap.dictionarySchema);

    expect(validateStorySchema).toHaveBeenCalledTimes(1);
    expect(validateStorySchema).toHaveBeenCalledWith(schemaMap.storySchema);
  });

  it('Should throw an error when main validator throws', () => {
    expect.hasAssertions();

    // @ts-ignore
    validateMainSchema.mockImplementation(() => {
      throw new SchemaValidationError('main.toml', SchemaValidationErrorType.missingField, [
        'description'
      ]);
    });

    expect(() => validateAllSchema(schemaMap)).toThrowError(SchemaValidationError);
  });

  it('Should throw an error when dictionary validator throws', () => {
    expect.hasAssertions();

    // @ts-ignore
    validateDictionarySchema.mockImplementation(() => {
      throw new SchemaValidationError('dictionary.toml', SchemaValidationErrorType.emptySchema, [
        'phrase type'
      ]);
    });

    expect(() => validateAllSchema(schemaMap)).toThrowError(SchemaValidationError);
  });

  it('Should throw an error when story validator throws', () => {
    expect.hasAssertions();

    // @ts-ignore
    validateStorySchema.mockImplementation(() => {
      throw new SchemaValidationError('story.toml', SchemaValidationErrorType.emptySchema, [
        'scene'
      ]);
    });

    expect(() => validateAllSchema(schemaMap)).toThrowError(SchemaValidationError);
  });
});
