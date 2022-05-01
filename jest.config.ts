/* eslint-disable @typescript-eslint/no-var-requires */
// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
const { pathsToModuleNameMapper } = require("ts-jest")
const { compilerOptions } = require("./tsconfig")
const config = {
  verbose: true,
  setupFilesAfterEnv: ["./jest-setup.ts"],
  testMatch: ["**/?(*.)+(spec).ts"],
  modulePaths: ["./"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths)
};

module.exports = config;
