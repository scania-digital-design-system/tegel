import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

// Defined once for reuse
const componentTestPath = 'src/components/text-field/test/disabled/index.html';
const textFieldSelector = 'tds-text-field';

test.describe.parallel('TdsTextField - default state', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the component test page before each test
    await page.goto(componentTestPath);
  });

  test('renders disabled text-field correctly', async ({ page }) => {
    const textField = page.locator(textFieldSelector);
    await expect(textField).toHaveCount(1);

    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('should have disabled attribute', async ({ page }) => {
    const textField = page.locator(textFieldSelector);
    await expect(textField).toHaveAttribute('disabled', '');
  });

  test('should not allow input', async ({ page }) => {
    // Define the selector for the text field input
    const textFieldInputSelector = 'tds-text-field input';

    // Check that the input is not editable
    const input = page.locator(textFieldInputSelector);
    await expect(input).not.toBeEditable();

    // Check if selector has "not-allowed" cursor
    await expect(page.locator(textFieldInputSelector)).toHaveCSS('cursor', 'not-allowed');
  });
});
