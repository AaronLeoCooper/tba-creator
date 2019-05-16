import parseToml from './parseToml';

describe('parseToml', () => {
  const goodTomlStr = `[tomlObject]
isGoodToml = true
letters = ["a", "b", "c"]`;

  const badTomlStr = `[tomlObject]]
isGoodToml = false`;

  const parsedToml = {
    tomlObject: {
      isGoodToml: true,
      letters: ['a', 'b', 'c']
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should reject with an error when the TOML content parse fails', async () => {
    await expect(parseToml(badTomlStr)).rejects.toBeInstanceOf(Error);
  });

  it('Should resolve with the expected JSON when the TOML content is correctly parsed', async () => {
    await expect(parseToml(goodTomlStr)).resolves.toEqual(parsedToml);
  });
});
