import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/dropdown/test/default/secondary/lightmode/index.html';

test.describe.parallel('tds-dropdown-default-secondary-lightmode', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('renders default dropdown correctly', async ({ page }) => {
    const dropdown = page.getByTestId('tds-dropdown-testid');
    await expect(dropdown).toHaveCount(1);

    /* check diff in screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('clicking the dropdown button opens the dropdown-list', async ({ page }) => {
    const dropdownButton = page.getByRole('button', { name: 'Placeholder' });
    const dropdownListElementOne = page
      .locator('tds-dropdown-option')
      .filter({ hasText: 'Option 1' });
    await expect(dropdownListElementOne).toBeHidden();
    await dropdownButton.click();

    /* before clicking dropdownlist should not be visible, the button should be */
    await expect(dropdownButton).toBeVisible();
    await expect(dropdownListElementOne).toBeVisible();

    /* checks diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('clicking the dropdown opens the dropdown-list, then click Option 1', async ({ page }) => {
    /* click the dropdown button */
    const dropdownButton = page.getByRole('button', { name: 'Placeholder' });
    await dropdownButton.click();

    /* Click the Option 1 button */
    const dropdownListElementOneButton = page
      .locator('tds-dropdown-option')
      .filter({ hasText: /Option 1/ })
      .getByRole('button');
    await dropdownListElementOneButton.click();

    await expect(dropdownListElementOneButton).toBeHidden();
    const dropdownButtonWithOption1 = page.getByRole('button', { name: 'Option 1' });
    await expect(dropdownButtonWithOption1.first()).toBeVisible();

    /* also check screenshot diff to make sure it says Option 1 */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('focusElement() method focus and opens the dropdown-list', async ({ page }) => {
    const dropdownButton = page.getByRole('button').first();
    const dropdownListElementOne = page
      .locator('tds-dropdown-option')
      .filter({ hasText: 'Option 1' });
    await expect(dropdownListElementOne).toBeHidden();

    await page.evaluate(() => {
      const dropdownnew = document.querySelector('tds-dropdown');
      dropdownnew.focusElement();
    });

    /* before clicking dropdownlist should not be visible, the button should be */
    await expect(dropdownButton).toBeVisible();
    await expect(dropdownListElementOne).toBeVisible();

    /* checks diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });
});
