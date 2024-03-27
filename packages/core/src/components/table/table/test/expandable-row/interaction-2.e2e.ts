import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/table/table/test/expandable-row/index.html';

test.describe('tds-table-expandable-row-second', () => {
  test('under second row opened expanded row with text "Hello to you too"', async ({ page }) => {
    await page.goto(componentTestPath);
    const tableBodyRowSecondInput = page.getByRole('cell').nth(2);
    const tableBodyExpandableRowSlot = page.getByText(/Hello to you too/);
    await expect(tableBodyRowSecondInput).toHaveCount(1);
    await expect(tableBodyExpandableRowSlot).toHaveCount(1);
    await expect(tableBodyExpandableRowSlot).toBeHidden();

    await tableBodyRowSecondInput.click();
    await expect(tableBodyExpandableRowSlot).toBeVisible();

    /* check input screenshot diff */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0.05 });
  });
});
