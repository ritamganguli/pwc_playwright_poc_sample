import { defineConfig } from "@playwright/test";
import path from "path";
import { globalTeardown } from './lambdatest-setup';

export default defineConfig({
  globalSetup: require.resolve('./global-setup'), // Set up the global setup script
  globalTeardown: require.resolve('./global-setup'), // Set up the global teardown script
  projects: [
    {
      name: "chromium:lambdatest",
      use: {
        browserName: "chromium",
        viewport: { width: 1280, height: 720 },
      },
    },
    // Add other projects if needed
  ],
  testDir: path.join(__dirname, "tests"), // Adjust the path to your test directory
  timeout: 60000,
  retries: 0,
  use: {
    trace: "on",
  },
  reporter: [
    ["list"],
    ["json", { outputFile: "test-results.json" }],
    ["html", { open: "never" }],
  ],
});
