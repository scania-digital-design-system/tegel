import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../utils/testConfiguration';

const componentTestPath = 'src/components/text-field/test/read-only-with-suffix/index.html';
const componentName = 'tds-text-field';
const testDescription = 'TdsTextField - readOnly prop effect';

testConfigurations.withModeVariants.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('should hide the suffix icon when readOnly is true', async ({ page }) => {
      const suffixIcon = await page.locator('.text-field-slot-wrap-suffix');
      await expect(suffixIcon).toBeHidden();
    });
  });
});
