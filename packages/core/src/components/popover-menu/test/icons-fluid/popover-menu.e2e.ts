import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../utils/testConfiguration';

const componentTestPath = 'src/components/popover-menu/test/icons-fluid/index.html';
const componentName = 'tds-popover-menu';
const testDescription = 'tds-popover-menu-icons-fluid';

testConfigurations.basic.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('renders icons-fluid popover-menu correctly', async ({ page }) => {
      const triggerButton = page.getByRole('button').filter({ has: page.getByRole('img') });
      await triggerButton.click();

      /* Check diff on screenshot */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });
  });
});

test.describe.parallel(componentName, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('menu item "The menu with adjusts to the widest word" exists', async ({ page }) => {
    const tdsMenuItemListLongText = page.getByText('The menu width adjusts to the widest word');
    await expect(tdsMenuItemListLongText).toHaveCount(1);
    await expect(tdsMenuItemListLongText).toBeHidden();
  });

  test('icons are existing for menu items', async ({ page }) => {
    const triggerButton = page.getByRole('button').filter({ has: page.getByRole('img') });
    await triggerButton.click();

    const tdsMenuItemListItemIcons = page
      .getByRole('listitem')
      .filter({ has: page.getByRole('img') });
    await expect(tdsMenuItemListItemIcons).toHaveCount(9);
  });
});
