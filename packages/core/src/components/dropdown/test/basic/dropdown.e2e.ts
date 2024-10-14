import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/dropdown/test/basic/index.html';

test.describe.parallel('tds-dropdown-basic', () => {
  test('renders basic dropdown correctly', async ({ page }) => {
    await page.goto(componentTestPath);
    const dropdown = page.getByTestId('tds-dropdown-testid');
    await expect(dropdown).toHaveCount(1);

    /* check diff in screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('should find label and not exist', async ({ page }) => {
    await page.goto(componentTestPath);
    const labelText = page.getByText(/Label text/);
    await expect(labelText).toHaveCount(0);
  });

  test('find helper text and check not exist', async ({ page }) => {
    await page.goto(componentTestPath);
    const helperText = page.getByText(/Helper text/);
    await expect(helperText).toHaveCount(0);
  });

  test('have the button to be visible', async ({ page }) => {
    await page.goto(componentTestPath);
    const dropdownButton = page.getByRole('button').first();
    await expect(dropdownButton).toBeVisible();
  });

  test('clicking the dropdown button opens the dropdown-list', async ({ page }) => {
    await page.goto(componentTestPath);
    const dropdownButton = page.getByRole('button').first();
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
  test('reset() method resets the dropdown', async ({ page }) => {
    await page.goto(componentTestPath);

    const dropdown = page.getByTestId('tds-dropdown-testid');

    const dropdownButton = dropdown.getByRole('button').first();

    // Get the initial placeholder text before any selection
    const initialPlaceholderText = await dropdownButton.locator('.placeholder').innerText();

    // Open the dropdown
    await dropdownButton.click();

    // Select an option from the dropdown
    const dropdownOption = dropdown.locator('tds-dropdown-option').filter({ hasText: 'Option 1' });
    await dropdownOption.click();

    // Verify that the selected option is displayed
    const placeholder = dropdownButton.locator('.placeholder');
    await expect(placeholder).toHaveText('Option 1');

    // Call the reset() method on the dropdown component
    await page.evaluate(() => {
      const dropdownnew = document.querySelector('tds-dropdown');
      dropdownnew.reset();
    });

    // Verify that the dropdown has been reset to its initial state
    await expect(placeholder).toHaveText(initialPlaceholderText);
    await expect(dropdown).not.toHaveAttribute('value');
  });
});
