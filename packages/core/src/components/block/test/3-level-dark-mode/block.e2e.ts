import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/block/test/3-level-dark-mode/index.html';

test.describe('3-level block screenshot test', () => {
  test('renders 3 level block correctly', async ({ page }) => {
    await page.goto(componentTestPath);
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });
});
