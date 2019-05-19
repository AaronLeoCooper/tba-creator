import SchemaValidationError, { SchemaValidationErrorType } from './SchemaValidationError';

describe('SchemaValidationError', () => {
  describe('emptyField', () => {
    it('Should initialise an emptyField Error with a minimal message when location has 1 entry', () => {
      const result = new SchemaValidationError(
        'filename.toml',
        SchemaValidationErrorType.emptyField,
        ['root']
      );

      expect(result.message).toBe('filename.toml has an empty "root"');
    });

    it('Should initialise an emptyField Error with a full message when location has multiple entries', () => {
      const result = new SchemaValidationError(
        'filename.toml',
        SchemaValidationErrorType.emptyField,
        ['root', 'parent', 'child']
      );

      expect(result.message).toBe('filename.toml has an empty "child" under [root.parent]');
    });
  });

  describe('emptySchema', () => {
    it('Should initialise an emptySchema Error with a minimal message when location has 1 entry', () => {
      const result = new SchemaValidationError(
        'filename.toml',
        SchemaValidationErrorType.emptySchema,
        ['root']
      );

      expect(result.message).toBe('filename.toml must contain at least one "root"');
    });

    it('Should initialise an emptySchema Error with a full message when location has multiple entries', () => {
      const result = new SchemaValidationError(
        'filename.toml',
        SchemaValidationErrorType.emptySchema,
        ['root', 'parent', 'child']
      );

      expect(result.message).toBe(
        'filename.toml must contain at least one "child" under [root.parent]'
      );
    });
  });

  describe('missingField', () => {
    it('Should initialise a missingField Error with a minimal message when location has 1 entry', () => {
      const result = new SchemaValidationError(
        'filename.toml',
        SchemaValidationErrorType.missingField,
        ['root']
      );

      expect(result.message).toBe('filename.toml is missing "root"');
    });

    it('Should initialise a missingField Error with a full message when location has multiple entries', () => {
      const result = new SchemaValidationError(
        'filename.toml',
        SchemaValidationErrorType.missingField,
        ['root', 'parent', 'child']
      );

      expect(result.message).toBe('filename.toml is missing "child" under [root.parent]');
    });
  });
});
