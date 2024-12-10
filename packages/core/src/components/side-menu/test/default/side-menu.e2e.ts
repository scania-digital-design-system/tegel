import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/side-menu/test/default/index.html';

test.describe.parallel('tds-side-menu-default', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('renders default side-menu correctly', async ({ page }) => {
    const sideMenuNavigation = page.getByRole('navigation');
    await expect(sideMenuNavigation).toHaveCount(1);
    await expect(sideMenuNavigation).toBeVisible();

    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('all side menu buttons to be visible', async ({ page }) => {
    const sideMenuButtons = page.getByRole('button');
    await expect(sideMenuButtons).toHaveCount(4);
    const promises = [];

    for (let i = 0; i < 4; i++) {
      promises.push(expect(sideMenuButtons.nth(i)).toBeVisible());
    }

    await Promise.all(promises);
  });

  test('wheel type list is open by default and under Wheel types there are two sublink', async ({
    page,
  }) => {
    /* Make sure first list item is there and visible */
    const sideMenuWheelTypeListItemOne = page
      .getByRole('listitem')
      .getByRole('link', { name: /Hub-centric wheel/ });
    await expect(sideMenuWheelTypeListItemOne).toHaveCount(1);
    await expect(sideMenuWheelTypeListItemOne).toBeVisible();

    /* Make sure the second list item is there and visible */
    const sideMenuWheelTypeListItemTwo = page
      .getByRole('listitem')
      .getByRole('link', { name: /Rim wheel/ });
    await expect(sideMenuWheelTypeListItemTwo).toHaveCount(1);
    await expect(sideMenuWheelTypeListItemTwo).toBeVisible();
  });
});
