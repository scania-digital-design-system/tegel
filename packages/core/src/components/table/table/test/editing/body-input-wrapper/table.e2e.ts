import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/table/table/test/editing/body-input-wrapper/index.html';

test.describe.parallel('tds-table-editable-cells', () => {
  test('renders table with editable cells correctly', async ({ page }) => {
    await page.goto(componentTestPath);
    const tableComponent = page.getByRole('table');
    await expect(tableComponent).toHaveCount(1);

    /* Check diff of screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0.01 });
  });
  // test('table has header "Filter"', async ({ page }) => {
  //   await page.goto(componentTestPath);

  //   /* Search for header by text and see if it exists */
  //   const tdsTableToolbarCaption = page.getByText('Filter');
  //   await expect(tdsTableToolbarCaption).toHaveCount(1);
  //   await expect(tdsTableToolbarCaption).toBeVisible();
  // });

  // test('search button inside the header exists', async ({ page }) => {
  //   await page.goto(componentTestPath);
  //   const tdsTableToolbarSearchIcon = page.getByRole('img');
  //   await expect(tdsTableToolbarSearchIcon).toHaveCount(1);
  //   await expect(tdsTableToolbarSearchIcon).toBeVisible();
  // });
});
