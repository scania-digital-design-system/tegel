import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../utils/testConfiguration';

const componentTestPath = 'src/components/side-menu/test/collapsible/index.html';
const componentName = 'tds-side-menu';
const testDescription = 'tds-side-menu-collapsible';

testConfigurations.basic.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('renders collapsible side-menu correctly', async ({ page }) => {
      const sideMenuNavigation = page.getByRole('navigation');
      await expect(sideMenuNavigation).toHaveCount(1);
      await expect(sideMenuNavigation).toBeVisible();

      /* Check diff on screenshot */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });

    test('collapse button exists on the bottom of side menu', async ({ page }) => {
      const sideMenuCollapseButton = page.getByRole('button').filter({ hasText: /Collapse/ });
      await expect(sideMenuCollapseButton).toHaveCount(1);
      await expect(sideMenuCollapseButton).toBeVisible();
    });

    test('click collapse button to close the menu', async ({ page }) => {
      const sideMenuCollapseButton = page.getByRole('button').filter({ hasText: /Collapse/ });
      await sideMenuCollapseButton.click();
      await expect(sideMenuCollapseButton).toHaveCount(1);
      await expect(sideMenuCollapseButton).toBeVisible();

      /* Check diff on screenshot */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });
  });
});
