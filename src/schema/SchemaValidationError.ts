export enum SchemaValidationErrorType {
  emptyField,
  emptySchema,
  missingField
}

const getSchemaValidationErrorMsg = (
  fileName: string,
  errorType: SchemaValidationErrorType,
  location: string[]
): string => {
  const fieldName = location.slice(-1)[0];
  const path = location.slice(0, -1).join('.');

  let baseMessage = '';

  switch (errorType) {
    case SchemaValidationErrorType.emptyField:
      baseMessage = `${fileName} has an empty "${fieldName}"`;
      break;

    case SchemaValidationErrorType.emptySchema:
      baseMessage = `${fileName} must contain at least one "${fieldName}"`;
      break;

    case SchemaValidationErrorType.missingField:
      baseMessage = `${fileName} is missing "${fieldName}"`;
      break;
  }

  return path ? `${baseMessage} under [${path}]` : baseMessage;
};

export default class SchemaValidationError extends Error {
  public fileName: string;
  public errorType: SchemaValidationErrorType;
  public location: string[];

  public constructor(fileName: string, errorType: SchemaValidationErrorType, location: string[]) {
    const message = getSchemaValidationErrorMsg(fileName, errorType, location);

    super(message);

    this.fileName = fileName;
    this.errorType = errorType;
    this.location = location;
  }
}
