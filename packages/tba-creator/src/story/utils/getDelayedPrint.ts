import * as print from '../../io/print';
import delay from './delay';

interface PrintDelays {
  preDelayMs?: number;
  postDelayMs?: number;
}

type DelayedPrint = (message: string) => Promise<void>;

/**
 * Returns a function that prints a message with optional pre & post delays.
 * @param printDelays {PrintDelays}
 * @returns {DelayedPrint}
 */
export default function getDelayedPrint(printDelays: PrintDelays = {}): DelayedPrint {
  const { preDelayMs, postDelayMs } = printDelays;

  return async (message: string): Promise<void> => {
    await delay(preDelayMs);

    print.msg(message);

    await delay(postDelayMs);
  };
}
