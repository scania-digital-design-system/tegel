import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

test.describe('tds-badge', () => {
  test('renders basic badge correctly', async ({ page }) => {
    await page.goto('src/components/badge/test/basic/index.html');
    const accordion = page.locator('tds-badge');
    await expect(accordion).toHaveClass('hydrated');
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });
});
