# TBA Game (Text-Based Adventure Game)

[![npm](https://img.shields.io/npm/v/tba-game.svg?style=flat-square)](https://www.npmjs.com/package/tba-game)
[![NPM](https://img.shields.io/npm/l/tba-game.svg?style=flat-square)](https://www.npmjs.com/package/tba-game)
[![CircleCI branch](https://img.shields.io/circleci/project/github/AaronLeoCooper/tba-creator/master.svg?style=flat-square)](https://circleci.com/gh/AaronLeoCooper/tba-creator/tree/master)

Want to write your own Text-Based Adventure Game without any programming knowledge?
This is your chance to do exactly that with **TBA Game**! 🕹🎲

This package sits in the monorepo for the [tba-creator][tbac] parent project and is automatically
installed when using the [create-tba-game][create-tba-game] CLI tool.

## Usage

By far, the easiest way of getting up and running with the latest version of TBA Game from scratch
is to use the [create-tba-game][create-tba-game] CLI tool. That will create for you a minimal set
of files to get you started.

However, if you'd prefer to go it alone and install TBA Game yourself, make sure you have all of the
[required schema files][tbac-schema] inside a directory, initialise a new NPM project and install
the TBA Game dependency:

```bash
npm init -y
npm install tba-game
```

You can then create a start script inside the `package.json` file for conveniently running your
TBA game:

```json
"scripts": {
  "start": "tbag"
}
```

And finally, start your game using: `npm start`.

## About

TBA Game is part of the [tba-creator][tbac] project and consists of a command-line entrypoint
for running a Text-Based Adventure Game authored using designated schema files.

[tbac]: https://github.com/AaronLeoCooper/tba-creator
[tbac-usage]: https://github.com/AaronLeoCooper/tba-creator#Usage
[tbac-schema]: https://github.com/AaronLeoCooper/tba-creator#Schema
[create-tba-game]: https://github.com/AaronLeoCooper/tba-creator/tree/master/packages/create-tba-game
