import { stdin, stdout } from './std';

import prompt from './prompt';

jest.mock('./std');

describe('prompt', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // @ts-ignore
    stdin.once.mockImplementationOnce((event: string, cb: (data: object) => void) => {
      cb({
        toString: (): string => ' user input '
      });
    });
  });

  it('Should prompt for user input and resolve with trimmed input text', async () => {
    const userInput = await prompt();

    expect(stdin.resume).toHaveBeenCalledTimes(1);
    expect(stdin.pause).toHaveBeenCalledTimes(1);

    expect(userInput).toBe('user input');

    expect(stdout.write).not.toHaveBeenCalled();
  });

  it('Should display pre-input text when passed', async () => {
    const userInput = await prompt('Leading text:');

    expect(stdout.write).toHaveBeenCalledTimes(1);
    expect(stdout.write).toHaveBeenCalledWith('Leading text: ');

    expect(userInput).toBe('user input');
  });
});
