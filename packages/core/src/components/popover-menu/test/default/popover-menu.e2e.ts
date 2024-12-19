import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../utils/testConfiguration';

const componentTestPath = 'src/components/popover-menu/test/default/index.html';
const componentName = 'tds-popover-menu';
const testDescription = 'tds-popover-menu-default';

testConfigurations.basic.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('renders default popover-menu correctly', async ({ page }) => {
      const triggerButton = page.getByRole('button').filter({ has: page.getByRole('img') });
      await triggerButton.click();

      /* Check diff on screenshot */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });

    test('clicking the trigger button should open the popover menu dialog', async ({ page }) => {
      const triggerButton = page.getByRole('button').filter({ has: page.getByRole('img') });
      const dropDownList = page.getByRole('list');

      await expect(triggerButton).toBeVisible();
      await expect(dropDownList).toBeHidden();

      await triggerButton.click();

      await expect(triggerButton).toBeVisible();
      await expect(dropDownList).toBeVisible();

      const tdsMenuItemListItems = dropDownList.getByRole('listitem');
      await expect(tdsMenuItemListItems).toHaveCount(9);

      const tdsMenuItemListItemLinks = tdsMenuItemListItems.getByRole('link');
      const tdsMenuItemListItemButtons = tdsMenuItemListItems.getByRole('button');

      await expect(tdsMenuItemListItemLinks).toHaveCount(7);
      await expect(tdsMenuItemListItemButtons).toHaveCount(2);
    });

    test('hover active menu item -> active item should be clickable', async ({ page }) => {
      const triggerButton = page.getByRole('button').filter({ has: page.getByRole('img') });
      const dropDownList = page.getByRole('list');
      await triggerButton.click();

      const tdsMenuItemListItemLinks = page
        .getByRole('listitem')
        .filter({ has: page.getByRole('link') });

      const myEventSpy = await page.spyOnEvent('click');
      await tdsMenuItemListItemLinks.first().click();
      expect(myEventSpy).toHaveReceivedEvent();

      /* Expect dropdown not to close after clicking the menu item */
      await expect(dropDownList).toBeVisible();
    });

    test('hover inactive menu item -> inactive menu item should not be clickable', async ({
      page,
    }) => {
      const triggerButton = page.getByRole('button').filter({ has: page.getByRole('img') });
      await triggerButton.click();

      const tdsMenuItemListItemButtons = page
        .getByRole('listitem')
        .filter({ has: page.getByRole('button') });

      await expect(tdsMenuItemListItemButtons).toHaveCount(2);

      await expect(tdsMenuItemListItemButtons.first()).toHaveAttribute('disabled');
      await expect(tdsMenuItemListItemButtons.last()).not.toHaveAttribute('disabled');
    });

    test('icons are not existing for menu items', async ({ page }) => {
      const tdsMenuItemListItemIcons = page
        .getByRole('listitem')
        .filter({ has: page.getByRole('img') });
      await expect(tdsMenuItemListItemIcons).toHaveCount(0);
    });

    test('activating close method should close the dialog', async ({ page }) => {
      const triggerButton = page.getByRole('button').filter({ has: page.getByRole('img') });
      await triggerButton.click();

      const closeButton = page.getByTestId('menu-close-button');
      await expect(closeButton).toBeVisible();
      await closeButton.click();

      await expect(closeButton).not.toBeVisible();
    });
  });
});
