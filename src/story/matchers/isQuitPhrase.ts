/**
 * Returns true if the user input string matches one of the main
 * input options quit phrases.
 * @param quitPhrases {string[]}
 * @param userInput {string=}
 */
export default function isQuitPhrase(quitPhrases: string[], userInput?: string): boolean {
  return quitPhrases.includes(String(userInput));
}
