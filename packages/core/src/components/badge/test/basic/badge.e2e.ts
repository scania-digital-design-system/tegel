import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/badge/test/basic/index.html';

test.describe('tds-badge', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('renders basic badge correctly', async ({ page }) => {
    const accordion = page.locator('tds-badge');
    await expect(accordion).toHaveClass('hydrated');
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });
});
