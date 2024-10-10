import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/dropdown/test/multiselect-filter/index.html';

test.describe.parallel('tds-dropdown-multiselect-filter', () => {
  test('When focusing on the input it should clear itself', async ({ page }) => {
    await page.goto(componentTestPath);

    // Click the dropdown button
    const dropdownButton = page.locator('tds-icon[aria-label="Open/Close dropdown"]');
    await dropdownButton.click();

    // Get the input element
    const dropdownListElementOneButton = page
      .getByText(/Option 1/)
      .filter({ has: page.getByRole('checkbox') });

    // Check if the first option is present
    await expect(dropdownListElementOneButton).toHaveCount(1);

    // Click the first option
    await dropdownListElementOneButton.click();

    // Closing dropdown options
    await dropdownButton.click();
    // Opening dropdown options to autofocus the input
    await dropdownButton.click();

    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });
});
