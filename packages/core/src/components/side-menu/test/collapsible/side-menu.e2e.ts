import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/side-menu/test/collapsible/index.html';

test.describe('tds-side-menu-collapsible', () => {
  test('renders collapsible side-menu correctly', async ({ page }) => {
    await page.goto(componentTestPath);
    const sideMenuNavigation = page.getByRole('navigation');
    await expect(sideMenuNavigation).toHaveCount(1);
    await expect(sideMenuNavigation).toBeVisible();

    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('collapse button exists on the bottom of side menu', async ({ page }) => {
    await page.goto(componentTestPath);
    const sideMenuCollapseButton = page.getByRole('button').filter({ hasText: /Collapse/ });
    await expect(sideMenuCollapseButton).toHaveCount(1);
    await expect(sideMenuCollapseButton).toBeVisible();
  });

  test('click collapse button to close the menu', async ({ page }) => {
    await page.goto(componentTestPath);
    const sideMenuCollapseButton = page.getByRole('button').filter({ hasText: /Collapse/ });
    await sideMenuCollapseButton.click();
    await expect(sideMenuCollapseButton).toHaveCount(1);
    await expect(sideMenuCollapseButton).toBeVisible();

    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });
});
