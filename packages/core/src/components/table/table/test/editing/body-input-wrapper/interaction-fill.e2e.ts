import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../../../utils/testConfiguration';

const componentTestPath = 'src/components/table/table/test/editing/body-input-wrapper/index.html';
const componentName = 'tds-table';
const testDescription = 'tds-table-editable-cells fill';

testConfigurations.withModeVariants.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('expect slotted inputs to persist inputed value', async ({ page }) => {
      const inputfield = page.getByTestId('firstInput');
      await inputfield.fill('Hello World!');

      await inputfield.blur();

      let value = await inputfield.inputValue();

      expect(value).toBe('Hello World!');

      /* Check diff of screenshot */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0.01 });
    });
  });
});
