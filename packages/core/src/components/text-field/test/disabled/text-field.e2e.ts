import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../utils/testConfiguration';

// Defined once for reuse
const componentTestPath = 'src/components/text-field/test/disabled/index.html';
const componentName = 'tds-text-field';
const testDescription = 'TdsTextField - default state';

const textFieldSelector = 'tds-text-field';

testConfigurations.withModeVariants.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
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
});
