import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../../../utils/testConfiguration';

const componentTestPath =
  'src/components/table/table/test/column-filtering/header-input-wrapper/index.html';
const componentName = 'tds-table';
const testDescription = 'tds-table-column-filtering hover';

testConfigurations.withModeVariants.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('expect wrapper to effect slotted inputs style on hover', async ({ page }) => {
      const inputfield = page.getByTestId('firstHeaderInput');

      await inputfield.hover();

      const color = await inputfield.evaluate((el) => {
        return window.getComputedStyle(el).getPropertyValue('background-color');
      });

      expect(color).toBe('rgba(0, 0, 0, 0)');

      /* Check diff of screenshot */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0.01 });
    });

    test('expect slotted input to show search icon on hover', async ({ page }) => {
      const inputfield = page.getByTestId('firstHeaderInput');

      await inputfield.hover();

      // finding wrapper component after hover over slotted input
      const icon = page.getByTestId('firstHeaderWrapper').locator('tds-icon');
      let iconClass = await icon.evaluate((element: HTMLInputElement) => element.className);

      expect(iconClass).toContain('search-icon');
    });
  });
});
