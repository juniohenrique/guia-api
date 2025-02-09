module.exports = {
  testEnvironment: "node", // Required for API testing
  verbose: true,
  collectCoverage: false, // API tests may not always require coverage
  reporters: [
    "default",
    ["jest-junit", { outputDirectory: "test-results", outputName: "jest-junit.xml" }]
  ],
  testResultsProcessor: "jest-junit"
};