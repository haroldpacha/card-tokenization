module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>'],
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@adapters/(.*)': '<rootDir>/src/adapters/$1',
    '^@config/(.*)': '<rootDir>/src/config/$1',
    '^@domain/(.*)': '<rootDir>/src/domain/$1',
    '^@entity/(.*)': '<rootDir>/src/entity/$1',
    '^@schemas/(.*)': '<rootDir>/src/schemas/$1',
    '^@shared/(.*)': '<rootDir>/src/shared/$1',
    '^@errors/(.*)': '<rootDir>/src/errors/$1',
    '^@events/(.*)': '<rootDir>/src/events/$1',
    '^@models/(.*)': '<rootDir>/src/models/$1',
    '^@dto/(.*)': '<rootDir>/src/dto/$1',
    '^@use-cases/(.*)': '<rootDir>/src/use-cases/$1',
    '^@packages/(.*)': '<rootDir>/src/shared/$1',
  },
};
