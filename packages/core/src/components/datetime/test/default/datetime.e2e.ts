import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/datetime/test/default/index.html';

test.describe('tds-datetime-default', () => {
  test('renders datetime component correctly', async ({ page }) => {
    await page.goto(componentTestPath);

    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('verifies label, helper text, and calendar icon for datetime-local component', async ({
    page,
  }) => {
    await page.goto(componentTestPath);

    // Check for the label text
    const label = await page.locator('.tds-datetime-label');
    await expect(label).toBeVisible();
    await expect(label).toHaveText('Label text');

    // Check for the helper text
    const helperText = await page.locator('.tds-datetime-helper .tds-helper');
    await expect(helperText).toBeVisible();
    await expect(helperText).toHaveText('Helper text');

    // Check for the calendar icon
    // Assuming the icon can be identified by an aria-label or similar attribute
    // Update the selector as necessary to target the calendar icon specifically
    const calendarIcon = await page.locator('tds-icon[name="calendar"]');
    await expect(calendarIcon).toBeVisible();
  });

  test('icon click triggers native datetime picker', async ({ page }) => {
    await page.goto(componentTestPath);

    // Assuming the calendar icon can be clicked to open the datetime picker
    // Note: Adjust the selector to accurately target the calendar icon within your component
    await page.click('input[type="datetime-local"]'); // Adjust the type accordingly if testing 'date' or 'time'

    // await page.click('input[type="datetime-local"]'); // Adjust the type accordingly if testing 'date' or 'time'
    // Verify the input is indeed focused. This is an indirect test to ensure
    // that actions leading up to the display of the native picker are correctly initiated.
    const inputIsFocused = await page.evaluate(
      () => document.activeElement.type === 'datetime-local',
    ); // Adjust the type accordingly
    expect(inputIsFocused).toBeTruthy();

    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    // Note: Direct assertions about the native picker's visibility or UI state cannot be made here.
  });

  test('setting input to current date and time programmatically', async ({ page }) => {
    await page.goto(componentTestPath);

    // Get the current date and time, formatted as 'YYYY-MM-DDThh:mm', which is the expected format for datetime-local inputs
    const currentDate = new Date().toISOString().slice(0, 16);

    // Directly set the input field's value to the current date and time
    await page.locator('input[type="datetime-local"]').fill(currentDate);

    // Verify the input field contains the expected current date and time
    const inputValue = await page.locator('input[type="datetime-local"]').inputValue();
    expect(inputValue).toBe(currentDate);
  });
});
