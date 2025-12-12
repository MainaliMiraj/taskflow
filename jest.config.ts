import nextJest from "next/jest.js";
import type {Config} from "jest";

const createJestConfig = nextJest({
    dir: "./",
});

const config: Config = {
    testEnvironment: "jest-environment-jsdom",
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/$1",
    },
    testPathIgnorePatterns: [
        "/node_modules/",
        "/tests/"      // Ignore Playwright folder
    ]

};

export default createJestConfig(config);
