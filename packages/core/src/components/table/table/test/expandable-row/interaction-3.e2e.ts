import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/table/table/test/expandable-row/index.html';

test.describe('tds-table-expandable-row-third', () => {
  test('under third row opened expanded row with a button with text "Call to action"', async ({
    page,
  }) => {
    await page.goto(componentTestPath);
    const tableBodyRowThirdInput = page.getByRole('cell').nth(3);
    const tableBodyRowButton = page.getByText(/Call to action/);
    await expect(tableBodyRowThirdInput).toHaveCount(1);
    await expect(tableBodyRowButton).toHaveCount(1);
    await expect(tableBodyRowButton).toBeHidden();

    await tableBodyRowThirdInput.click();
    await expect(tableBodyRowButton).toBeVisible();

    /* check input screenshot diff */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0.05 });
  });
});
