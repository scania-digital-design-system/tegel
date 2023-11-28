import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/dropdown/test/filter/index.html';

test.describe('tds-dropdown-filter', () => {
  test('renders filter dropdown correctly', async ({ page }) => {
    await page.goto(componentTestPath);
    const dropdown = page.getByTestId('tds-dropdown-testid');
    await expect(dropdown).toHaveCount(1);

    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('clicking the dropdown opens the dropdown-list, then start typing "Option 1" to only show that option in the dropdown list', async ({
    page,
  }) => {
    await page.goto(componentTestPath);

    const inputElement = page.getByRole('textbox');
    const dropdownOptionOne = page.getByTestId(/tds-dropdown-option-1/);
    const dropdownOptionTwo = page.getByTestId(/tds-dropdown-option-2/);
    const dropdownOptionThree = page.getByTestId(/tds-dropdown-option-3/);
    const dropdownOptionFour = page.getByTestId(/tds-dropdown-option-4/);

    /* before clicking dropdownlist should not be visible, the button should be */
    await expect(inputElement).toBeVisible();
    await expect(dropdownOptionOne).not.toBeVisible();
    await expect(dropdownOptionTwo).not.toBeVisible();
    await expect(dropdownOptionThree).not.toBeVisible();
    await expect(dropdownOptionFour).not.toBeVisible();

    /* Clicking the input element should show the dropdown list and all its content */
    await inputElement.click();
    await expect(inputElement).toBeVisible();
    await expect(dropdownOptionOne).toBeVisible();
    await expect(dropdownOptionTwo).toBeVisible();
    await expect(dropdownOptionThree).toBeVisible();
    await expect(dropdownOptionFour).toBeVisible();

    /* Add text and only Option 1 should be visible */
    await inputElement.fill('Option 1');
    await expect(inputElement).toBeVisible();
    await expect(dropdownOptionOne).toBeVisible();
    await expect(dropdownOptionTwo).not.toBeVisible();
    await expect(dropdownOptionThree).not.toBeVisible();
    await expect(dropdownOptionFour).not.toBeVisible();

    /* Check diff on screenshot after adding text */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });
});
