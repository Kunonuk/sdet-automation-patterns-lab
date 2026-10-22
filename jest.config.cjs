/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'node',
  testMatch: ['<rootDir>/.build/unit/tests/unit/**/*.test.js'],
  transform: {},
  maxWorkers: 2,
  cacheDirectory: '<rootDir>/node_modules/.cache/jest',
  clearMocks: true,
};
