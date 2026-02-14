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
      const tableBodyRowThirdIcon = page
        .locator('tds-table-body-row-expandable')
        .nth(2)
        .locator('.tds-expendable-row-icon');

      const tableBodyRowButton = page.getByText(/Call to action/);

      await expect(tableBodyRowThirdIcon).toHaveCount(1);
      await expect(tableBodyRowButton).toHaveCount(1);
      await expect(tableBodyRowButton).toBeHidden();

      // Click on the expand icon for the third row
      await tableBodyRowThirdIcon.click();

      // Wait for the button to become visible
      await tableBodyRowButton.waitFor({ state: 'visible' });
      await expect(tableBodyRowButton).toBeVisible();

      /* check input screenshot diff */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });
  });
});
