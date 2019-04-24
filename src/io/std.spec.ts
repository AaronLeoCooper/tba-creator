import { stdin, stdout } from './std';

describe('std', () => {
  describe('stdin', () => {
    it('Should be process.stdin', () => {
      expect(stdin).toEqual(process.stdin);
    });
  });

  describe('stdout', () => {
    it('Should be process.stdout', () => {
      expect(stdout).toEqual(process.stdout);
    });
  });
});
