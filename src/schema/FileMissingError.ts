export default class FileMissingError extends Error {
  public fileName: string;

  public constructor(fileName: string) {
    super(`${fileName} not found, please ensure it is present in the directory`);

    this.fileName = fileName;
  }
}

