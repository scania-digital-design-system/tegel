import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/banner/test/basic/index.html';

test.describe.parallel('tds-banner-basic', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('renders basic banner correctly', async ({ page }) => {
    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('the close button should be visible', async ({ page }) => {
    const closeButton = page.getByRole('button');
    await expect(closeButton).toBeVisible();
  });
});
