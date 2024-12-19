import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../utils/testConfiguration';

const componentTestPath = 'src/components/popover-menu/test/show/index.html';
const componentName = 'tds-popover-menu';
const testDescription = 'tds-popover-menu-show';

testConfigurations.basic.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('renders show=true popover-menu correctly', async ({ page }) => {
      /* Check diff on screenshot */
      await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.05 });
    });

    test('clicking the trigger button should keep the popover menu dialog open when it is open by default', async ({
      page,
    }) => {
      const triggerButton = page.getByRole('button').filter({ has: page.getByRole('img') });
      const dropDownList = page.getByRole('list');

      await expect(triggerButton).toBeVisible();
      await expect(dropDownList).toBeVisible();

      await triggerButton.click();

      await expect(triggerButton).toBeVisible();
      await expect(dropDownList).toBeVisible();
    });
  });
});
