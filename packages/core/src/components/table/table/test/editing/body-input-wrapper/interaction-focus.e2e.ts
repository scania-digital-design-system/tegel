import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../../../utils/testConfiguration';

const componentTestPath = 'src/components/table/table/test/editing/body-input-wrapper/index.html';
const componentName = 'tds-table';
const testDescription = 'tds-table-editable-cells focus';

testConfigurations.withModeVariants.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('expect wrapper to effect slotted inputs style on focus', async ({ page }) => {
      const inputfield = page.getByTestId('firstInput');

      await inputfield.focus();

      // only check the color if no mode variant or mode is set:
      if (!config) {
        const color = await inputfield.evaluate((el) => {
          return window.getComputedStyle(el).getPropertyValue('background-color');
        });

        expect(color).toBe('rgb(255, 255, 255)'); // white
      }

      /* Check diff of screenshot */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0.01 });
    });
  });
});
