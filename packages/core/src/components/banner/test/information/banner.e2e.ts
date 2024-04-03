import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/banner/test/information/index.html';

test.describe.parallel('tds-banner-information', () => {
  test('renders information banner correctly', async ({ page }) => {
    await page.goto(componentTestPath);

    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('icons exists', async ({ page }) => {
    await page.goto(componentTestPath);

    const images = page.getByRole('img');
    await expect(images).toHaveCount(2);
  });
});
