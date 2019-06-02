type ItemValue = any; // eslint-disable-line @typescript-eslint/no-explicit-any

/**
 * Returns an index number pointing to the next array item with the same field value
 * found occurring after fromIndex in the array.
 * @param array {object[]}
 * @param fieldDescriptor {[string, ItemValue]} An array containing the field name and value.
 * @param fromIndex {number}
 * @returns {number}
 */
export default function getNextDuplicateIndex<T extends {}, K extends keyof T>(
  array: T[],
  fieldDescriptor: [K, ItemValue],
  fromIndex: number
): number {
  const [fieldName, fieldValue] = fieldDescriptor;

  const duplicateIndex = array.slice(fromIndex + 1).findIndex(
    (item): boolean => {
      return fieldValue === item[fieldName];
    }
  );

  return duplicateIndex > -1 ? duplicateIndex + fromIndex + 1 : duplicateIndex;
}
