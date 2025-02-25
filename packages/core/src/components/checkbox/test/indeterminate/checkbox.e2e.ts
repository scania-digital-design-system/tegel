import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../utils/testConfiguration';

const componentTestPath = 'src/components/checkbox/test/indeterminate/index.html';
const componentName = 'tds-checkbox';

testConfigurations.basic.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, componentName), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('Checkbox indeterminate state', async ({ page }) => {
      // Find the checkbox and label elements
      const checkbox = page.locator('tds-checkbox');
      const labelElement = page.locator('tds-checkbox label'); // Target label underneath checkbox

      // Hover over checkbox and label
      await checkbox.hover();
      await labelElement.hover();

      const indeterminateValue = await checkbox.getAttribute('indeterminate');

      expect(labelElement).toHaveText('Label'); // Check label text
      expect(indeterminateValue).not.toBeNull();

      /* Check diff on screenshot */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });
  });
});
