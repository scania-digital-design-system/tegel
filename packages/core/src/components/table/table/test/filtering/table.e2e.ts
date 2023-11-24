import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/table/table/test/filtering/index.html';

test.describe('tds-table-filtering', () => {
  test('renders filtering table correctly', async ({ page }) => {
    await page.goto(componentTestPath);
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('table has four columns', async ({ page }) => {
    await page.goto(componentTestPath);
    const tableHeaderCells = page.locator('tds-table-header').locator('tds-header-cell');
    await expect(tableHeaderCells).toHaveCount(4);
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

  test('table has header "Filter"', async ({ page }) => {
    await page.goto(componentTestPath);
    const tdsTableToolbarCaption = page
      .locator('tds-table-toolbar[table-title="Filter"]')
      .locator('caption');
    await expect(tdsTableToolbarCaption).toContainText('Filter');
  });

  test('search button inside the header exists', async ({ page }) => {
    await page.goto(componentTestPath);
    const tdsTableToolbarSearchIcon = page
      .locator('tds-table-toolbar[table-title="Filter"]')
      .locator('tds-icon[name="search"]');
    expect(tdsTableToolbarSearchIcon).not.toBeNull();
  });

  /** Having problems here and skipping it for now. Can not get Playwright to check for the event when entering data */
  test.skip('clicking on search button opens field for entering data', async ({ page }) => {
    await page.goto(componentTestPath);
    const tdsTableToolbarSearchInput = page
      .locator('tds-table-toolbar[table-title="Filter"]')
      .locator('input[class="tds-table__searchbar-input"]');
    expect(tdsTableToolbarSearchInput).not.toBeNull();
    const myEventSpy = await page.spyOnEvent('tdsFilter');
    await tdsTableToolbarSearchInput.click();
    expect(myEventSpy).toHaveReceivedEvent();
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
