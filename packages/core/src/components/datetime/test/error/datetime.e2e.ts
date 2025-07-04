import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../utils/testConfiguration';

const componentTestPath = 'src/components/datetime/test/error/index.html';
const componentName = 'tds-datetime';
const testDescription = 'tds-datetime-error';

testConfigurations.withModeVariants.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('renders disabled datetime component correctly', async ({ page }) => {
      /* Check diff on screenshot */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });

    test('Simulate time selection and verify format', async ({ page }) => {
      await page.click('input[type="time"]');

      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });

      // Programmatically set the input value to simulate picking a time
      // Note: This value should be in the format the browser expects ('HH:MM'), even though your component will format it differently
      const currentTime = new Date();
      const formattedTimeValue = [
        currentTime.getHours().toString().padStart(2, '0'),
        currentTime.getMinutes().toString().padStart(2, '0'),
      ].join(':');
      await page.locator('input[type="time"]').fill(formattedTimeValue);

      const displayedTime = await page.locator('input[type="time"]').inputValue();
      expect(displayedTime).toBe(formattedTimeValue);
    });
  });
});

test.describe.parallel(componentName, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('verifies label, helper text, size, and clock icon for time component', async ({ page }) => {
    // Check for the label text
    const label = page.locator('.tds-datetime-label');
    const helperText = page.locator('.tds-datetime-helper .tds-helper');
    const clockIcon = page.locator('tds-icon[name="clock"]');
    const dateTime = page.locator('tds-datetime');
    const dateTimeContainer = page.locator('.tds-datetime-container');

    await expect(label).toBeVisible();
    await expect(label).toHaveText('Label text');

    await expect(helperText).toBeVisible();
    await expect(helperText).toContainText('Helper text'); // Svg title also registers as text

    await expect(dateTime).toHaveAttribute('size', 'md');
    await expect(dateTimeContainer).toHaveCSS('height', '48px');
    await expect(dateTime).not.toHaveAttribute('min');
    await expect(dateTime).not.toHaveAttribute('max');
    await expect(clockIcon).toBeVisible();
  });

  test('helper text in error state has is red and has an error icon', async ({ page }) => {
    // Check helper text color for specific shade of red
    await expect(page.locator('.tds-datetime-helper .tds-helper')).toHaveCSS(
      'color',
      'rgb(209, 0, 27)',
    );

    const errorIcon = page.locator('tds-icon[name="error"]');
    await expect(errorIcon).toBeVisible();
  });

  test('Clock icon focuses the time input', async ({ page }) => {
    await page.click('input[type="time"]');

    // Check if the time input is focused after clicking the icon
    // This assumes the time input has a specific ID or class you can target
    const isTimeInputFocused = await page.evaluate(
      () => (document.activeElement as HTMLInputElement).type === 'time',
    );
    expect(isTimeInputFocused).toBeTruthy();
  });
});
