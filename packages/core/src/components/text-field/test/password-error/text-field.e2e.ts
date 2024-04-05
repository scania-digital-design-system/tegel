import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

// Defined once for reuse
const componentTestPath = 'src/components/text-field/test/password-error/index.html';
const textFieldSelector = 'tds-text-field';

test.describe.parallel('TdsTextField - password type with error state', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the component test page before each test
    await page.goto(componentTestPath);
  });

  test('renders default text-field correctly', async ({ page }) => {
    const textField = page.locator(textFieldSelector);
    await expect(textField).toHaveCount(1);

    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('should have state "error"', async ({ page }) => {
    const textField = page.locator(textFieldSelector);
    await expect(textField).toHaveAttribute('state', 'error');
  });

  test('should have correct border-bottom-color using CSS variable', async ({ page }) => {
    const textFieldContainer = page.locator('tds-text-field .text-field-container');

    const borderBottomColor = await textFieldContainer.evaluate((element) =>
      getComputedStyle(element).getPropertyValue('border-bottom-color'),
    );

    expect(borderBottomColor).toBe('rgb(255, 35, 64)');
  });

  test('should have type "password"', async ({ page }) => {
    const textField = page.locator(textFieldSelector);
    await expect(textField).toHaveAttribute('type', 'password');
  });

  test('should have attribute set to label outside', async ({ page }) => {
    const textFieldLabelSelector = page.locator('tds-text-field');
    await expect(textFieldLabelSelector).toHaveAttribute('label-position', 'outside');
  });

  test('should render label in "outside" state', async ({ page }) => {
    const textFieldLabelSelector = page.locator('div >> text="Label"');
    await expect(textFieldLabelSelector).toHaveCount(1);
  });

  test('should handle hover, click, and input on text field', async ({ page }) => {
    // Define the selector for the text field input
    const textFieldInputSelector = 'tds-text-field input';

    // Hover over the text field
    await page.hover(textFieldInputSelector);

    // Click on the text field to activate it
    await page.click(textFieldInputSelector);

    // Type 'Test text' into the text field
    await page.fill(textFieldInputSelector, 'Test');

    // Verify the text field contains the inputted text
    const value = await page.inputValue(textFieldInputSelector);
    expect(value).toBe('Test');

    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });
});
