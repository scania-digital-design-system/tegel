import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../utils/testConfiguration';

const componentTestPath = 'src/components/checkbox/test/disabled/index.html';
const componentName = 'tds-checkbox';

testConfigurations.basic.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, componentName), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('Hover over checkbox and label -> cursor should become inactive', async ({ page }) => {
      // Find the checkbox and label elements
      const checkbox = page.locator('tds-checkbox');
      const input = page.locator('tds-checkbox input');
      const labelElement = page.locator('tds-checkbox label'); // Target label underneath checkbox

      expect(labelElement).toHaveText('Label'); // Check label text
      await expect(input).toBeDisabled();

      // Hover over checkbox and label
      await checkbox.hover();
      await labelElement.hover();
      const labelElementCursorStyle = await labelElement.evaluate(
        (style) => getComputedStyle(style).cursor,
      );
      const inputCursorStyle = await input.evaluate((style) => getComputedStyle(style).cursor);

      expect(labelElementCursorStyle).toBe('not-allowed');
      expect(inputCursorStyle).toBe('not-allowed');
      /* Check diff on screenshot */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });
  });
});
