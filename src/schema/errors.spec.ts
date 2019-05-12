import { UnreachableCaseError, MissingFieldError, EmptyFieldError, EmptySchemaError } from './errors';

describe('errors', () => {
  describe('UnreachableCaseError', () => {
    it('Should initialise an Error with an unreachable case message', () => {
      // @ts-ignore
      const result = new UnreachableCaseError('unreachable');

      expect(result.message).toBe('Unreachable case: unreachable');
    });
  });

  describe('MissingFieldError', () => {
    it('Should initialise an Error with a minimal message & location when location has 1 entry', () => {
      const result = new MissingFieldError('filename.toml', ['root']);

      expect(result.message).toBe('filename.toml is missing "root"');
      expect(result.location).toEqual(['root']);
    });

    it('Should initialise an Error with a full message & location when location has multiple entries', () => {
      const result = new MissingFieldError('filename.toml', ['root', 'parent', 'child']);

      expect(result.message).toBe('filename.toml is missing "child" under [root.parent]');
      expect(result.location).toEqual(['root', 'parent', 'child']);
    });
  });

  describe('EmptyFieldError', () => {
    it('Should initialise an Error with a minimal message & location when location has 1 entry', () => {
      const result = new EmptyFieldError('filename.toml', ['root']);

      expect(result.message).toBe('filename.toml has an empty "root"');
      expect(result.location).toEqual(['root']);
    });

    it('Should initialise an Error with a full message & location when location has multiple entries', () => {
      const result = new EmptyFieldError('filename.toml', ['root', 'parent', 'child']);

      expect(result.message).toBe('filename.toml has an empty "child" under [root.parent]');
      expect(result.location).toEqual(['root', 'parent', 'child']);
    });
  });

  describe('EmptySchemaError', () => {
    it('Should initialise an Error containing the required field type', () => {
      const result = new EmptySchemaError('filename.toml', 'thingy');

      expect(result.message).toBe('filename.toml must contain at least one thingy');
    });
  });
});
