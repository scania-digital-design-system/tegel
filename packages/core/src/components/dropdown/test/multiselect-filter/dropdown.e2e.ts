import { test } from '@stencil/playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../utils/testConfiguration';

const componentTestPath = 'src/components/dropdown/test/multiselect-filter/index.html';
const componentName = 'tds-dropdown';
const testDescription = 'tds-dropdown-multiselect-filter';

testConfigurations.withModeVariantsAndBrands.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('When focusing on the input it should clear itself', async ({ page }) => {
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

    test('selects all available options and clears all selections', async ({ page }) => {
      const dropdown = page.getByTestId('tds-dropdown-testid');
      const inputElement = dropdown.getByRole('textbox');
      const selectAllButton = page.getByRole('button', { name: 'Select all' });
      const clearAllButton = page.getByRole('button', { name: 'Clear all' });

      await inputElement.click();
      await selectAllButton.click();

      await expect(page.getByRole('checkbox', { name: 'Option 1' })).toBeChecked();
      await expect(page.getByRole('checkbox', { name: 'Option 2' })).not.toBeChecked();
      await expect(page.getByRole('checkbox', { name: 'Option 3' })).toBeChecked();
      await expect(page.getByRole('checkbox', { name: 'Option 4' })).toBeChecked();
      await expect(dropdown).toHaveAttribute('value', 'option-1,option-3,option-4');

      await clearAllButton.click();

      await expect(page.getByRole('checkbox', { name: 'Option 1' })).not.toBeChecked();
      await expect(page.getByRole('checkbox', { name: 'Option 3' })).not.toBeChecked();
      await expect(page.getByRole('checkbox', { name: 'Option 4' })).not.toBeChecked();
      await expect(dropdown).not.toHaveAttribute('value');
      await expect(clearAllButton).toBeDisabled();
    });

    test('selects only matching options when a filter is applied', async ({ page }) => {
      const dropdown = page.getByTestId('tds-dropdown-testid');
      const inputElement = dropdown.getByRole('textbox');
      const selectFilteredButton = page.getByRole('button', { name: 'Select filtered' });
      const clearAllButton = page.getByRole('button', { name: 'Clear all' });

      await inputElement.click();
      await inputElement.fill('Option 1');

      await expect(selectFilteredButton).toBeVisible();
      await selectFilteredButton.click();
      await inputElement.click(); // reset filter state

      await expect(page.getByRole('checkbox', { name: 'Option 1' })).toBeChecked();
      await expect(page.getByRole('checkbox', { name: 'Option 3' })).not.toBeChecked();
      await expect(page.getByRole('checkbox', { name: 'Option 4' })).not.toBeChecked();
      await expect(dropdown).toHaveAttribute('value', 'option-1');

      await clearAllButton.click();
      await expect(page.getByRole('checkbox', { name: 'Option 1' })).not.toBeChecked();
      await expect(dropdown).not.toHaveAttribute('value');
    });
  });
});
