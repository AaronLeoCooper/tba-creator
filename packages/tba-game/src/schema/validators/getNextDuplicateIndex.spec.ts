import getNextDuplicateIndex from './getNextDuplicateIndex';

describe('getNextDuplicateIndex', () => {
  const items = [
    { name: 'a', responses: [] },
    { name: 'b', responses: [] },
    { name: 'b', responses: [] },
    { name: 'c', responses: [] },
    { name: 'a', responses: [] }
  ];

  it('Should return -1 when an empty array is passed', () => {
    // @ts-ignore
    const result = getNextDuplicateIndex([], ['key', 'value'], 0);

    expect(result).toBe(-1);
  });

  it('Should return -1 when an out-of-bounds fromIndex is provided', () => {
    const result = getNextDuplicateIndex(items, ['name', 'b'], 4);

    expect(result).toBe(-1);
  });

  it('Should return -1 when the given fieldDescriptor does not match anything after fromIndex', () => {
    const result = getNextDuplicateIndex(items, ['name', 'b'], 2);

    expect(result).toBe(-1);
  });

  describe('Matched item', () => {
    it('Should return index 2 when "b" is found after index 1', () => {
      const result = getNextDuplicateIndex(items, ['name', 'b'], 1);

      expect(result).toBe(2);
    });

    it('Should return index 4 when "a" is found after index 0', () => {
      const result = getNextDuplicateIndex(items, ['name', 'a'], 0);

      expect(result).toBe(4);
    });
  });
});
