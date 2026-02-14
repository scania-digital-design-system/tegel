import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../../utils/testConfiguration';

const componentTestPath = 'src/components/table/table/test/expandable-row/index.html';
const componentName = 'tds-table';
const testDescription = 'tds-table-expandable-row-second';

testConfigurations.withModeVariants.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('under second row opened expanded row with text "Hello to you too"', async ({ page }) => {
      const tableBodyRowSecondIcon = page
        .locator('tds-table-body-row-expandable')
        .nth(1)
        .locator('.tds-expendable-row-icon');
      const tableBodyExpandableRowSlot = page
        .locator('tds-table-body-row-expandable')
        .nth(1)
        .locator('div[slot="expand-row"]');
      await expect(tableBodyRowSecondIcon).toHaveCount(1);
      await expect(tableBodyExpandableRowSlot).toHaveCount(1);
      await expect(tableBodyExpandableRowSlot).toBeHidden();

      await tableBodyRowSecondIcon.click();
      await expect(tableBodyExpandableRowSlot).toBeVisible();

      /* check input screenshot diff */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });
  });
});
