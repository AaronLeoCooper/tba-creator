import { resolve } from "path";
import loadFile from 'io/loadFile';
import parseToml from 'parsers/parseToml';
import setSchemaDefaults from 'schema/setSchemaDefaults';

interface SchemaInterface<T> {
  load(filePath: string): Promise<T>
  validate(filePath: string): Promise<boolean>
}

export default class Schema<T> implements SchemaInterface<T> {
  private defaultSchema: T;

  public constructor(defaultSchema: T) {
    this.defaultSchema = defaultSchema;
  }

  private setDefaults(userSchema: object): T {

  }

  private async loadFile(filePath: string): Promise<T> {
    const tomlStr = await loadFile(filePath);
    const userSchema = await parseToml(tomlStr);

    return this.setDefaults(userSchema);
  }

  public async load(filePath: string) {
    const schema = this.loadFile(filePath);

    this.validate();

    return schema;
  }

  public async validate() {

  }
}
