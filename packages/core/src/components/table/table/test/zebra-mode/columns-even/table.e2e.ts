import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/table/table/test/zebra-mode/columns-even/index.html';

test.describe.parallel('tds-table-zebra-mode-columns-even', () => {
  test('renders default table correctly', async ({ page }) => {
    await page.goto(componentTestPath);
    const tableComponent = page.getByRole('table');
    await expect(tableComponent).toHaveCount(1);

    /** Check screenshot diff */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });
});
