import { stdin, stdout, stderr, exit } from './std';

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

  describe('stderr', () => {
    it('Should be process.stderr', () => {
      expect(stderr).toEqual(process.stderr);
    });
  });

  describe('exit', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('Should call process.exit(0) & return true when nothing is passed', () => {
      // @ts-ignore
      jest.spyOn(process, 'exit').mockImplementationOnce(() => {});

      const result = exit();

      expect(process.exit).toHaveBeenCalledTimes(1);
      expect(process.exit).toHaveBeenCalledWith(0);

      expect(result).toBe(true);
    });

    it('Should call process.exit(1) & return false when 1 passed', () => {
      // @ts-ignore
      jest.spyOn(process, 'exit').mockImplementationOnce(() => {});

      const result = exit(1);

      expect(process.exit).toHaveBeenCalledTimes(1);
      expect(process.exit).toHaveBeenCalledWith(1);

      expect(result).toBe(false);
    });
  });
});
