import { dictionarySchema } from '../../schema/__mocks__/mockSchema';

import isMatchingResponse from './isMatchingResponse';

describe('isMatchingResponse', () => {
  const grammarRedDoor = ['actions.open', 'objects.red door'];
  const grammarBlueDoor = ['actions.open', 'objects.blue door'];

  it('Should return false when the input string does not match any grammar references', () => {
    const result = isMatchingResponse(dictionarySchema, grammarRedDoor, 'bubble');

    expect(result).toBe(false);
  });

  it('Should return false when the input string only matches the first grammar reference', () => {
    const result = isMatchingResponse(dictionarySchema, grammarRedDoor, 'open the cat');

    expect(result).toBe(false);
  });

  it('Should return false when the input string only matches the second grammar reference', () => {
    const result = isMatchingResponse(dictionarySchema, grammarBlueDoor, 'twist the blue door');

    expect(result).toBe(false);
  });

  it('Should return true when the input string matches all grammar names', () => {
    const result = isMatchingResponse(dictionarySchema, grammarRedDoor, 'open the red door');

    expect(result).toBe(true);
  });

  it('Should return true when the input string matches grammar names & aka phrases', () => {
    const result = isMatchingResponse(dictionarySchema, grammarBlueDoor, 'grab the blue door');

    expect(result).toBe(true);
  });
});
