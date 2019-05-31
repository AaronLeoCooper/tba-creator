import { stdout } from './std';

import clearScreen from './clearScreen';

jest.mock('./std');

describe('clearScreen', () => {
  it('Should write the expected character sequence to clear the terminal to stdout', () => {
    clearScreen();

    expect(stdout.write).toHaveBeenCalledTimes(1);
    expect(stdout.write).toHaveBeenCalledWith('\u001b[2J\u001b[0;0H');
  });
});
