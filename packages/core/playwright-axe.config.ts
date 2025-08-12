import { expect } from '@playwright/test';
import type { PlaywrightTestConfig } from '@playwright/test';
import { matchers } from 'stencil-playwright';

expect.extend(matchers);

const config: PlaywrightTestConfig = {
  testMatch: '*.axe.ts',
  use: {
    baseURL: 'http://localhost:3333',
    browserName: 'chromium',
  },
  outputDir: './test-results/output',
  webServer: {
    command: 'serve -p 3333',
    port: 3333,
    reuseExistingServer: !process.env.CI,
  },
  workers: 8,
  reporter: [['list'], ['json', { outputFile: 'accessibility-results.json' }]],
};

export default config;
