import FileMissingError from './FileMissingError';

describe('FileMissingError', () => {
  it('Should initialise an error with the expected message', () => {
    const result = new FileMissingError('myFile.txt');

    expect(result.message).toBe(
      'myFile.txt not found, please ensure it is present in the directory'
    );
  });
});
