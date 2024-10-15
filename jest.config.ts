import { Config } from '@jest/types';

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ["<rootDir>/src", "<rootDir>/tests"],
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    coverageDirectory: 'coverage',
    collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts'],
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.json',
        },
    },
};

export default config;

