import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../utils/testConfiguration';

const componentTestPath = 'src/components/side-menu/test/collapse-true/index.html';
const componentName = 'tds-side-menu';
const testDescription = 'tds-side-menu-collapse-true';

testConfigurations.basic.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('renders side-menu in collapsed initial state', async ({ page }) => {
      const sideMenu = page.getByLabel('Side menu');
      await expect(sideMenu).toHaveAttribute('aria-expanded', 'false');
    });

    test('click collapse button to close the menu', async ({ page }) => {
      const sideMenuCollapseButton = page
        .locator('tds-side-menu-collapse-button')
        .getByRole('button');
      await expect(sideMenuCollapseButton).toHaveCount(1);
      await expect(sideMenuCollapseButton).toBeVisible();
      await sideMenuCollapseButton.click();

      const sideMenu = page.getByLabel('Side menu');
      await expect(sideMenu).toHaveAttribute('aria-expanded', 'true');
    });
  });
});
