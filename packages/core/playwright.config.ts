import { expect } from '@playwright/test';
import type { PlaywrightTestConfig } from '@playwright/test';
import { matchers } from 'stencil-playwright';

expect.extend(matchers);

const config: PlaywrightTestConfig = {
  testMatch: '*.e2e.ts',
  use: {
    baseURL: 'http://localhost:3333',
    browserName: 'chromium',
    screenshot: 'only-on-failure',
  },
  outputDir: './test-results/output',
  webServer: {
    command: 'serve -p 3333',
    port: 3333,
    reuseExistingServer: !process.env.CI,
  },
  workers: 8,
  reporter: [['json', { outputFile: 'results.json' }]],
  expect: {
    toHaveScreenshot: {
      threshold: 0.01,
    },
  },
};

export default config;
