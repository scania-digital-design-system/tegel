import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../utils/testConfiguration';

const componentTestPath = 'src/components/datetime/test/default/index.html';
const componentName = 'tds-datetime';
const testDescription = 'tds-datetime-default';

testConfigurations.withModeVariants.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('renders datetime component correctly', async ({ page }) => {
      /* Check diff on screenshot */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });

    test('verifies label, helper text, size, and calendar icon for datetime-local component', async ({
      page,
    }) => {
      // Check for the label text
      const label = page.locator('.tds-datetime-label');
      const dateTime = page.locator('tds-datetime');
      const dateTimeContainer = page.locator('.tds-datetime-container');
      const helperText = page.locator('.tds-datetime-helper .tds-helper');
      const calendarIcon = page.locator('tds-icon[name="calendar"]');

      await expect(dateTime).toHaveAttribute('size', 'lg');
      await expect(dateTimeContainer).toHaveCSS('height', '56px');
      await expect(dateTime).not.toHaveAttribute('min');
      await expect(dateTime).not.toHaveAttribute('max');
      await expect(label).toBeVisible();
      await expect(label).toHaveText('Label text');
      await expect(helperText).toBeVisible();
      await expect(helperText).toHaveText('Helper text');

      await expect(calendarIcon).toBeVisible();
    });

    test('icon click triggers native datetime picker', async ({ page }) => {
      // Assuming the calendar icon can be clicked to open the datetime picker
      await page.click('input[type="datetime-local"]');

      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });

      // Verify the input is indeed focused. This is an indirect test to ensure
      // that actions leading up to the display of the native picker are correctly initiated.
      const inputIsFocused = await page.evaluate(
        () => (document.activeElement as HTMLInputElement).type === 'datetime-local',
      );
      expect(inputIsFocused).toBeTruthy();
    });

    test('setting input to current date and time programmatically', async ({ page }) => {
      // Get the current date and time, formatted as 'YYYY-MM-DDThh:mm', which is the expected format for datetime-local inputs
      const currentDate = new Date().toISOString().slice(0, 16);

      // Directly set the input field's value to the current date and time
      await page.locator('input[type="datetime-local"]').fill(currentDate);

      // Verify the input field contains the expected current date and time
      const inputValue = await page.locator('input[type="datetime-local"]').inputValue();
      expect(inputValue).toBe(currentDate);
    });
  });
});
