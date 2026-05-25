import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/block/test/3-level-dark-mode/index.html';
const brands = ['scania', 'traton'];

brands.forEach((brand) => {
  test.describe.parallel(`tds-block-3-level-darkmode-${brand}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(componentTestPath);
      await page.evaluate((b) => {
        document.documentElement.classList.add(b);
      }, brand);
    });

    test('renders 3 level block correctly', async ({ page }) => {
      const block = page.locator('tds-block').first();
      await expect(block).toHaveClass(/hydrated/);
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });
  });
});
