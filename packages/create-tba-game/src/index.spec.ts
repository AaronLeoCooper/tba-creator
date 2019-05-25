import * as inquirer from 'inquirer';

import createGame from './createGame';

import runPrompt, { questions } from './index';

jest.mock('inquirer', () => ({
  prompt: jest.fn().mockResolvedValue({})
}));

jest.mock('./createGame', () => jest.fn().mockReturnValue(0));

describe('runPrompt', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should call create script after user completes inquirer questions', async () => {
    expect.hasAssertions();

    jest.spyOn(console, 'log').mockImplementationOnce(() => {});
    // @ts-ignore
    jest.spyOn(process, 'exit').mockImplementation(() => {});

    await runPrompt();

    expect(inquirer.prompt).toHaveBeenCalledTimes(1);
    expect(inquirer.prompt).toHaveBeenCalledWith(questions);

    expect(createGame).toHaveBeenCalledTimes(1);
    expect(createGame).toHaveBeenCalledWith({
      title: '',
      about: '',
      dirName: '',
      template: 'basic'
    });

    expect(process.exit).toHaveBeenCalledTimes(1);
    expect(process.exit).toHaveBeenCalledWith(0);
  });

  it('Should pass formatted user input values to create script', async () => {
    expect.hasAssertions();

    jest.spyOn(console, 'log').mockImplementationOnce(() => {});

    // @ts-ignore
    inquirer.prompt.mockReturnValueOnce({
      title: ' A test title ',
      about: ' This is a test description ',
      dirName: ' Test Dir 123 '
    });

    await runPrompt();

    expect(createGame).toHaveBeenCalledTimes(1);
    expect(createGame).toHaveBeenCalledWith({
      title: 'A test title',
      about: 'This is a test description',
      dirName: 'test-dir-123',
      template: 'basic'
    });
  });

  describe('questions', () => {
    describe('title', () => {
      const title = questions.find(({ name }) => name === 'title');

      describe('validate', () => {
        it('Should return a message when the user input is empty', () => {
          // @ts-ignore
          const result = title.validate('  ');

          expect(typeof result).toBe('string');
        });

        it('Should return true when the user input is not empty', () => {
          // @ts-ignore
          const result = title.validate(' title ');

          expect(result).toBe(true);
        });
      });
    });

    describe('dirName', () => {
      const dirName = questions.find(({ name }) => name === 'dirName');

      describe('default', () => {
        it('Should return a kebab-cased title', () => {
          // @ts-ignore
          const result = dirName.default({ title: ' Test Title ' });

          expect(result).toBe('test-title');
        });
      });

      describe('validate', () => {
        it('Should return a message when the user input is empty', () => {
          // @ts-ignore
          const result = dirName.validate('');

          expect(typeof result).toBe('string');
        });

        it('Should return a message when the user input contains spaces', () => {
          // @ts-ignore
          const result = dirName.validate('test directory');

          expect(typeof result).toBe('string');
        });

        it('Should return true when the user input is filled without spaces', () => {
          // @ts-ignore
          const result = dirName.validate('test-directory');

          expect(result).toBe(true);
        });
      });
    });
  });
});
