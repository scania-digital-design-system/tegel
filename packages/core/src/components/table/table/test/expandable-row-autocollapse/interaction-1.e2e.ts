import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/table/table/test/expandable-row-autocollapse/index.html';

test.describe('tds-table-expandable-row-first', () => {
  test('when expanding first row, second row should collapse"', async ({ page }) => {
    await page.goto(componentTestPath);

    const firstInput = page.getByRole('cell').nth(1);

    const firstExpandableRow = page.getByText(/Hello world 1/);
    const secondExpandableRow = page.getByText(/Hello to you too/);

    await expect(firstInput).toHaveCount(1);

    await expect(firstExpandableRow).toHaveCount(1);
    await expect(firstExpandableRow).toHaveCount(1);

    await expect(firstExpandableRow).toBeHidden();

    await firstInput.click();
    await expect(firstExpandableRow).toBeVisible();
    await expect(secondExpandableRow).toBeHidden();

    /* check input screenshot diff */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });
});
