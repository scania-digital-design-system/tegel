import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/badge/test/value/index.html';

test.describe('tds-badge', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('renders value badge correctly', async ({ page }) => {
    (await page.locator('tds-badge').all()).forEach(async (element) => {
      await expect(element).toHaveClass(/hydrated/);
    });

    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });
});
