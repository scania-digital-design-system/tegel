import { expect } from '@playwright/test';
import { test } from 'stencil-playwright';

// Defined once for reuse
const componentTestPath = 'src/components/text-field/test/focus/index.html';
const textFieldSelector = 'tds-text-field';

test.describe.parallel('TdsTextField - Focus', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the component test page before each test
    await page.goto(componentTestPath);
  });

  test('renders as expected when focused programmatically', async ({ page }) => {
    const textField = page.locator(textFieldSelector);

    // Ensure that the component is rendered and interactable
    await expect(textField).toBeVisible();

    // Trigger focus programmatically
    await textField.evaluate((element: any) => element.focusElement());

    // Wait for any visual changes due to the focus action to take effect
    await page.waitForTimeout(100);

    // Capture and compare the screenshot after the focus event has been triggered
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('allows text to be entered after focus', async ({ page }) => {
    const textField = page.locator(textFieldSelector);
    const inputField = textField.locator('input');

    // Ensure the component is visible and ready
    await expect(textField).toBeVisible();

    // Trigger focus programmatically
    await textField.evaluate((element: any) => element.focusElement());

    // Wait for any visual changes due to the focus action to take effect
    await page.waitForTimeout(100);

    // Type some text into the input field
    const textToInput = 'Test text';
    await inputField.fill(textToInput);

    // Verify the input field has the correct value after typing
    await expect(inputField).toHaveValue(textToInput);

    // Take a screenshot of the rendered text
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });
});
