import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../../../utils/testConfiguration';

const componentTestPath = 'src/components/table/table/test/editing/body-input-wrapper/index.html';
const componentName = 'tds-table';
const testDescription = 'tds-table-editable-cells hover';

testConfigurations.withModeVariants.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('expect wrapper to effect slotted inputs style on hover', async ({ page }) => {
      const inputfield = page.getByTestId('firstInput');

      await inputfield.hover();

      // only check the color if no mode variant or mode is set:
      if (!config) {
        const color = await inputfield.evaluate((el) => {
          return window.getComputedStyle(el).getPropertyValue('background-color');
        });

        expect(color).toBe('rgba(13, 15, 19, 0.05)');
      }

      /* Check diff of screenshot */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0.01 });
    });

    test('expect slotted input to show pen icon on hover', async ({ page }) => {
      const inputfield = page.getByTestId('firstInput');

      await inputfield.hover();

      // finding wrapper component after hover over slotted input
      const icon = page.getByTestId('firstWrapper').locator('tds-icon');
      let iconClass = await icon.evaluate((element: HTMLInputElement) => element.className);

      expect(iconClass).toContain('edit-icon');
    });
  });
});
