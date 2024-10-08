module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/assets/$1",
  },
  transform: {
    "^.+\\.js$": "babel-jest",
  },
};
