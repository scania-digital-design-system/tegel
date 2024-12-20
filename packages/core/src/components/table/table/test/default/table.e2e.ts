import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../../utils/testConfiguration';

const componentTestPath = 'src/components/table/table/test/default/index.html';
const componentName = 'tds-table';
const testDescription = 'tds-table-default';

testConfigurations.withModeVariants.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('renders default table correctly', async ({ page }) => {
      const tableComponent = page.getByRole('table');
      await expect(tableComponent).toHaveCount(1);

      /** Check screenshot diff */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });

    test('table has four columns', async ({ page }) => {
      const tableHeaderCells = page.locator('tds-header-cell');
      await expect(tableHeaderCells).toHaveCount(4);
    });

    test('columns are: Truck type, Driver name, Country, Mileage', async ({ page }) => {
      /* Expect each header to be visible */
      await expect(page.getByText('Truck type')).toBeVisible();
      await expect(page.getByText('Driver name')).toBeVisible();
      await expect(page.getByText('Country')).toBeVisible();
      await expect(page.getByText('Mileage')).toBeVisible();
    });

    test('Row should contain the correct number of rows with', async ({ page }) => {
      /* Expect the number of rows to be correct amount */
      const tableBodyRows = page.locator('tds-table-body-row');
      await expect(tableBodyRows).toHaveCount(6);
    });

    test('table has the correct text inside each cell', async ({ page }) => {
      /* Checks all rows to see that they have the correct amount of tds-body-cells with values provided */
      const promises = [];
      for (let i = 1; i <= 8; i++) {
        const tableBodyCellHasText = page
          .locator('tds-body-cell')
          .filter({ hasText: `Test value ${i}` });
        promises.push(expect(tableBodyCellHasText).toHaveCount(3));
        promises.push(expect(tableBodyCellHasText.first()).toBeVisible());
        promises.push(expect(tableBodyCellHasText.nth(1)).toBeVisible());
        promises.push(expect(tableBodyCellHasText.nth(2)).toBeVisible());
      }

      await Promise.all(promises);
    });
  });
});
