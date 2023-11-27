import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/table/table/test/multiselect/index.html';

test.describe('tds-table-multiselect', () => {
  test('renders multiselect table correctly', async ({ page }) => {
    await page.goto(componentTestPath);
    const tableComponent = page.locator('tds-table');
    await expect(tableComponent).toHaveCount(1);
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('table has four columns', async ({ page }) => {
    await page.goto(componentTestPath);
    const tableHeaderCells = page.locator('tds-table-header').locator('tds-header-cell');
    await expect(tableHeaderCells).toHaveCount(4);
  });

  test('columns are: Truck type, Driver name, Country, Mileage', async ({ page }) => {
    await page.goto(componentTestPath);
    const tdsTableHeader = page.locator('tds-table-header');
    /* Expect each header to have the correct cell-value */
    const tableHeaderCellTruckType = tdsTableHeader.locator(
      'tds-header-cell[cell-value="Truck type"]',
    );
    await expect(tableHeaderCellTruckType).toHaveCount(1);
    await expect(tableHeaderCellTruckType).toHaveAttribute('cell-value', 'Truck type');
    const tableHeaderCellDriverName = tdsTableHeader.locator(
      'tds-header-cell[cell-value="Driver name"]',
    );
    await expect(tableHeaderCellDriverName).toHaveCount(1);
    await expect(tableHeaderCellDriverName).toHaveAttribute('cell-value', 'Driver name');
    const tableHeaderCellCountry = tdsTableHeader.locator('tds-header-cell[cell-value="Country"]');
    await expect(tableHeaderCellCountry).toHaveCount(1);
    await expect(tableHeaderCellCountry).toHaveAttribute('cell-value', 'Country');
    const tableHeaderCellMilage = tdsTableHeader.locator('tds-header-cell[cell-value="Mileage"]');
    await expect(tableHeaderCellMilage).toHaveCount(1);
    await expect(tableHeaderCellMilage).toHaveAttribute('cell-value', 'Mileage');
  });

  test('Table header contains checkbox', async ({ page }) => {
    await page.goto(componentTestPath);
    const tableHeaderCheckbox = page.locator('tds-table-header').locator('tds-checkbox');
    await expect(tableHeaderCheckbox).toHaveCount(1);
  });

  test('Row should contain the correct number of rows', async ({ page }) => {
    await page.goto(componentTestPath);
    const tableBodyRows = page.locator('tds-table-body').locator('tds-table-body-row');
    /* Expect number of rows to be correct amount */
    await expect(tableBodyRows).toHaveCount(4);
  });

  test('Row should contain the correct number of checkboxes in each row', async ({ page }) => {
    await page.goto(componentTestPath);
    const tableBodyRowCheckboxes = page
      .locator('tds-table-body')
      .locator('tds-table-body-row')
      .locator('tds-checkbox');
    await expect(tableBodyRowCheckboxes).toHaveCount(4);
  });
});
