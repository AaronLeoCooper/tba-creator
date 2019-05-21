import { DictionarySchema } from 'types/DictionarySchema';

/**
 * Returns true if the input string matches all of the passed grammar references.
 * @param dictionarySchema {DictionarySchema}
 * @param grammar {string[]}
 * @param userInput {string}
 */
export default function isMatchingResponse(
  dictionarySchema: DictionarySchema,
  grammar: string[],
  userInput: string
): boolean {
  return grammar.every(
    (reference): boolean => {
      const [phraseType, phraseName] = reference.split('.');

      if (userInput.includes(phraseName)) {
        return true;
      }

      const phrase = dictionarySchema[phraseType].find(
        ({ name }): boolean => name === phraseName
      );

      if (phrase && phrase.aka) {
        return phrase.aka.some((akaPhrase): boolean => userInput.includes(akaPhrase));
      }

      return false;
    }
  );
}
