import delay from './delay';

describe('delay', () => {
  it('Should resolve after 0 ms by default', async () => {
    expect.hasAssertions();

    await expect(delay()).resolves.toBeUndefined();
  });

  it('Should resolve after the passed delay milliseconds', async () => {
    expect.hasAssertions();

    await expect(delay(100)).resolves.toBeUndefined();
  });
});
