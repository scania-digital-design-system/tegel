import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/block/test/2-level-light-mode/index.html';

test.describe('2-level block screenshot test', () => {
  test('renders 2 level block correctly', async ({ page }) => {
    await page.goto(componentTestPath); // Update with the actual path to your component
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });
});
