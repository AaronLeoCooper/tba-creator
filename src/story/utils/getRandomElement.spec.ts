import getRandomElement from './getRandomElement';

describe('getRandomElement', () => {
  it('Should return the first element when Math.random returns 0', () => {
    jest.spyOn(Math, 'random').mockImplementationOnce(() => 0);

    const result = getRandomElement(['a', 'b', 'c']);

    expect(result).toBe('a');
  });

  it('Should return the last element when Math.random returns 0.999', () => {
    jest.spyOn(Math, 'random').mockImplementationOnce(() => 0.999);

    const result = getRandomElement(['a', 'b', 'c']);

    expect(result).toBe('c');
  });

  it('Should return the middle element when Math.random returns 0.54', () => {
    jest.spyOn(Math, 'random').mockImplementationOnce(() => 0.54);

    const result = getRandomElement(['a', 'b', 'c']);

    expect(result).toBe('b');
  });
});
