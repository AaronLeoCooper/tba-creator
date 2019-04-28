#!/usr/bin/env node

import * as inquirer from 'inquirer';
import { Question, Answers } from 'inquirer';

import create from './create';
import { CreateOptions } from './create';

const trim = (str: string): string => str.trim();

const getKebabCase = (str: string): string =>
  trim(str).replace(/ /g, '-');

const questions: Question[] = [
  {
    name: 'title',
    message: 'Enter your game title',
    type: 'input',
    validate: (value: string): string | boolean => {
      if (!trim(value)) {
        return 'A game title is required';
      }

      return true;
    }
  },
  {
    name: 'about',
    message: 'Enter a description (optional)',
    type: 'input'
  },
  {
    name: 'dirName',
    message: 'Enter a name to use for the game folder',
    type: 'input',
    default: ({ title }: Answers): string => getKebabCase(title),
    validate: (value: string): string | boolean => {
      if (!trim(value)) {
        return 'A folder name is required';
      }

      if (trim(value).includes(' ')) {
        return 'Please use a folder name without spaces';
      }

      return true;
    }
  }
];

(async function runPrompt() {
  console.log(
    'Welcome to create-tba-game. This program will ' +
    'create the basic setup required to start working ' +
    'on your very own Text-Based Adventure game!\n' +

    'You will be asked a few questions about your ' +
    'desired game.\n'
  );

  const { title, about, dirName }: Answers = await inquirer.prompt(questions);

  const options: CreateOptions = {
    title: trim(title),
    about: trim(about),
    dirName: trim(dirName),
    template: 'basic'
  };

  create(options);
})();
