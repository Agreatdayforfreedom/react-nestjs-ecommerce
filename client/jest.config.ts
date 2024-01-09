export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  transformIgnorePatterns: ['/node_modules/(?!@nanoid)/'],
  moduleNameMapper: {
    nanoid: require.resolve('nanoid'),
  },
  prettierPath: require.resolve('prettier'),
  // prettierPath: null,
};
