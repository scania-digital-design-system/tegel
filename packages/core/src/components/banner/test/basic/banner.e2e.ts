import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/banner/test/basic/index.html';

test.describe.parallel('tds-banner-basic', () => {
  test('renders basic banner correctly', async ({ page }) => {
    await page.goto(componentTestPath);

    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('the close button should be visible', async ({ page }) => {
    await page.goto(componentTestPath);

    const closeButton = page.getByRole('button');
    await expect(closeButton).toBeVisible();
  });
});
