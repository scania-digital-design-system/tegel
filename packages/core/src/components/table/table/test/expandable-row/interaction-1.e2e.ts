import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/table/table/test/expandable-row/index.html';

test.describe('tds-table-expandable-row-first', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('under first row opened expanded row with text "Hello world 1"', async ({ page }) => {
    const tableBodyRowFirstInput = page.getByRole('cell').nth(1);
    const tableBodyExpandableRowSlot = page.getByText(/Hello world 1/);
    await expect(tableBodyRowFirstInput).toHaveCount(1);
    await expect(tableBodyExpandableRowSlot).toHaveCount(1);
    await expect(tableBodyExpandableRowSlot).toBeHidden();

    await tableBodyRowFirstInput.click();
    await expect(tableBodyExpandableRowSlot).toBeVisible();

    /* check input screenshot diff */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0.05 });
  });
});
