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
      const tableBodyRowFirstInput = page.getByRole('cell').nth(1);
      const tableBodyExpandableRowSlot = page.getByText(/Hello world 1/);
      await expect(tableBodyRowFirstInput).toHaveCount(1);
      await expect(tableBodyExpandableRowSlot).toHaveCount(1);
      await expect(tableBodyExpandableRowSlot).toBeHidden();

      await tableBodyRowFirstInput.click();
      await expect(tableBodyExpandableRowSlot).toBeVisible();

      /* check input screenshot diff */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0.05 });
    });
  });
});
