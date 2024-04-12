import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

// Defined once for reuse
const componentTestPath = 'src/components/text-field/test/read-only-success/index.html';
const textFieldSelector = 'tds-text-field';

test.describe.parallel('TdsTextField - read-only success state', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the component test page before each test
    await page.goto(componentTestPath);
  });

  test('renders readonly success state of text-field correctly', async ({ page }) => {
    const textField = page.locator(textFieldSelector);
    await expect(textField).toHaveCount(1);

    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('should have state "success"', async ({ page }) => {
    const textField = page.locator(textFieldSelector);
    await expect(textField).toHaveAttribute('state', 'success');
  });

  test('should have correct border-bottom-color using CSS variable', async ({ page }) => {
    const textFieldContainer = page.locator('tds-text-field .text-field-container');

    const borderBottomColor = await textFieldContainer.evaluate((element) =>
      getComputedStyle(element).getPropertyValue('border-bottom-color'),
    );

    expect(borderBottomColor).toBe('rgb(13, 15, 19)');
  });

  test('should have read-only attribute', async ({ page }) => {
    const textField = page.locator(textFieldSelector);
    await expect(textField).toHaveAttribute('read-only');
  });

  test('should have read-only icon', async ({ page }) => {
    const textFieldIconSelector = page.locator('tds-text-field tds-icon[name="edit_inactive"]');
    await expect(textFieldIconSelector).toBeVisible();
  });

  test('should not allow input', async ({ page }) => {
    // Define the selector for the text field input
    const textFieldInputSelector = 'tds-text-field input';

    // Check that the input is not editable
    const input = page.locator(textFieldInputSelector);
    await expect(input).not.toBeEditable();

    // Check if selector has "auto" cursor
    await expect(page.locator(textFieldInputSelector)).toHaveCSS('cursor', 'auto');
  });
});
