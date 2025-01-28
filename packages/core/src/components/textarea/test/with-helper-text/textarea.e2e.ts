import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../utils/testConfiguration';

const componentTestPath = 'src/components/textarea/test/with-helper-text/index.html';
const componentName = 'tds-textarea';
const testDescription = 'tds-textarea-with-helper-text';

testConfigurations.withModeVariants.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('renders textarea with helper text', async ({ page }) => {
      /* Expect no diff on screenshot */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });
  });
});
