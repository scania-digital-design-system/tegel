import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/table/table/test/expandable-row-default/index.html';

test.describe.parallel('tds-table-expandable-row-default', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
    const tableComponent = page.getByRole('table');
    await expect(tableComponent).toHaveCount(1);
    await tableComponent.waitFor({ state: 'visible' });
  });

  test('first row is expanded by default', async ({ page }) => {
    const tableBodyRowFirstInput = page.getByRole('cell').nth(1);
    const tableBodyExpandableRowSlot = page.getByText(/Hello world 1/);
    await expect(tableBodyRowFirstInput).toHaveCount(1);
    await expect(tableBodyExpandableRowSlot).toHaveCount(1);
    await expect(tableBodyExpandableRowSlot).toBeVisible();
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0.05 });
  });

  test('click on expand-input -> should become unchecked', async ({ page }) => {
    const shadowHost = await page.$('.tds-table__row');
    const expandInput = await shadowHost.$('td > label > input[type="checkbox"]');
    const tableBodyExpandableRowSlot = page.getByText(/Hello world 1/);

    const isChecked = await expandInput.evaluate((element: HTMLInputElement) => {
      element.click();
      return element.checked;
    });

    expect(isChecked).toBe(false);
    expect(tableBodyExpandableRowSlot).toBeHidden();
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0.05 });
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
