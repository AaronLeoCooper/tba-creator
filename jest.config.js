const tsConfig = require('./tsconfig.json'); // eslint-disable-line

const { baseUrl = '', paths = [] } = tsConfig.compilerOptions;

// Map tsconfig `paths` to Jest's module names map
const moduleNameMapper = Object.keys(paths)
  .reduce((acc, pathPattern) => {
    const patternDir = pathPattern.slice(0, -2);
    const pattern = `^${patternDir}/(.*)`;

    const baseDir = baseUrl && `${baseUrl}/`;
    const dir = paths[pathPattern][0].slice(0, -2);

    return {
      ...acc,
      [pattern]: `<rootDir>/${baseDir}${dir}/$1`
    };
  }, {});

module.exports = {
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'ts'],
  transform: {
    '\\.ts$': 'ts-jest'
  },
  testRegex: '(src|create-tba-game)/.*\\.spec\\.ts$',
  moduleNameMapper
};
