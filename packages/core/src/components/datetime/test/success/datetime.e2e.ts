import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../utils/testConfiguration';

const componentTestPath = 'src/components/datetime/test/success/index.html';
const componentName = 'tds-datetime';
const testDescription = 'tds-datetime-success';

testConfigurations.withModeVariants.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('renders success datetime component correctly', async ({ page }) => {
      /* Check diff on screenshot */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });

    test('component should have size "md"', async ({ page }) => {
      const dateTime = page.locator('tds-datetime');
      const dateTimeContainer = page.locator('.tds-datetime-container');

      // Check for the label text
      const label = page.locator('.tds-datetime-label');
      await expect(label).toBeVisible();
      await expect(label).toHaveText('Label text');

      // Check for the helper text
      const helperText = page.locator('.tds-datetime-helper .tds-helper');
      await expect(helperText).toBeVisible();
      await expect(helperText).toHaveText('Helper text');

      // For example, checking for the "state" attribute to be "success"
      await expect(dateTime).toHaveAttribute('state', 'success');
      await expect(dateTimeContainer).toHaveCSS('height', '48px');
      await expect(dateTime).toHaveAttribute('size', 'md');
      await expect(dateTime).not.toHaveAttribute('min');
      await expect(dateTime).not.toHaveAttribute('max');
    });
  });
});
