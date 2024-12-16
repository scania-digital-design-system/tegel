import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/footer/test/default/primary/lightmode/index.html';

test.describe.parallel('tds-footer-default-primary-lightmode', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('renders default footer correctly', async ({ page }) => {
    const footerComponent = page.locator('footer');
    await expect(footerComponent).toHaveCount(1);

    /** Check screenshot diff */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });
});
