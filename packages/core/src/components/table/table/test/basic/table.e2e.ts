import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/table/table/test/basic/index.html';

test.describe('tds-table-basic', () => {
  test('renders basic table correctly', async ({ page }) => {
    await page.goto(componentTestPath);
    const tableComponent = page.getByRole('table');
    await expect(tableComponent).toHaveCount(1);

    /** Check screenshot diff */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('table has four columns', async ({ page }) => {
    await page.goto(componentTestPath);
    const tableHeaderCells = page.locator('tds-header-cell');
    await expect(tableHeaderCells).toHaveCount(4);
  });

  test('columns are: Truck type, Driver name, Country, Mileage', async ({ page }) => {
    await page.goto(componentTestPath);

    /* Expect each header to be visible */
    await expect(page.getByText('Truck type')).toBeVisible();
    await expect(page.getByText('Driver name')).toBeVisible();
    await expect(page.getByText('Country')).toBeVisible();
    await expect(page.getByText('Mileage')).toBeVisible();
  });

  test('Row should contain the correct number of rows with', async ({ page }) => {
    await page.goto(componentTestPath);

    /* Expect number of rows to be correct amount */
    const tableBodyRows = page.locator('tds-table-body-row');
    await expect(tableBodyRows).toHaveCount(6);
  });

  test('table the correct text inside each cell', async ({ page }) => {
    await page.goto(componentTestPath);

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
