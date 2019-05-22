/**
 * Returns a promise that resolves after the passed delay in milliseconds.
 * @param delayMs {number}
 */
export default function delay(delayMs = 0): Promise<void> {
  return new Promise((resolve): void => {
    setTimeout(resolve, delayMs);
  });
}
