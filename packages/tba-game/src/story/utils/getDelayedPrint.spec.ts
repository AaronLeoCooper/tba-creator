import * as print from '../../io/print';
import delay from './delay';

import getDelayedPrint from './getDelayedPrint';

jest.mock('../../io/print');
jest.mock('./delay', () => jest.fn().mockResolvedValue(undefined));

describe('getDelayedPrint', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should print the passed message and resolve with 0ms delay by default', async () => {
    expect.hasAssertions();

    await getDelayedPrint()('Test message');

    expect(print.msg).toHaveBeenCalledTimes(1);
    expect(print.msg).toHaveBeenCalledWith('Test message');

    expect(delay).toHaveBeenNthCalledWith(1, undefined);
    expect(delay).toHaveBeenNthCalledWith(2, undefined);
  });

  it('Should print the passed message with a defined pre-delay', async () => {
    expect.hasAssertions();

    await getDelayedPrint({ preDelayMs: 500 })('Test message');

    expect(print.msg).toHaveBeenCalledTimes(1);
    expect(print.msg).toHaveBeenCalledWith('Test message');

    expect(delay).toHaveBeenNthCalledWith(1, 500);
    expect(delay).toHaveBeenNthCalledWith(2, undefined);
  });

  it('Should print the passed message with a defined post-delay', async () => {
    expect.hasAssertions();

    await getDelayedPrint({ postDelayMs: 750 })('Test message');

    expect(print.msg).toHaveBeenCalledTimes(1);
    expect(print.msg).toHaveBeenCalledWith('Test message');

    expect(delay).toHaveBeenNthCalledWith(1, undefined);
    expect(delay).toHaveBeenNthCalledWith(2, 750);
  });

  it('Should print the passed message with a defined pre & post-delay', async () => {
    expect.hasAssertions();

    await getDelayedPrint({ preDelayMs: 200, postDelayMs: 450 })('Test message');

    expect(print.msg).toHaveBeenCalledTimes(1);
    expect(print.msg).toHaveBeenCalledWith('Test message');

    expect(delay).toHaveBeenNthCalledWith(1, 200);
    expect(delay).toHaveBeenNthCalledWith(2, 450);
  });
});
