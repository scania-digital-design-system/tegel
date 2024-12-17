import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/table/table/test/basic/secondary/lightmode/index.html';

test.describe.parallel('tds-table-basic-secondary-lightmode', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('renders basic table correctly', async ({ page }) => {
    const tableComponent = page.getByRole('table');
    await expect(tableComponent).toHaveCount(1);

    /** Check screenshot diff */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });
});
