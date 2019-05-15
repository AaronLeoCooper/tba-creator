import chalk from 'chalk';

import { msg, err } from './print';

jest.mock('chalk', () => ({
  red: jest.fn()
}));

describe('print', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('msg', () => {
    it('Should print normal text via console.log', () => {
      jest.spyOn(console, 'log');

      msg('Test text');

      expect(console.log).toHaveBeenCalledWith('Test text');
    });
  });

  describe('err', () => {
    it('Should print red text via console.error', () => {
      jest.spyOn(console, 'error');

      err('Error text');

      expect(chalk.red).toHaveBeenCalledWith('ERROR:', 'Error text');
      expect(console.error).toHaveBeenCalledTimes(1);
    });
  });
});
