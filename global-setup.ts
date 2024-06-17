// global-setup.ts
import { FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
    const args = process.argv;
    const testNameArgIndex = args.indexOf('-g');
    const testName = testNameArgIndex !== -1 ? args[testNameArgIndex + 1] : 'Playwright Test';
    process.env.TEST_NAME = testName;
}

export default globalSetup;
