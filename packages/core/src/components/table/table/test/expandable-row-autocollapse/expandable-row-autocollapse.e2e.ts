import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/table/table/test/expandable-row-autocollapse/index.html';

test.describe.parallel('tds-table-expandable-row-autoCollapse', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
    const tableComponent = page.getByRole('table');
    await expect(tableComponent).toHaveCount(1);
    await tableComponent.waitFor({ state: 'visible' });
  });

  test('expanding one row collapses the others when autoCollapse is true', async ({ page }) => {
    // Locate the table rows
    const tableRows = page.locator('tds-table-body-row-expandable');
    const firstRow = tableRows.nth(0);
    const secondRow = tableRows.nth(1);
    const thirdRow = tableRows.nth(2);

    // Expand the first row by clicking on the label
    const firstExpandLabel = firstRow.locator('td > label');
    await firstExpandLabel.click();
    await expect(firstRow.locator('div[slot="expand-row"]')).toBeVisible();
    await expect(secondRow.locator('div[slot="expand-row"]')).toBeHidden();
    await expect(thirdRow.locator('div[slot="expand-row"]')).toBeHidden();
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });

    // Expand the second row by clicking on the label
    const secondExpandLabel = secondRow.locator('td > label');
    await secondExpandLabel.click();

    // The first row should now be collapsed
    await expect(firstRow.locator('div[slot="expand-row"]')).toBeHidden();
    // The second row should be expanded
    await expect(secondRow.locator('div[slot="expand-row"]')).toBeVisible();

    // Expand the third row by clicking on the label
    const thirdExpandLabel = thirdRow.locator('td > label');
    await thirdExpandLabel.click();

    // The second row should now be collapsed
    await expect(secondRow.locator('div[slot="expand-row"]')).toBeHidden();
    // The third row should be expanded
    await expect(thirdRow.locator('div[slot="expand-row"]')).toBeVisible();
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });
});
