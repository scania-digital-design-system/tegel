import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/datetime/test/default/index.html';

test.describe('tds-datetime-default', () => {
  test('renders datetime component correctly', async ({ page }) => {
    await page.goto(componentTestPath);

    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('verifies label, helper text, size, and calendar icon for datetime-local component', async ({
    page,
  }) => {
    await page.goto(componentTestPath);

    // Check for the label text
    const label = page.locator('.tds-datetime-label');
    const dateTime = page.locator('tds-datetime');
    const helperText = page.locator('.tds-datetime-helper .tds-helper');
    const calendarIcon = page.locator('tds-icon[name="calendar"]');

    await expect(dateTime).toHaveAttribute('size', 'lg');
    await expect(label).toBeVisible();
    await expect(label).toHaveText('Label text');
    await expect(helperText).toBeVisible();
    await expect(helperText).toHaveText('Helper text');

    await expect(calendarIcon).toBeVisible();
  });

  test('icon click triggers native datetime picker', async ({ page }) => {
    await page.goto(componentTestPath);

    // Assuming the calendar icon can be clicked to open the datetime picker
    await page.click('input[type="datetime-local"]');

    // Verify the input is indeed focused. This is an indirect test to ensure
    // that actions leading up to the display of the native picker are correctly initiated.
    const inputIsFocused = await page.evaluate(
      () => document.activeElement.type === 'datetime-local',
    );
    expect(inputIsFocused).toBeTruthy();

    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
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
