import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/table/table/test/sorting/index.html';

test.describe('tds-table-sorting', () => {
  test('renders sorting table correctly', async ({ page }) => {
    await page.goto(componentTestPath);
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('table has four columns', async ({ page }) => {
    await page.goto(componentTestPath);
    const tableHeaderCells = page.locator('tds-table-header').locator('tds-header-cell');
    await expect(tableHeaderCells).toHaveCount(4);
  });

  test('table has header "Sorting"', async ({ page }) => {
    await page.goto(componentTestPath);
    const tdsTableToolbarCaption = page
      .locator('tds-table-toolbar[table-title="Sorting"]')
      .locator('caption');
    await expect(tdsTableToolbarCaption).toContainText('Sorting');
  });

  test('column header is clickable', async ({ page }) => {
    await page.goto(componentTestPath);
    const tdsTableHeader = page.locator('tds-table-header');
    const myEventSpy = await page.spyOnEvent('tdsSort');

    const tableHeaderCellTruckType = tdsTableHeader.locator(
      'tds-header-cell[cell-value="Truck type"]',
    );
    await tableHeaderCellTruckType.click();
    expect(myEventSpy).toHaveReceivedEventTimes(1);
    const tableHeaderCellDriverName = tdsTableHeader.locator(
      'tds-header-cell[cell-value="Driver name"]',
    );
    await tableHeaderCellDriverName.click();
    expect(myEventSpy).toHaveReceivedEventTimes(2);
    const tableHeaderCellCountry = tdsTableHeader.locator('tds-header-cell[cell-value="Country"]');
    await tableHeaderCellCountry.click();
    expect(myEventSpy).toHaveReceivedEventTimes(3);
    const tableHeaderCellMilage = tdsTableHeader.locator('tds-header-cell[cell-value="Mileage"]');
    await tableHeaderCellMilage.click();
    expect(myEventSpy).toHaveReceivedEventTimes(4);
  });

  test('Columns are: Truck type, Driver name, Country, Mileage', async ({ page }) => {
    await page.goto(componentTestPath);
    const tdsTableHeader = page.locator('tds-table-header');
    /* Expect each header to have the correct cell-value */
    const tableHeaderCellTruckType = tdsTableHeader.locator(
      'tds-header-cell[cell-value="Truck type"]',
    );
    await expect(tableHeaderCellTruckType).toHaveAttribute('cell-value', 'Truck type');
    const tableHeaderCellDriverName = tdsTableHeader.locator(
      'tds-header-cell[cell-value="Driver name"]',
    );
    await expect(tableHeaderCellDriverName).toHaveAttribute('cell-value', 'Driver name');
    const tableHeaderCellCountry = tdsTableHeader.locator('tds-header-cell[cell-value="Country"]');
    await expect(tableHeaderCellCountry).toHaveAttribute('cell-value', 'Country');
    const tableHeaderCellMilage = tdsTableHeader.locator('tds-header-cell[cell-value="Mileage"]');
    await expect(tableHeaderCellMilage).toHaveAttribute('cell-value', 'Mileage');
  });

  test('Row should contain the correct number of rows with the correct text inside each cell', async ({
    page,
  }) => {
    await page.goto(componentTestPath);
    const tableBodyRows = page.locator('tds-table-body').locator('tds-table-body-row');
    /* Expect number of rows to be correct amount */
    await expect(tableBodyRows).toHaveCount(6);
    const promises = [];

    /* Checks all rows to see that they have the correct amount of tds-body-cells with values provided */
    for (let i = 1; i <= 8; i++) {
      const tableRow1 = tableBodyRows.locator(`tds-body-cell[cell-value="Test value ${i}"]`);
      promises.push(expect(tableRow1).toHaveCount(3));
      promises.push(expect(tableRow1.first()).toContainText(`Test value ${i}`));
      promises.push(expect(tableRow1.last()).toContainText(`Test value ${i}`));
    }

    await Promise.all(promises);
  });
});
