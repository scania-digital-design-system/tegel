import { test } from '@stencil/playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../utils/testConfiguration';

// Defined once for reuse
const componentTestPath = 'src/components/text-field/test/max-length/index.html';
const componentName = 'tds-text-field';
const testDescription = 'tds-text-field-with-max-length';

testConfigurations.withModeVariantsAndBrands.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('renders text-field with max length showing', async ({ page }) => {
      /* Check diff on screenshot */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });
  });
});
