import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/popover-menu/test/default/index.html';

test.describe.parallel('tds-popover-menu-default', () => {
  test('renders default popover-menu correctly', async ({ page }) => {
    await page.goto(componentTestPath);
    const triggerButton = page.getByRole('button').filter({ has: page.getByRole('img') });
    await triggerButton.click();

    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('clicking the trigger button should open the popover menu dialog', async ({ page }) => {
    await page.goto(componentTestPath);
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
    await page.goto(componentTestPath);
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
    await page.goto(componentTestPath);
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
    await page.goto(componentTestPath);
    const tdsMenuItemListItemIcons = page
      .getByRole('listitem')
      .filter({ has: page.getByRole('img') });
    await expect(tdsMenuItemListItemIcons).toHaveCount(0);
  });
});
