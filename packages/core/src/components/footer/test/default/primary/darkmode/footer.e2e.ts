import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/footer/test/default/primary/darkmode/index.html';

test.describe.parallel('tds-footer-default-primary-darkmode', () => {
  test('renders default footer correctly', async ({ page }) => {
    await page.goto(componentTestPath);
    const footerComponent = page.locator('footer');
    await expect(footerComponent).toHaveCount(1);

    /** Check screenshot diff */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });
});
