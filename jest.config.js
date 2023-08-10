module.exports = {
  verbose: true,
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/*.test.js',
    '!**/*.test.tsx',
    '!**/coverage/**',
    '!**/jest.config.js',
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!(passport-azure-ad)/)'],
  projects: [
    {
      displayName: 'backend',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/__tests__/backend/**/*.test.js'],
      transformIgnorePatterns: ['node_modules/(?!passport-azure-ad)/"'],
    },
    {
      displayName: 'frontend',
      testEnvironment: 'jsdom',
      testMatch: ['<rootDir>/__tests__/frontend/**/*.test.tsx'],
      moduleFileExtensions: ['js', 'json', 'tsx', 'ts'],
      moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
          '<rootDir>/__mocks__/fileMock.js',
        '\\.(css|scss|less)$': '<rootDir>/__mocks__/styleMock.js',
      },
      modulePathIgnorePatterns: ['<rootDir>/build/'],
      setupFilesAfterEnv: ['./setupTests.js'],
    },
  ],
  coveragePathIgnorePatterns: ['<rootDir>/node_modules/'],
};
