
// Importing the 'Config' type from Jest. This helps provide TypeScript type checking for our Jest configuration object.
import type { Config } from "jest";

// Importing the 'nextJest' function from the Next.js Jest integration. This function generates a Jest configuration that is optimized for Next.js applications.
import nextJest from "next/jest.js";

// Create a Jest configuration function by calling 'nextJest' and passing an object with configuration options.
const createJestConfig = nextJest({
  // Specify the directory of your Next.js application.
  // This allows nextJest to load your Next.js configuration (next.config.js) and environment variables (.env files)
  // so that your tests have the same settings as your app.
  dir: "./",
});

// Define a custom Jest configuration object using the 'Config' type for proper type safety.
const config: Config = {
  // Use the V8 engine's built-in code coverage tool to analyze test coverage.
  coverageProvider: "v8",

  // Set the testing environment to 'jsdom', which simulates a browser environment.
  // This is useful for testing components that interact with the DOM.
  testEnvironment: 'jsdom',

  // Specify directories where modules are located.
  // 'node_modules' allows Jest to find third-party packages, and '<rootDir>/' tells Jest to also look in the project root.
  // This is important when using TypeScript with a baseUrl set to the root directory for module aliasing.
  moduleDirectories: ['node_modules', '<rootDir>/'],

  // Define setup files that are executed after the test environment is set up.
  // This is typically used to configure global settings, extend Jest assertions, or set up any required testing utilities.
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  testPathIgnorePatterns: ['/node_modules/', '/playwright-tests/'],
  // Map module names to specific paths using regular expressions.
  // This configuration correctly maps:
// Any import starting with @/ to src/
// Any import starting with @lib/ to src/lib/
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@lib/(.*)$": "<rootDir>/src/lib/$1",  },

  // Define global variables that should be available in all test environments.
  // Here, the 'fetch' global is set to the same implementation as 'global.fetch' to ensure consistency in HTTP requests during tests.
  globals: {
    fetch: global.fetch,
  },
};

// Export the final Jest configuration by passing the custom config object to 'createJestConfig'.
// This function merges the custom configuration with Next.js defaults and returns the complete configuration for Jest.
export default createJestConfig(config);
