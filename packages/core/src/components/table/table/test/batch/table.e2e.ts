import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/table/table/test/batch/index.html';

test.describe.parallel('tds-table-batch', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('renders batch table correctly', async ({ page }) => {
    const tableComponent = page.getByRole('table');
    await expect(tableComponent).toHaveCount(1);

    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('table has a settings button', async ({ page }) => {
    const tdsTableToolbarSettings = page.getByRole('img');
    await expect(tdsTableToolbarSettings).toHaveCount(1);
    await expect(tdsTableToolbarSettings).toBeVisible();
  });

  test('table has a [Download] button', async ({ page }) => {
    const tdsTableToolbarDownloadButton = page.getByRole('button', { name: /Download/ });
    await expect(tdsTableToolbarDownloadButton).toHaveCount(1);
    await expect(tdsTableToolbarDownloadButton).toBeVisible();
  });
});
