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

  test('clicking the dropdown opens the dropdown-list, then start typing "iles" to only show that option in the dropdown list', async ({
    page,
  }) => {
    await page.goto(componentTestPath);

    const inputElement = page.getByRole('textbox');
    const dropdownListElementOneButton = page
      .locator('tds-dropdown-option')
      .filter({ hasText: /Option 1/ });
    const dropdownListElementTwoButton = page
      .locator('tds-dropdown-option')
      .filter({ hasText: /Option 2/ });
    const dropdownListElementThreeButton = page
      .locator('tds-dropdown-option')
      .filter({ hasText: /Option 3/ });
    const dropdownListElementFourButton = page
      .locator('tds-dropdown-option')
      .filter({ hasText: /Option 4/ });
    const dropdownListElementFiveButton = page
      .locator('tds-dropdown-option')
      .filter({ hasText: /îles Åland/ });

    /* before clicking dropdownlist should not be visible, the button should be */
    await expect(inputElement).toBeVisible();
    await expect(dropdownListElementOneButton).toBeHidden();
    await expect(dropdownListElementTwoButton).toBeHidden();
    await expect(dropdownListElementThreeButton).toBeHidden();
    await expect(dropdownListElementFourButton).toBeHidden();
    await expect(dropdownListElementFiveButton).toBeHidden();

    /* Clicking the input element should show the dropdown list and all its content */
    await inputElement.click();
    await expect(inputElement).toBeVisible();
    await expect(dropdownListElementOneButton).toBeVisible();
    await expect(dropdownListElementTwoButton).toBeVisible();
    await expect(dropdownListElementThreeButton).toBeVisible();
    await expect(dropdownListElementFourButton).toBeVisible();
    await expect(dropdownListElementFiveButton).toBeVisible();

    /* Add text and only Option 1 should be visible */
    await inputElement.fill('iles');
    await expect(inputElement).toBeVisible();
    await expect(dropdownListElementOneButton).toBeHidden();
    await expect(dropdownListElementTwoButton).toBeHidden();
    await expect(dropdownListElementThreeButton).toBeHidden();
    await expect(dropdownListElementFourButton).toBeHidden();
    await expect(dropdownListElementFiveButton).toBeVisible();

    /* Check diff on screenshot after adding text */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });
});
