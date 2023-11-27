import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/table/table/test/expandable-row/index.html';

test.describe('tds-table-expandable-row', () => {
  test('render expandable-row table correctly', async ({ page }) => {
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

  test('Row should contain the correct number of rows with the correct text inside each cell', async ({
    page,
  }) => {
    await page.goto(componentTestPath);
    const tableBodyRows = page.locator('tds-table-body').locator('tds-table-body-row-expandable');
    /* Expect number of rows to be correct amount */
    await expect(tableBodyRows).toHaveCount(3);
    const promises = [];

    /* Checks all rows to see that they have the correct amount of tds-body-cells with values provided */
    for (let i = 1; i <= 12; i++) {
      const tableRow1 = tableBodyRows.locator(`tds-body-cell[cell-value="Test value ${i}"]`);
      promises.push(expect(tableRow1).toHaveCount(1));
      promises.push(expect(tableRow1).toContainText(`Test value ${i}`));
    }

    await Promise.all(promises);
  });

  test('Each row has expand button', async ({ page }) => {
    await page.goto(componentTestPath);
    const tableBodyRowsExpandInput = page
      .locator('tds-table-body')
      .locator('tds-table-body-row-expandable')
      .locator('input[class="tds-table__expand-input"]');
    await expect(tableBodyRowsExpandInput).toHaveCount(3);
  });

  test('Under first row opened expanded row with text "Hello world 1"', async ({ page }) => {
    await page.goto(componentTestPath);
    const tableBodyRowsExpandInput = page
      .locator('tds-table-body')
      .locator('tds-table-body-row-expandable')
      .locator('td[class="tds-table__cell tds-table__cell--expand"]')
      .first();
    await expect(tableBodyRowsExpandInput).toHaveCount(1);
    await tableBodyRowsExpandInput.click();
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    const tableBodyExpandableRowSlot = page
      .locator('tds-table-body')
      .locator(
        'tds-table-body-row-expandable[class="tds-table__row hydrated tds-table__row-expand--active"]',
      )
      .locator('div[slot="expand-row"]');
    await expect(tableBodyExpandableRowSlot).toContainText(/Hello world 1/);
  });

  test('Under second row opened expanded row with text "Hello to you too"', async ({ page }) => {
    await page.goto(componentTestPath);
    const tableBodyExpandableRowSlot = page
      .locator('tds-table-body')
      .locator('tds-table-body-row-expandable')
      .locator('div[slot="expand-row"]')
      .filter({ hasText: /Hello to you too/ });
    await expect(tableBodyExpandableRowSlot).toContainText(/Hello to you too/);
  });

  test('Under third row opened expanded row with a button with text "Call to action"', async ({
    page,
  }) => {
    await page.goto(componentTestPath);
    const tableBodyRowsExpandInput = page
      .locator('tds-table-body')
      .locator('tds-table-body-row-expandable')
      .locator('td[class="tds-table__cell tds-table__cell--expand"]')
      .last();
    await expect(tableBodyRowsExpandInput).toHaveCount(1);
    await tableBodyRowsExpandInput.click();
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    const tableBodyExpandableRowSlot = page
      .locator('tds-table-body')
      .locator(
        'tds-table-body-row-expandable[class="tds-table__row hydrated tds-table__row-expand--active"]',
      )
      .locator('div[slot="expand-row"]')
      .locator('button');
    await expect(tableBodyExpandableRowSlot).toContainText('Call to action');
  });

  test('Double click on expand button in first row -> expanded row should be closed', async ({
    page,
  }) => {
    await page.goto(componentTestPath);
    const tableBodyRowsExpandInput = page
      .locator('tds-table-body')
      .locator('tds-table-body-row-expandable')
      .locator('td[class="tds-table__cell tds-table__cell--expand"]')
      .first();
    await expect(tableBodyRowsExpandInput).toHaveCount(1);
    await tableBodyRowsExpandInput.dblclick();
    const tableBodyExpandableActive = page
      .locator('tds-table-body')
      .locator(
        'tds-table-body-row-expandable[class="tds-table__row hydrated tds-table__row-expand--active"]',
      );
    await expect(tableBodyExpandableActive).toHaveCount(0);
  });
});
