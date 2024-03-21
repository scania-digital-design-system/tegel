import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

// Defined once for reuse
const componentTestPath = 'src/components/text-field/test/default/index.html';
const textFieldSelector = 'tds-text-field';

test.describe('TdsTextField - default state', () => {
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

  test('should have type "text"', async ({ page }) => {
    const textField = page.locator(textFieldSelector);
    await expect(textField).toHaveAttribute('type', 'text');
  });

  test('should have size "lg"', async ({ page }) => {
    const textField = page.locator(textFieldSelector);
    await expect(textField).toHaveAttribute('size', 'lg');
  });

  test('should have correct height', async ({ page }) => {
    const height = await page.evaluate((textField) => {
      const element = document.querySelector(textField);
      return element.getBoundingClientRect().height;
    }, 'tds-text-field');
    expect(height).toBe(56);
  });

  test('should not render label in "no-label" state', async ({ page }) => {
    const textFieldLabelSelector = page.locator('tds-text-field label');
    await expect(textFieldLabelSelector).toHaveCount(0);
  });

  test('should have correct placeholder', async ({ page }) => {
    const textField = page.locator(textFieldSelector);
    await expect(textField).toHaveAttribute('placeholder', 'Placeholder');
  });

  test('should not have a prefix', async ({ page }) => {
    const prefixPresence = page.locator('tds-text-field span[slot="prefix"]');
    await expect(prefixPresence).toHaveCount(0);
  });

  test('should not have a suffix', async ({ page }) => {
    const suffixPresence = page.locator('tds-text-field span[slot="suffix"]');
    await expect(suffixPresence).toHaveCount(0);
  });

  test('should not have "no-min-width" attribute', async ({ page }) => {
    const textField = page.locator(textFieldSelector);
    await expect(textField).not.toHaveAttribute('no-min-width');
  });

  test('should have width greater than 200px', async ({ page }) => {
    const width = await page.evaluate((textField) => {
      const element = document.querySelector(textField);
      return element.getBoundingClientRect().width;
    }, 'tds-text-field');
    expect(width).toBeGreaterThan(200);
  });

  test('should not be read-only', async ({ page }) => {
    const textField = page.locator(textFieldSelector);
    await expect(textField).not.toHaveAttribute('read-only');
  });

  test('should not be disabled', async ({ page }) => {
    const textField = page.locator(textFieldSelector);
    await expect(textField).not.toHaveAttribute('disabled');
  });

  test('should handle hover, click, and input on text field', async ({ page }) => {
    // Define the selector for the text field input
    const textFieldInputSelector = 'tds-text-field input';

    // Hover over the text field
    await page.hover(textFieldInputSelector);

    // Click on the text field to activate it
    await page.click(textFieldInputSelector);

    // Type 'Test text' into the text field
    await page.fill(textFieldInputSelector, 'Test text');

    // Verify the text field contains the inputted text
    const value = await page.inputValue(textFieldInputSelector);
    expect(value).toBe('Test text');
  });
});
