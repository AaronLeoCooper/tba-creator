# Create TBA Game

[![npm](https://img.shields.io/npm/v/create-tba-game.svg?style=flat-square)](https://www.npmjs.com/package/create-tba-game)
[![NPM](https://img.shields.io/npm/l/create-tba-game.svg?style=flat-square)](https://www.npmjs.com/package/create-tba-game)
[![CircleCI branch](https://img.shields.io/circleci/project/github/AaronLeoCooper/tba-creator/master.svg?style=flat-square)](https://circleci.com/gh/AaronLeoCooper/tba-creator/tree/master)

Want to write your own Text-Based Adventure Game without any programming knowledge?
This is the easiest way of getting your very own TBA Game up and running with no fuss.

This package sits in the monorepo for the [tba-creator][tbac] parent project and is the
generator tool used to quickly get a [TBA Game][tba-game] initialised and ready for story-writing.

## Usage

The easiest way of using `create-tba-game` is directly as a CLI command via NPM or Yarn:

```bash
# via NPM:
npx create-tba-game

# or via Yarn:
yarn create tba-game
```

Running this will prompt you for some basic information about what type of Text-Based
Adventure Game you want to create. After entering all of the requested information, a new
directory will be created based on the name you entered with all of the basic required
[Schema][tbac-schema] files included.

For more detailed information about setup and story authoring, check out the
[tba-creator][tbac-usage] project readme.

[tbac]: https://github.com/AaronLeoCooper/tba-creator
[tbac-usage]: https://github.com/AaronLeoCooper/tba-creator#Usage
[tbac-schema]: https://github.com/AaronLeoCooper/tba-creator#Schema
[tba-game]: https://github.com/AaronLeoCooper/tba-creator/tree/master/packages/tba-game
