import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../utils/testConfiguration';

const componentTestPath = 'src/components/checkbox/test/default/index.html';
const componentName = 'tds-checkbox';

testConfigurations.basic.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, componentName), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('renders basic checkbox correctly', async ({ page }) => {
      const labelElement = page.locator('tds-checkbox label'); // Target label underneath checkbox

      expect(labelElement).toHaveText('Label'); // Check label text
      /* Check diff on screenshot */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });

    test('Hover and click on checkbox -> should become checked', async ({ page }) => {
      const checkbox = page.locator('tds-checkbox');
      // Hover over the checkbox
      await checkbox.hover();

      // Click the checkbox
      await checkbox.click();

      // Check if the checkbox is now checked
      const isChecked = await checkbox.evaluate((element: HTMLInputElement) => element.checked);
      expect(isChecked).toBe(true);
    });
  });
});
