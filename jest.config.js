module.exports = {
  preset: 'ts-jest',
  roots: ['<rootDir>/tests/unit/'],
  clearMocks: true,
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: ['js', 'ts', 'vue', 'tsx', 'jsx', 'json'],
  modulePaths: ['<rootDir>/src', '<rootDir>/node_modules'],
  testMatch: ['**/tests/unit/**/*.spec.[jt]s?(x)'],
  testPathIgnorePatterns: ['/node_modules/'],
  transform: {
    '^.+\\.vue$': 'vue3-jest',
    '^.+\\js$': 'babel-jest',
    '^.+\\.(t|j)sx?$': 'ts-jest',
  },
  transformIgnorePatterns: ['/node_modules/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'jsdom',
  verbose: true,
  collectCoverage: false,
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.{js,ts,vue}'],
  coveragePathIgnorePatterns: ['^.+\\.d\\.ts$'],
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
  setupFiles: ['<rootDir>/tests/unit/components/setupTests.ts'],
};
