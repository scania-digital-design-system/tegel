import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../../../utils/testConfiguration';

const componentTestPath = 'src/components/table/table/test/multiselect/default/index.html';
const componentName = 'tds-table';
const testDescription = 'tds-table-multiselect';

testConfigurations.withModeVariants.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('renders multiselect table correctly', async ({ page }) => {
      const tableComponent = page.getByRole('table');
      await expect(tableComponent).toHaveCount(1);

      /* Check diff on screenshot for component */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });

    test('can check every checkbox in the table', async ({ page }) => {
      // Target the checkbox cells specifically
      const tableCheckboxCells = page.locator('tds-table-body-row .tds-table__body-cell--checkbox');
      await expect(tableCheckboxCells).toHaveCount(4);

      // Also get the header checkbox cell
      const headerCheckboxCell = page.locator('tds-table-header .tds-table__header-cell--checkbox');
      await expect(headerCheckboxCell).toHaveCount(1);

      const myEventSpyAll = await page.spyOnEvent('tdsSelectAll');
      const myEventSpy = await page.spyOnEvent('tdsSelect');

      /* Click each one */
      await headerCheckboxCell.click(); // This should trigger tdsSelectAll
      await tableCheckboxCells.first().click();
      await tableCheckboxCells.nth(1).click();
      await tableCheckboxCells.nth(2).click();
      await tableCheckboxCells.last().click();

      /* check so correct events have been called */
      expect(myEventSpyAll).toHaveReceivedEventTimes(1);
      expect(myEventSpy).toHaveReceivedEventTimes(4);

      /* Check diff on screenshot for component */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });
  });
});

test.describe.parallel(componentName, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('table header contains checkbox', async ({ page }) => {
    const tableHeaderCheckbox = page.getByRole('checkbox').first();
    await expect(tableHeaderCheckbox).toHaveCount(1);
    await expect(tableHeaderCheckbox).toBeVisible();
  });

  test('row should contain the correct number of checkboxes in each row', async ({ page }) => {
    const tableBodyRowCheckboxes = page.getByRole('checkbox');
    await expect(tableBodyRowCheckboxes).toHaveCount(5);

    /* Check if each checkbox is visible */
    const promises = [];
    for (let i = 0; i < 5; i++) {
      promises.push(expect(tableBodyRowCheckboxes.nth(i)).toBeVisible());
    }
    await Promise.all(promises);
  });
});
