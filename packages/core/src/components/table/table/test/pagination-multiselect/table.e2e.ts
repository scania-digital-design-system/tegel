import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../../utils/testConfiguration';

const componentTestPath = 'src/components/table/table/test/pagination-multiselect/index.html';
const componentName = 'tds-table';
const testDescription = 'tds-table-pagination-multiselect';

testConfigurations.withModeVariants.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('renders pagination table with multiselect correctly', async ({ page }) => {
      const tableComponent = page.getByRole('table');
      await expect(tableComponent).toHaveCount(1);

      /* Check screenshots for diffs */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });
  });
});

test.describe.parallel(componentName, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('table has multiselect enabled', async ({ page }) => {
    const table = page.locator('tds-table');
    await expect(table).toHaveAttribute('multiselect');
  });

  test('table has a footer with pagination', async ({ page }) => {
    const tableFooter = page.locator('tds-table-footer');
    await expect(tableFooter).toHaveCount(1);
    await expect(tableFooter).toHaveAttribute('pagination');
  });

  test('footer cell colspan spans all columns including multiselect checkbox', async ({ page }) => {
    // Wait for component to be ready
    await page.waitForLoadState('networkidle');

    // Get the footer cell's colspan attribute
    const footerCell = page.locator('tds-table-footer').locator('td').first();

    // With 4 header cells + 1 multiselect checkbox = 5 total columns
    const colspanValue = await footerCell.evaluate((el) => el.getAttribute('colspan'));
    expect(colspanValue).toBe('5');
  });

  test('footer spans correctly when multiselect is toggled dynamically', async ({ page }) => {
    // Initial state: multiselect enabled, colspan should be 5 (4 + 1)
    let footerCell = page.locator('tds-table-footer').locator('td').first();
    let colspanValue = await footerCell.evaluate((el) => el.getAttribute('colspan'));
    expect(colspanValue).toBe('5');

    // Disable multiselect
    await page.locator('tds-table').evaluate((el: HTMLElement & { multiselect: boolean }) => {
      el.multiselect = false;
    });

    // Wait a bit for the change to propagate
    await page.waitForTimeout(100);

    // Colspan should now be 4 (only header cells)
    footerCell = page.locator('tds-table-footer').locator('td').first();
    colspanValue = await footerCell.evaluate((el) => el.getAttribute('colspan'));
    expect(colspanValue).toBe('4');

    // Re-enable multiselect
    await page.locator('tds-table').evaluate((el: HTMLElement & { multiselect: boolean }) => {
      el.multiselect = true;
    });

    // Wait a bit for the change to propagate
    await page.waitForTimeout(100);

    // Colspan should be back to 5
    footerCell = page.locator('tds-table-footer').locator('td').first();
    colspanValue = await footerCell.evaluate((el) => el.getAttribute('colspan'));
    expect(colspanValue).toBe('5');
  });

  test('footer contains pagination controls', async ({ page }) => {
    const tableFooterPaginationSpinbutton = page.getByRole('spinbutton');
    await expect(tableFooterPaginationSpinbutton).toHaveCount(1);
    await expect(tableFooterPaginationSpinbutton).toBeVisible();
    await expect(tableFooterPaginationSpinbutton).toHaveValue('1');
  });
});
