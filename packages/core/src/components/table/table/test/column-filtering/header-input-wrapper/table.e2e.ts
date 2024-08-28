import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath =
  'src/components/table/table/test/column-filtering/header-input-wrapper/index.html';

test.describe.parallel('tds-table-column-filtering', () => {
  test('renders table with editable header cell correctly', async ({ page }) => {
    await page.goto(componentTestPath);
    const tableComponent = page.getByRole('table');
    await expect(tableComponent).toHaveCount(1);

    /* Check diff of screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0.01 });
  });
});
