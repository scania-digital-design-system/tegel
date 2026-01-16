import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../../utils/testConfiguration';

const componentTestPath = 'src/components/table/table/test/expandable-row/index.html';
const componentName = 'tds-table';
const testDescription = 'tds-table-expandable-row-first';

testConfigurations.withModeVariants.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('under first row opened expanded row with text "Hello world 1"', async ({ page }) => {
      const tableBodyRowFirstIcon = page
        .locator('tds-table-body-row-expandable')
        .first()
        .locator('.tds-expendable-row-icon');
      const tableBodyExpandableRowSlot = page
        .locator('tds-table-body-row-expandable')
        .first()
        .locator('div[slot="expand-row"]');
      await expect(tableBodyRowFirstIcon).toHaveCount(1);
      await expect(tableBodyExpandableRowSlot).toHaveCount(1);
      await expect(tableBodyExpandableRowSlot).toBeHidden();

      await tableBodyRowFirstIcon.click();
      await expect(tableBodyExpandableRowSlot).toBeVisible();

      /* check input screenshot diff */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });
  });
});
