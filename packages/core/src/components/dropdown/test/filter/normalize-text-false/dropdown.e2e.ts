import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/dropdown/test/filter/normalize-text-false/index.html';

test.describe('tds-dropdown-filter', () => {
  test('renders filter dropdown correctly', async ({ page }) => {
    await page.goto(componentTestPath);
    const dropdown = page.getByTestId('tds-dropdown-testid');
    await expect(dropdown).toHaveCount(1);

    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('typing "iles" should not show anything in dropdown with normalize text set to false', async ({
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

    /* Add text and only Option 1 should be visible */
    await inputElement.fill('iles');
    await expect(inputElement).toBeVisible();
    await expect(dropdownListElementOneButton).toBeHidden();
    await expect(dropdownListElementTwoButton).toBeHidden();
    await expect(dropdownListElementThreeButton).toBeHidden();
    await expect(dropdownListElementFourButton).toBeHidden();
    await expect(dropdownListElementFiveButton).toBeHidden();

    const noResult = page.getByText('No result');
    await expect(noResult).toBeVisible();

    /* Check diff on screenshot after adding text */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });
});
