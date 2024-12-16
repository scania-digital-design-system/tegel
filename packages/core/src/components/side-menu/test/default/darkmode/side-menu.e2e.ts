import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/side-menu/test/default/darkmode/index.html';

test.describe.parallel('tds-side-menu-default-darkmode', () => {
  test('renders default side-menu correctly', async ({ page }) => {
    await page.goto(componentTestPath);
    const sideMenuNavigation = page.getByRole('navigation');
    await expect(sideMenuNavigation).toHaveCount(1);
    await expect(sideMenuNavigation).toBeVisible();

    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });
});
