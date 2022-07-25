module.exports = {
  displayName: {
    name: 'FASTIFY',
    color: 'green',
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['tests'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
};
