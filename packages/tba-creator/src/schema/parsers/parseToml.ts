import { parse } from 'toml';

/**
 * Resolves with a JSON representation of the passed TOML string.
 */
export default async function parseToml(tomlStr: string): Promise<object> {
  const jsonData = parse(tomlStr);

  return jsonData;
}
