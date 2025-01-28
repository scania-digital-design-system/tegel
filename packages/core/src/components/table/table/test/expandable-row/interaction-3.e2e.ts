import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../../utils/testConfiguration';

const componentTestPath = 'src/components/table/table/test/expandable-row/index.html';
const componentName = 'tds-table';
const testDescription = 'tds-table-expandable-row-third';

testConfigurations.withModeVariants.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('under third row opened expanded row with a button with text "Call to action"', async ({
      page,
    }) => {
      const tableBodyRowThirdInput = page.getByRole('cell').nth(3);
      const tableBodyRowButton = page.getByText(/Call to action/);
      await expect(tableBodyRowThirdInput).toHaveCount(1);
      await expect(tableBodyRowButton).toHaveCount(1);
      await expect(tableBodyRowButton).toBeHidden();

      await tableBodyRowThirdInput.click();
      await expect(tableBodyRowButton).toBeVisible();

      /* check input screenshot diff */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0.05 });
    });
  });
});
