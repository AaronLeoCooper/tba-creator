export class UnreachableCaseError extends Error {
  public constructor(val: never) {
    super(`Unreachable case: ${val}`);
  }
}

export class MissingFieldError extends Error {
  public location: string[];

  public constructor(fileName: string, location: string[]) {
    const fieldName = location.slice(-1)[0];
    const path = location.slice(0, -1).join('.');

    const coreMessage = `${fileName} is missing "${fieldName}"`;

    const fullMessage = path ? `${coreMessage} under [${path}]` : coreMessage;

    super(fullMessage);

    this.location = location;
  }
}

export class EmptyFieldError extends Error {
  public location: string[];

  public constructor(fileName: string, location: string[]) {
    const fieldName = location.slice(-1)[0];
    const path = location.slice(0, -1).join('.');

    const coreMessage = `${fileName} has an empty "${fieldName}"`;

    const fullMessage = path ? `${coreMessage} under [${path}]` : coreMessage;

    super(fullMessage);

    this.location = location;
  }
}

export class EmptySchemaError extends Error {
  public constructor(fileName: string, missingItem: string) {
    super(`${fileName} must contain at least one ${missingItem}`);
  }
}
