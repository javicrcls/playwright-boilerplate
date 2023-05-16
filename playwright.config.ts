import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';
require('dotenv').config();

const config: PlaywrightTestConfig = {
  testDir: './tests',
  timeout: 90000,
  expect: {
    timeout: 30000
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 5 : undefined,
  reporter: process.env.CI ? [["junit", {
    outputFile: "e2e-report.xml"
  }]] : [["json", {
    outputFile: "e2e-report.json"
  }], ["html", {
    open: "on-failure"
  }]],

  use: {
    headless: process.env.CI ? true : false,
    viewport: { width: 1280, height: 1024 },
    actionTimeout: 30000,
    baseURL: process.env.CI ? process.env.BASE_URL : 'https://github.com/',
    trace: process.env.CI ? "off" : "retain-on-failure",
    screenshot: process.env.CI ? "only-on-failure" : "only-on-failure",
/*     extraHTTPHeaders: {
      // We set this header per GitHub guidelines.
      'Accept': 'application/vnd.github.v3+json',
      // Add authorization token to all requests.
      // Assuming personal access token available in the environment.
      'Authorization': `token ${process.env.API_TOKEN}`,
    }, */
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chromium'],
      },
    }
  ],
  outputDir: 'test-results/',
};

export default config;
