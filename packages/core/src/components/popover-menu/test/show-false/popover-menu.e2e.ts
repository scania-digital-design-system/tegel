import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../utils/testConfiguration';

const componentTestPath = 'src/components/popover-menu/test/show-false/index.html';
const componentName = 'tds-popover-menu';
const testDescription = 'tds-popover-menu-show-false';

testConfigurations.basic.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('renders show=false popover-menu correctly', async ({ page }) => {
      /* Check diff on screenshot */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });
  });
});

test.describe.parallel(componentName, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('clicking the trigger button should not open the popover menu dialog when show is false', async ({
    page,
  }) => {
    const triggerButton = page.getByRole('button').filter({ has: page.getByRole('img') });
    const dropDownList = page.getByRole('list');

    await expect(triggerButton).toBeVisible();
    await expect(dropDownList).toBeHidden();

    await triggerButton.click();

    await expect(triggerButton).toBeVisible();
    await expect(dropDownList).toBeHidden();
  });
});
