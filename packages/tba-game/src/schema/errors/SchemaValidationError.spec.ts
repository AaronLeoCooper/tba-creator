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

      expect(result.message).toBe('filename.toml has an empty "child" at: root > parent');
    });

    it('Should initialise an emptyField Error with a field inside nested array entries', () => {
      const result = new SchemaValidationError(
        'filename.toml',
        SchemaValidationErrorType.emptyField,
        ['root[11]', 'parent', 'child[0]', 'sub child']
      );

      expect(result.message).toBe('filename.toml has an empty "sub child" at: 12th root > parent > 1st child');
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
        'filename.toml must contain at least one "child" at: root > parent'
      );
    });

    it('Should initialise an emptySchema Error with a field inside nested array entries', () => {
      const result = new SchemaValidationError(
        'filename.toml',
        SchemaValidationErrorType.emptySchema,
        ['root', 'parent[0]', 'child[2]', 'sub child']
      );

      expect(result.message).toBe(
        'filename.toml must contain at least one "sub child" at: root > 1st parent > 3rd child'
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

      expect(result.message).toBe('filename.toml is missing "child" at: root > parent');
    });

    it('Should initialise a missingField Error with a field inside nested array entries', () => {
      const result = new SchemaValidationError(
        'filename.toml',
        SchemaValidationErrorType.missingField,
        ['root[1]', 'parent[33]', 'child', 'sub child']
      );

      expect(result.message).toBe('filename.toml is missing "sub child" at: 2nd root > 34th parent > child');
    });
  });

  describe('duplicateItemField', () => {
    it('Should initialise a duplicateItemField Error with the expected message when location has 1 entry', () => {
      const result = new SchemaValidationError(
        'filename.toml',
        SchemaValidationErrorType.duplicateItemField,
        ['root']
      );

      expect(result.message).toBe('filename.toml has two items with the same "root"');
    });

    it('Should initialise a duplicateItemField Error with the expected message when location has 2 entries', () => {
      const result = new SchemaValidationError(
        'filename.toml',
        SchemaValidationErrorType.duplicateItemField,
        ['root', 'parent']
      );

      expect(result.message).toBe('filename.toml has two root with the same "parent"');
    });

    it('Should initialise a duplicateItemField Error with the expected message when location has 4 entries', () => {
      const result = new SchemaValidationError(
        'filename.toml',
        SchemaValidationErrorType.duplicateItemField,
        ['root', 'parent[5]', 'children', 'sub child']
      );

      expect(result.message).toBe('filename.toml has two children with the same "sub child" at: root > 6th parent');
    });

    it('Should initialise a duplicateItemField Error with item counts when duplicateIndexes is passed as an option', () => {
      const result = new SchemaValidationError(
        'filename.toml',
        SchemaValidationErrorType.duplicateItemField,
        ['root[41]', 'parent', 'children', 'sub child'],
        { duplicateIndexes: [2, 17] }
      );

      expect(result.message).toBe('filename.toml has two children with the same "sub child" at: 42nd root > parent, check the 3rd and 18th children');
    });
  });

  describe('missingOneOf', () => {
    it('Should initialise a missingOneOf Error with the expected message when location has 1 entry', () => {
      const result = new SchemaValidationError(
        'filename.toml',
        SchemaValidationErrorType.missingOneOf,
        ['root'],
        {
          missingFieldNames: ['name', 'description']
        }
      );

      expect(result.message).toBe('filename.toml must have at least one of the following fields: name, description at: root');
    });

    it('Should initialise a missingOneOf Error with the expected message when location has several entries', () => {
      const result = new SchemaValidationError(
        'filename.toml',
        SchemaValidationErrorType.missingOneOf,
        ['root', 'parent[2]', 'child'],
        {
          missingFieldNames: ['name', 'description']
        }
      );

      expect(result.message).toBe('filename.toml must have at least one of the following fields: name, description at: root > 3rd parent > child');
    });
  });

  describe('invalidReference', () => {
    it('Should initialise an invalidReference Error with the expected message when location has 1 entry', () => {
      const result = new SchemaValidationError(
        'filename.toml',
        SchemaValidationErrorType.invalidReference,
        ['root'],
        {
          fieldValue: 'a value'
        }
      );

      expect(result.message).toBe('filename.toml has a "root", with a value of "a value", but this doesn\'t exist');
    });

    it('Should initialise an invalidReference Error with the expected message when there is no referenceFieldName', () => {
      const result = new SchemaValidationError(
        'filename.toml',
        SchemaValidationErrorType.invalidReference,
        ['root', 'parent'],
        {
          fieldValue: 'a value'
        }
      );

      expect(result.message).toBe('filename.toml has a "parent" at: root, with a value of "a value", but this doesn\'t exist');
    });

    it('Should initialise an invalidReference Error with the expected message when a referenceFieldName is provided', () => {
      const result = new SchemaValidationError(
        'filename.toml',
        SchemaValidationErrorType.invalidReference,
        ['root', 'parent', 'child'],
        {
          fieldValue: 'a value',
          referenceFieldName: 'otherField'
        }
      );

      expect(result.message).toBe('filename.toml has a "child" at: root > parent, with a value of "a value", but this doesn\'t exist in otherField');
    });
  });
});
