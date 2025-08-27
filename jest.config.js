const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src/modules/user/test", "<rootDir>/src/modules/task/test"],
  reporters: [
    "default",
    [
      "jest-html-reporter",
      {
        pageTitle: "Test Report",
        outputPath: `reports/test-report_${new Date()
          .toISOString()
          .slice(0, 10)}.html`,
      },
    ],
  ],
};
