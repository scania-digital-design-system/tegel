import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  testMatch: '*.e2e.ts',
  snapshotPathTemplate: '{testDir}/{arg}/test.e2e.ts-snapshots/{testName}-{platform}{ext}',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  expect: {
    toHaveScreenshot: {
      maxDiffPixels: 0,
      pathTemplate: 'tests/{arg}/screenshots/{testName}.png',
    },
  },
  reporter: [['json', { outputFile: 'results.json' }]],
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
});
