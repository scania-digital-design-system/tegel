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
  test('doesnt close when item is clicked', async ({ page }) => {
    await page.goto(componentTestPath);
    const headerDropdown = page.getByTestId('header-dropdown');
    await expect(headerDropdown).toHaveCount(1);
    await headerDropdown.click();
    const headerDropdownItems = await headerDropdown.locator('tds-header-dropdown-list-item');
    await expect(headerDropdownItems.nth(0)).toContainText('First item');
    await expect(headerDropdownItems.nth(1)).toContainText('Second item');

    await expect(headerDropdownItems.first()).toBeVisible();

    await headerDropdownItems.nth(0).click();

    await expect(headerDropdownItems.first()).toBeVisible();

    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('closes when item is clicked and closeWhenClicked is set', async ({ page }) => {
    await page.goto(componentTestPath);
    const headerDropdown = page.getByTestId('header-dropdown-2');
    await expect(headerDropdown).toHaveCount(1);
    await headerDropdown.click();
    const headerDropdownListUser = await headerDropdown.getByTestId('header-dropdown-list-user');

    await expect(headerDropdownListUser).toBeVisible();

    await headerDropdownListUser.click();

    await expect(headerDropdownListUser).toBeHidden();

    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('only one dropdown can be open at a time', async ({ page }) => {
    await page.goto(componentTestPath);

    // Get the first dropdown
    const firstDropdown = page.getByTestId('header-dropdown');
    await expect(firstDropdown).toHaveCount(1);
    await firstDropdown.click();
    const firstDropdownItems = await firstDropdown.locator('tds-header-dropdown-list-item');
    await expect(firstDropdownItems.first()).toBeVisible();

    // Get the second dropdown
    const secondDropdown = page.getByTestId('header-dropdown-2');
    await expect(secondDropdown).toHaveCount(1);
    await secondDropdown.click();
    const secondDropdownItems = await secondDropdown.locator('tds-header-dropdown-list-item');
    await expect(secondDropdownItems.first()).toBeVisible();

    // Check if the first dropdown has closed
    await expect(firstDropdownItems.first()).toBeHidden();

    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });
});
