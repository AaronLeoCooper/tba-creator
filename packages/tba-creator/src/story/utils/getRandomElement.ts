/**
 * Returns a randomly picked element from the passed array.
 * @param array {any[]}
 * @returns {any}
 */
export default function getRandomElement<T>(array: T[]): T {
  const randomIndex = Math.floor(Math.random() * array.length);

  return array[randomIndex];
}
