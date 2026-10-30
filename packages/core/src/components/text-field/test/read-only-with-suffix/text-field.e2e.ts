import { test } from '@stencil/playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../utils/testConfiguration';

const componentTestPath = 'src/components/text-field/test/read-only-with-suffix/index.html';
const testDescription = 'tds-text-field-read-only-with-suffix';
const componentName = 'tds-text-field';
const textFieldSelector = 'tds-text-field';

testConfigurations.withModeVariantsAndBrands.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('renders readonly text-field correctly', async ({ page }) => {
      const textField = page.locator(textFieldSelector);
      await expect(textField).toHaveCount(1);

      /* Check diff on screenshot */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });
  });
});

test.describe.parallel(testDescription, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('should hide the suffix icon when readOnly is true', async ({ page }) => {
    const suffixIcon = await page.locator('.text-field-slot-wrap-suffix');
    await expect(suffixIcon).toBeHidden();
  });
});
