export const stdin = process.stdin;
export const stdout = process.stdout;
export const stderr = process.stderr;

export function exit(code: number = 0): boolean {
  process.exit(code);

  return code === 0;
}
