import { readdirSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

type Template = 'basic';

export interface CreateOptions {
  title: string;
  about: string;
  dirName: string;
  template: Template;
}

export function getFilledTemplate(templateContent: string, replacements: string[][]): string {
  return replacements.reduce(
    (acc, [name, replacement]): string =>
      acc.replace(new RegExp(`\\$${name}\\$`, 'g'), replacement),
    templateContent
  );
}

export default function create(options: CreateOptions): void {
  const { title, about, dirName, template } = options;

  const replacements = [['title', title], ['about', about], ['version', '*']];

  const targetPath = resolve(process.cwd(), dirName);

  if (existsSync(targetPath)) {
    console.error(`Target folder already exists, enter a new folder name`);

    process.exit(1);
    return;
  }

  mkdirSync(targetPath);

  const templatePath = resolve(__dirname, 'templates', template);

  const templateFileNames = readdirSync(templatePath).filter(
    (fileName): boolean => fileName.slice(-4) === '.txt'
  );

  templateFileNames.forEach(
    (templateFileName): void => {
      const templateFilePath = resolve(templatePath, templateFileName);
      const templateContent = readFileSync(templateFilePath).toString();

      const outFileName = templateFileName.slice(0, -4);
      const outFilePath = resolve(targetPath, outFileName);

      const outFileContent = getFilledTemplate(templateContent, replacements);

      writeFileSync(outFilePath, outFileContent);
    }
  );

  console.log(
    `Created ${dirName} folder successfully. ` + 'Change to that folder and run npm install.'
  );
}
