import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../../../utils/testConfiguration';

const componentTestPath = 'src/components/table/table/test/editing/body-input-wrapper/index.html';
const componentName = 'tds-table';
const testDescription = 'tds-table-editable-cells';

testConfigurations.withModeVariants.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('renders table with editable cells correctly', async ({ page }) => {
      const tableComponent = page.getByRole('table');
      await expect(tableComponent).toHaveCount(1);

      /* Check diff of screenshot */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0.01 });
    });
  });
});
