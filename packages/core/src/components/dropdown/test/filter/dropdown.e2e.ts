import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/dropdown/test/filter/index.html';

test.describe.parallel('tds-dropdown-filter', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('renders filter dropdown correctly', async ({ page }) => {
    const dropdown = page.getByTestId('tds-dropdown-testid');
    await expect(dropdown).toHaveCount(1);

    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('clicking the dropdown opens the dropdown-list, then start typing "iles" to only show that option in the dropdown list', async ({
    page,
  }) => {
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

    /* Add text "iles" and only Option 1 should be visible */
    await inputElement.fill('iles');
    await expect(inputElement).toBeVisible();
    await expect(dropdownListElementOneButton).toBeHidden();
    await expect(dropdownListElementTwoButton).toBeHidden();
    await expect(dropdownListElementThreeButton).toBeHidden();
    await expect(dropdownListElementFourButton).toBeHidden();
    await expect(dropdownListElementFiveButton).toBeVisible();

    await dropdownListElementFiveButton.click();

    await expect(inputElement).toHaveValue('îles Åland');

    /* Erase some letters from the input */
    await inputElement.press('Backspace');

    await dropdownListElementFiveButton.click();
    await expect(inputElement).toHaveValue('îles Åland');

    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('reset button icon appears when typing in the filter input', async ({ page }) => {
    const inputElement = page.getByRole('textbox');
    const resetButton = page.locator('tds-icon[name="cross"]');

    // Ensure the reset button is initially not visible
    expect(resetButton).toBeHidden();

    // Focus on the input element and start typing
    await inputElement.click();
    await inputElement.fill('iles'); // Type something to trigger filter functionality
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });

    // Verify that the reset button is now visible
    await expect(resetButton).toBeVisible();

    // Optionally, click the reset button and assert the input is cleared and the reset button hides again
    await resetButton.click();
    await expect(inputElement).toHaveValue(''); // Ensure input is cleared
    await expect(resetButton).toBeHidden(); // Reset button should hide again after clearing the input
  });

  test('toggle dropdown visibility and select option two', async ({ page }) => {
    const inputElement = page.getByRole('textbox');
    const dropdownListElementTwoButton = page
      .locator('tds-dropdown-option')
      .filter({ hasText: /Option 2/ });

    const dropdownButton = page.locator('tds-icon[aria-label="Open/Close dropdown"]');

    // Focus on the input element and start typing
    await expect(dropdownListElementTwoButton).toBeHidden();
    await inputElement.click();
    await expect(inputElement).toBeVisible();

    // Click the dropdown button to open the dropdown list
    await dropdownListElementTwoButton.click();
    await inputElement.click();
    // Click the dropdown button to close the dropdown list
    await dropdownButton.click();
    // Click the dropdown button to open the dropdown list
    await dropdownButton.click();

    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });
});
