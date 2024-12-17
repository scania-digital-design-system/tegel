import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/slider/test/default/darkmode/index.html';

test.describe.parallel('tds-slider-default-darkmode', () => {
  test('renders default slider correctly', async ({ page }) => {
    await page.goto(componentTestPath);
    const slider = page.locator('tds-slider');
    await expect(slider).toHaveCount(1);

    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });
});
