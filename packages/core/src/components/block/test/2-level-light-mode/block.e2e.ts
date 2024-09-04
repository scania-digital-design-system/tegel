import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/block/test/2-level-light-mode/index.html';

test.describe.parallel('tds-block-2-level-light-mode', () => {
  test('renders 2 level block correctly', async ({ page }) => {
    await page.goto(componentTestPath);

    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });
});
