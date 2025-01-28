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
      const tableBodyRowSecondInput = page.getByRole('cell').nth(2);
      const tableBodyExpandableRowSlot = page.getByText(/Hello to you too/);
      await expect(tableBodyRowSecondInput).toHaveCount(1);
      await expect(tableBodyExpandableRowSlot).toHaveCount(1);
      await expect(tableBodyExpandableRowSlot).toBeHidden();

      await tableBodyRowSecondInput.click();
      await expect(tableBodyExpandableRowSlot).toBeVisible();

      /* check input screenshot diff */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0.05 });
    });
  });
});
