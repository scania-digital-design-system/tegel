import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../../utils/testConfiguration';

const componentTestPath = 'src/components/table/table/test/expandable-row-expanded/index.html';
const componentName = 'tds-table';
const testDescription = 'tds-table-expandable-row-expanded';

testConfigurations.withModeVariants.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);

      const tableComponent = page.getByRole('table');
      await expect(tableComponent).toHaveCount(1);
      await tableComponent.waitFor({ state: 'visible' });
    });

    test('first row is expanded', async ({ page }) => {
      const tableBodyRowFirstInput = page.getByRole('cell').nth(1);
      const tableBodyExpandableRowSlot = page.getByText(/Hello world 1/);
      await expect(tableBodyRowFirstInput).toHaveCount(1);
      await expect(tableBodyExpandableRowSlot).toHaveCount(1);
      await expect(tableBodyExpandableRowSlot).toBeVisible();
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0.05 });
    });

    test('click on expand-input -> should become unchecked for row-id 1', async ({ page }) => {
      // Locate the expandable row with row-id="1"
      const tableRow = page.locator('tds-table-body-row-expandable[row-id="1"]');
      const expandInput = tableRow.locator('td > label > input[type="checkbox"]');
      const tableBodyExpandableRowSlot = tableRow.locator('div[slot="expand-row"]');

      // Click to collapse
      await page.evaluate(
        (checkbox) => (checkbox as HTMLElement).click(),
        await expandInput.elementHandle(),
      );
      await page.waitForChanges(); // wait for the state change

      // Check if the input is unchecked and the row is collapsed
      const isCheckedAfter = await expandInput.isChecked();
      expect(isCheckedAfter).toBe(false);
      await expect(tableBodyExpandableRowSlot).toBeHidden();
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });
  });
});

test.describe.parallel(componentName, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);

    const tableComponent = page.getByRole('table');
    await expect(tableComponent).toHaveCount(1);
    await tableComponent.waitFor({ state: 'visible' });
  });

  test('has a set rowId attribute', async ({ page }) => {
    const tableRow = page.locator('tds-table-body-row-expandable').first();
    const rowId = await tableRow.getAttribute('row-id');
    expect(rowId).toBe('1');
  });

  test('has a randomly generated rowId attribute', async ({ page }) => {
    const tableRow = page.locator('tds-table-body-row-expandable').last();
    await expect(tableRow).toHaveAttribute('row-id');
  });
});
