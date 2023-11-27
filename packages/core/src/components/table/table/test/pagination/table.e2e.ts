import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/table/table/test/pagination/index.html';

test.describe('tds-table-pagination', () => {
  test('renders pagination table correctly', async ({ page }) => {
    await page.goto(componentTestPath);
    const tableComponent = page.locator('tds-table');
    expect(tableComponent).toBeTruthy();
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

  test('table has footer', async ({ page }) => {
    await page.goto(componentTestPath);
    const tableFooter = page.locator('tds-table-footer');
    expect(tableFooter).toBeTruthy();
  });

  test('footer has field for number of page, value = 1', async ({ page }) => {
    await page.goto(componentTestPath);
    const tableFooterWithValue = page.locator('tds-table-footer[pagination-value="1"]');
    expect(tableFooterWithValue).toBeTruthy();
  });

  /* TODO: Make sure this one works, not sure about this test */
  test.skip('footer contains text "of 4 pages"', async ({ page }) => {
    await page.goto(componentTestPath);
    const tableFooterOfPagesText = page.locator('.tds-table__footer-text').locator('span');
    await expect(tableFooterOfPagesText).toHaveText('4');
  });

  test('Footer contains left chevron button, it is disabled', async ({ page }) => {
    await page.goto(componentTestPath);
    const tableFooterLeftChevronButton = page.locator('tds-table-footer').locator('button').first();
    await expect(tableFooterLeftChevronButton).toHaveAttribute('disabled');
  });
  test('Footer contains right chevron button, it is not disabled', async ({ page }) => {
    await page.goto(componentTestPath);
    const tableFooterRightChevronButton = page.locator('tds-table-footer').locator('button').last();
    await expect(tableFooterRightChevronButton).not.toHaveAttribute('disabled');
  });

  test('footer contains buttons that are clickable and change value in input', async ({ page }) => {
    await page.goto(componentTestPath);
    const footer = page.locator('tds-table-footer');
    await expect(footer).toHaveAttribute('pagination-value', '1');
    const tableFooterRightChevronButton = page.locator('tds-table-footer').locator('button').last();
    await tableFooterRightChevronButton.click();
    await expect(footer).toHaveAttribute('pagination-value', '2');
    const tableFooterLeftChevronButton = page.locator('tds-table-footer').locator('button').first();
    await tableFooterLeftChevronButton.click();
    await expect(footer).toHaveAttribute('pagination-value', '1');
  });
});
