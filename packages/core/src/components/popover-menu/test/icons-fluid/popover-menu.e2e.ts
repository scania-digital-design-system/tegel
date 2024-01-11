import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/popover-menu/test/icons-fluid/index.html';

test.describe('tds-popover-menu-icons-fluid', () => {
  test('renders icons-fluid popover-menu correctly', async ({ page }) => {
    await page.goto(componentTestPath);
    const triggerButton = page.getByRole('button').filter({ has: page.getByRole('img') });
    await triggerButton.click();

    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('menu item "The menu with adjusts to the widest word" exists', async ({ page }) => {
    await page.goto(componentTestPath);
    const tdsMenuItemListLongText = page.getByText('The menu width adjusts to the widest word');
    await expect(tdsMenuItemListLongText).toHaveCount(1);
    await expect(tdsMenuItemListLongText).toBeHidden();
  });

  test('icons are existing for menu items', async ({ page }) => {
    await page.goto(componentTestPath);
    const triggerButton = page.getByRole('button').filter({ has: page.getByRole('img') });
    await triggerButton.click();

    const tdsMenuItemListItemIcons = page
      .getByRole('listitem')
      .filter({ has: page.getByRole('img') });
    await expect(tdsMenuItemListItemIcons).toHaveCount(9);
  });
});
