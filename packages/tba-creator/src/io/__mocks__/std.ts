export const stdin = {
  resume: jest.fn(),
  once: jest.fn(),
  pause: jest.fn()
};

export const stdout = {
  write: jest.fn()
};

export const stderr = {
  write: jest.fn()
};

export const exit = jest.fn();
