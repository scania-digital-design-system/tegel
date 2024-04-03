import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/table/table/test/expandable-row/index.html';

test.describe.parallel('tds-table-expandable-row', () => {
  // Inject beforeEach hook here
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
    const tableComponent = page.getByRole('table');
    await expect(tableComponent).toHaveCount(1);
    // Wait for the component to be visible
    await tableComponent.waitFor({ state: 'visible' });
  });

  test('render expandable-row table correctly', async ({ page }) => {
    /* check of diff in component screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0.05 });
  });

  test('each row has expand checkbox', async ({ page }) => {
    const tableBodyRowsExpandInput = page.getByRole('cell').getByRole('checkbox');
    await expect(tableBodyRowsExpandInput).toHaveCount(3);
  });
});
