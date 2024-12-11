import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/banner/test/information/lightmode/index.html';

test.describe.parallel('tds-banner-information-lightmode', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('renders information banner correctly', async ({ page }) => {
    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('icons exists', async ({ page }) => {
    const images = page.getByRole('img');
    await expect(images).toHaveCount(2);
  });
});
