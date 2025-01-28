import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../../utils/testConfiguration';

const componentTestPath = 'src/components/table/table/test/expandable-row-part-selector/index.html';
const componentName = 'tds-table';
const testDescription = 'tds-table-expandable-row-part-selector';

testConfigurations.withModeVariants.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('part selector is passing on correct background color', async ({ page }) => {
      // Find the table and make sure it is visible
      const table = page.locator('tds-table');
      await table.waitFor({ state: 'visible' });

      // Find the row, make sure it is visible and has the correct background color
      const row = table.locator('tds-table-body-row-expandable:first-child tr:nth-child(1)');
      await row.waitFor({ state: 'visible' });
      await expect(row).toHaveCSS('background-color', 'rgb(250, 219, 220)');

      // Find the expandable row, make sure it is visible and has the correct background color
      const expandRow = table.locator('tds-table-body-row-expandable:first-child tr:nth-child(2)');
      await expandRow.waitFor({ state: 'visible' });
      await expect(expandRow).toHaveCSS('background-color', 'rgb(202, 235, 208)');

      // Take screenshot
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });
  });
});
