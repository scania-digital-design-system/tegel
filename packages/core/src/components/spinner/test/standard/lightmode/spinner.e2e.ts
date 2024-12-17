import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/spinner/test/standard/lightmode/index.html';

test.describe.parallel('tds-spinner-standard-lightmode', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('renders basic spinner correctly', async ({ page }) => {
    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('Check if animation is present', async ({ page }) => {
    const spinner = page.locator('tds-spinner:first-child circle');
    const spinnerStyle = await spinner.evaluate((style) => getComputedStyle(style).animationName);
    expect(spinnerStyle).toBe('dash');
  });
});
