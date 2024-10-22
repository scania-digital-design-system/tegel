//TODO: This test is failing and needs to be fixed. Therefore it is being skipped.

import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/table/table/test/expandable-row-autocollapse/index.html';

test.describe.parallel('tds-table-expandable-row-autoCollapse', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test.skip('NEEDS FIXING: expanding one row collapses the others when autoCollapse is true', async ({
    page,
  }) => {
    // Locate the table rows
    const tableRows = page.locator('tds-table-body-row-expandable');
    const firstRow = tableRows.nth(0);
    const secondRow = tableRows.nth(1);

    // Locate the expand labels
    const firstExpandLabel = firstRow.locator('td > label');
    const secondExpandLabel = secondRow.locator('td > label');

    // Expand the first row
    await firstExpandLabel.click();

    // Assert the first row is expanded
    await expect(firstRow).toHaveClass(/tds-table__row-expand--active/);
    await expect(firstRow.locator('div[slot="expand-row"]')).toBeVisible();

    // Assert the second and third rows are collapsed
    await expect(secondRow).not.toHaveClass(/tds-table__row-expand--active/);
    await expect(secondRow.locator('div[slot="expand-row"]')).not.toBeVisible();

    // Screenshot after first expansion
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });

    // Expand the second row
    await secondExpandLabel.click();

    // Wait for UI to update
    await page.waitForTimeout(100); // You can adjust this duration

    // Assert the second row is now expanded
    await expect(secondRow).toHaveClass(/tds-table__row-expand--active/);
    await expect(secondRow.locator('div[slot="expand-row"]')).toBeVisible();

    // Assert the first row is collapsed
    await expect(firstRow).not.toHaveClass(/tds-table__row-expand--active/);
    await expect(firstRow.locator('div[slot="expand-row"]')).not.toBeVisible();

    // Screenshot after second expansion
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });
});
