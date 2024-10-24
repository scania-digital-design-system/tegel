import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/table/table/test/expandable-row-autocollapse/index.html';

test.describe('tds-table-expandable-row-first', () => {
  test('when expanding second row, first row should collapse"', async ({ page }) => {
    await page.goto(componentTestPath);

    const secondInput = page.getByRole('cell').nth(2);

    const firstExpandableRow = page.getByText(/Hello world 1/);
    const secondExpandableRow = page.getByText(/Hello to you too/);

    await expect(secondInput).toHaveCount(1);

    await expect(firstExpandableRow).toHaveCount(1);
    await expect(firstExpandableRow).toHaveCount(1);

    await expect(secondExpandableRow).toBeHidden();

    await secondInput.click();
    await expect(firstExpandableRow).toBeHidden();
    await expect(secondExpandableRow).toBeVisible();

    /* check input screenshot diff */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });
});
