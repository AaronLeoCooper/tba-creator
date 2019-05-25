import isQuitPhrase from './isQuitPhrase';

describe('isQuitPhrase', () => {
  const quitPhrases = ['quit', 'exit'];

  it('Should return false when an empty string is passed', () => {
    const result = isQuitPhrase(quitPhrases, '');

    expect(result).toBe(false);
  });

  it('Should return false when an non-quit phrase string is passed', () => {
    const result = isQuitPhrase(quitPhrases, 'quitter');

    expect(result).toBe(false);
  });

  it('Should return true when a quit phrase string is passed', () => {
    const result = isQuitPhrase(quitPhrases, 'exit');

    expect(result).toBe(true);
  });
});
