module.exports = {
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'ts'],
  transform: {
    '\\.ts$': 'ts-jest'
  },
  testRegex: '(src|create-tba-game)/.*\\.spec\\.ts$'
};
