import { expect, PlaywrightTestConfig } from '@playwright/test';
import { matchers } from 'stencil-playwright';

expect.extend(matchers);

const config: PlaywrightTestConfig = {
  testMatch: '*.e2e.ts',
  use: {
    baseURL: 'http://localhost:3333',
    browserName: 'chromium',
  },
  webServer: {
    command: 'serve -p 3333',
    port: 3333,
    reuseExistingServer: !process.env.CI,
  },
  workers: 8,
  reporter: 'line',
};

export default config;
