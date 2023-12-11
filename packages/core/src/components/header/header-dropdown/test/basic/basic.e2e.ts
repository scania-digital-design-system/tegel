import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/header/header-dropdown/test/basic/index.html';

test.describe('tds-header-dropdown', () => {
  test('renders basic header-dropdown correctly', async ({ page }) => {
    await page.goto(componentTestPath);
    const headerDropdown = page.getByTestId('header-dropdown');
    await expect(headerDropdown).toHaveCount(1);

    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('opens when clicked', async ({ page }) => {
    await page.goto(componentTestPath);
    const headerDropdown = page.getByTestId('header-dropdown');
    await expect(headerDropdown).toHaveCount(1);
    await headerDropdown.click();
    const headerDropdownItems = await headerDropdown.locator('tds-header-dropdown-list-item');
    await expect(headerDropdownItems.nth(0)).toContainText('First item');
    await expect(headerDropdownItems.nth(1)).toContainText('Second item');

    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('closes on click outside', async ({ page }) => {
    await page.goto(componentTestPath);
    const headerDropdown = page.getByTestId('header-dropdown');
    await expect(headerDropdown).toHaveCount(1);
    await headerDropdown.click();
    const headerDropdownItems = await headerDropdown.locator('tds-header-dropdown-list-item');
    await expect(headerDropdownItems.nth(0)).toContainText('First item');
    await expect(headerDropdownItems.nth(1)).toContainText('Second item');

    await expect(headerDropdownItems.first()).toBeVisible();

    const headerTitle = page.getByTestId('header-title');
    await expect(headerTitle).toHaveCount(1);
    await headerTitle.click();

    await expect(headerDropdownItems.first()).toBeHidden();

    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  // TODO - not sure if it should close when clicked. If we make it - it could be a breaking change. Should we add
  //        eg. autoClose attribute? Or can we change it even if it could be considered breaking?
  // test('closes when item is clicked', async ({ page }) => {
  //   await page.goto(componentTestPath);
  //   const headerDropdown = page.getByTestId('header-dropdown');
  //   await expect(headerDropdown).toHaveCount(1);
  //   await headerDropdown.click();
  //   const headerDropdownItems = await headerDropdown.locator('tds-header-dropdown-list-item');
  //   await expect(headerDropdownItems.nth(0)).toContainText('First item');
  //   await expect(headerDropdownItems.nth(1)).toContainText('Second item');

  //   await expect(headerDropdownItems.first()).toBeVisible();

  //   await headerDropdownItems.nth(0).click();

  //   await expect(headerDropdownItems.first()).toBeHidden();

  //   await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  // });
});
