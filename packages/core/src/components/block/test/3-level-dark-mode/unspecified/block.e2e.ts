import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/block/test/3-level-dark-mode/unspecified/index.html';

test.describe.parallel('tds-block-3-level-dark-mode', () => {
  test('renders 2 level block correctly', async ({ page }) => {
    await page.goto(componentTestPath);

    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });
});
