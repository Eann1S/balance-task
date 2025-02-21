import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: '.*\\.test\\.ts$',
  moduleFileExtensions: ['ts', 'js', 'json'],
  rootDir: '.',
  collectCoverageFrom: ['src/**/*.ts'],
  coverageDirectory: 'coverage',
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  globalSetup: "./tests/setup.ts",
  globalTeardown: "./tests/teardown.ts",
};

export default config;