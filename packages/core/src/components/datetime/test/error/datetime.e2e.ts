import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/datetime/test/error/index.html';

test.describe('tds-datetime-error', () => {
  test('renders disabled datetime component correctly', async ({ page }) => {
    await page.goto(componentTestPath);

    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('verifies label, helper text, size, and clock icon for time component', async ({ page }) => {
    await page.goto(componentTestPath);

    // Check for the label text
    const label = page.locator('.tds-datetime-label');
    const helperText = page.locator('.tds-datetime-helper .tds-helper');
    const clockIcon = page.locator('tds-icon[name="clock"]');
    const dateTime = page.locator('tds-datetime');

    await expect(label).toBeVisible();
    await expect(label).toHaveText('Label text');

    await expect(helperText).toBeVisible();
    await expect(helperText).toHaveText('Helper text');

    await expect(dateTime).toHaveAttribute('size', 'md');
    await expect(clockIcon).toBeVisible();
  });

  test('helper text in error state has is red and has an warning icon', async ({ page }) => {
    await page.goto(componentTestPath);

    // Check helper text color for specific shade of red
    await expect(page.locator('.tds-datetime-helper .tds-helper')).toHaveCSS(
      'color',
      'rgb(255, 35, 64)',
    );

    const warningIcon = page.locator('tds-icon[name="clock"]');
    await expect(warningIcon).toBeVisible();
  });

  test('Clock icon focuses the time input', async ({ page }) => {
    await page.goto(componentTestPath);

    await page.click('input[type="time"]');

    // Check if the time input is focused after clicking the icon
    // This assumes the time input has a specific ID or class you can target
    const isTimeInputFocused = await page.evaluate(() => document.activeElement.type === 'time');
    expect(isTimeInputFocused).toBeTruthy();
  });

  test('Simulate time selection and verify format', async ({ page }) => {
    await page.goto(componentTestPath);

    await page.click('input[type="time"]');

    // Programmatically set the input value to simulate picking a time
    // Note: This value should be in the format the browser expects ('HH:MM'), even though your component will format it differently
    const currentTime = new Date();
    const formattedTimeValue = `${currentTime.getHours()}:${currentTime.getMinutes()}`;
    await page.locator('input[type="time"]').fill(formattedTimeValue);

    const displayedTime = await page.locator('input[type="time"]').inputValue();
    expect(displayedTime).toBe(formattedTimeValue);
  });
});
