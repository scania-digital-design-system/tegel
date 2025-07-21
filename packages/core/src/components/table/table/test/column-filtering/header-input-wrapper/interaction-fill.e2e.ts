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
const testDescription = 'table-filtering-fill';

testConfigurations.withModeVariants.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('persist input value', async ({ page }) => {
      const inputfield = page.getByTestId('firstHeaderInput');
      await inputfield.fill('Hello World!');

      await inputfield.blur();

      let value = await inputfield.inputValue();

      expect(value).toBe('Hello World!');

      /* Check diff of screenshot */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0.01 });
    });
  });
});
