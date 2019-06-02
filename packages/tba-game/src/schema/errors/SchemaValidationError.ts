export enum SchemaValidationErrorType {
  emptyField,
  emptySchema,
  missingField,
  duplicateItemField,
  missingOneOf,
  invalidReference
}

interface ErrorOptions {
  duplicateIndexes?: [number, number];
  missingFieldNames?: string[];
  fieldValue?: string;
  referenceFieldName?: string;
}

/**
 * Returns a human-readable string number ending in "st", "nd", "rd" or "th".
 * @param index {number}
 * @returns {string}
 */
const getCountString = (index: number): string => {
  const count = String(index + 1);

  // teen numbers (11th, 12th, 13th, etc..)
  if (count.slice(-2, -1) === '1') {
    return `${count}th`;
  }

  switch (count.slice(-1)) {
    case '1':
      return `${count}st`;
    case '2':
      return `${count}nd`;
    case '3':
      return `${count}rd`;
    default:
      return `${count}th`;
  }
};

/**
 * Returns a human-readable path to a field with indexed fields resolved to a numbered entry,
 * e.g.: 'fieldName[12]' = '13th fieldName'.
 * @param path {string[]}
 * @returns {string}
 */
const getFieldPathStr = (path: string[]): string =>
  path.reduce((acc, segment): string => {
    const prefix = acc + (acc ? ' > ' : '');

    const indexMatches = /^(.+)\[([0-9]+)\]$/.exec(segment);

    if (indexMatches) {
      const [fieldName, index] = indexMatches.slice(1);

      return prefix + getCountString(Number(index)) + ' ' + fieldName;
    }

    return prefix + segment;
  }, '');

/**
 * Returns a customised string validation message based on the errorType and field location.
 * @param fileName {string}
 * @param errorType {SchemaValidationErrorType}
 * @param location {string[]}
 * @param options {ErrorOptions}
 * @returns {string}
 */
const getSchemaValidationErrorMsg = (
  fileName: string,
  errorType: SchemaValidationErrorType,
  location: string[],
  options: ErrorOptions
): string => {
  const path = location.slice(0);

  let baseMessage = '';
  let messageSuffix = '';

  switch (errorType) {
    case SchemaValidationErrorType.emptyField:
      baseMessage = `${fileName} has an empty "${path.pop()}"`;
      break;

    case SchemaValidationErrorType.emptySchema:
      baseMessage = `${fileName} must contain at least one "${path.pop()}"`;
      break;

    case SchemaValidationErrorType.missingField:
      baseMessage = `${fileName} is missing "${path.pop()}"`;
      break;

    case SchemaValidationErrorType.duplicateItemField: {
      const { duplicateIndexes = [] } = options;

      const fieldName = path.pop();
      const parentFieldName = path.pop() || 'items';

      baseMessage = `${fileName} has two ${parentFieldName} with the same "${fieldName}"`;

      const [firstIndex, secondIndex] = duplicateIndexes;

      messageSuffix = secondIndex
        ? `, check the ${getCountString(firstIndex)} and ${getCountString(
            secondIndex
          )} ${parentFieldName}`
        : '';

      break;
    }

    case SchemaValidationErrorType.missingOneOf: {
      const { missingFieldNames = [] } = options;

      baseMessage = `${fileName} must have at least one of the following fields: ${missingFieldNames.join(', ')}`;

      break;
    }

    case SchemaValidationErrorType.invalidReference: {
      const { fieldValue, referenceFieldName } = options;

      baseMessage = `${fileName} has a "${path.pop()}"`;

      const suffixEnd = referenceFieldName ? ` in ${referenceFieldName}` : '';

      messageSuffix = `, with a value of "${fieldValue}", but this doesn\'t exist${suffixEnd}`;

      break;
    }
  }

  return path.length > 0
    ? `${baseMessage} at: ${getFieldPathStr(path)}${messageSuffix}`
    : `${baseMessage}${messageSuffix}`;
};

export default class SchemaValidationError extends Error {
  public fileName: string;
  public errorType: SchemaValidationErrorType;
  public location: string[];
  public options: ErrorOptions;

  public constructor(
    fileName: string,
    errorType: SchemaValidationErrorType,
    location: string[],
    options: ErrorOptions = {}
  ) {
    const message = getSchemaValidationErrorMsg(fileName, errorType, location, options);

    super(message);

    this.fileName = fileName;
    this.errorType = errorType;
    this.location = location;
    this.options = options;
  }
}
