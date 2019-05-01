import { getFilledTemplate } from './create';

describe('create', () => {
  describe('getFilledTemplate', () => {
    it('Should return the passed template string with variable names replaced', () => {
      const templateContent = 'abc def$title$ ghi $ignored$ $about$jfk$title$';
      const replacements = [['title', 'TITLE'], ['about', 'ABOUT']];

      const result = getFilledTemplate(templateContent, replacements);

      expect(result).toBe('abc defTITLE ghi $ignored$ ABOUTjfkTITLE');
    });
  });
});
