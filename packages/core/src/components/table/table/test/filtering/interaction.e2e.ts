import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/table/table/test/filtering/index.html';

test.describe.parallel('tds-table-search', () => {
  test('look for textbox and click it', async ({ page }) => {
    await page.goto(componentTestPath);
    const tdsTableToolbarSearchInput = page.getByRole('textbox');
    await tdsTableToolbarSearchInput.click();
    await expect(tdsTableToolbarSearchInput).toHaveCSS('width', '208px');

    /* Check diff of screenshot after click */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0.01 });
  });

  test('clicking on search button opens field for entering data', async ({ page }) => {
    await page.goto(componentTestPath);
    const tdsTableToolbarSearchInput = page.getByRole('textbox');
    await expect(tdsTableToolbarSearchInput).toHaveCount(1);

    /* Click on search button, make sure input expands and it is visible. 
    Input text and make sure it is filled + make sure active class is added to it. 
    We do all of this to make sure the searchbar is opened and ready to use. 
    That increases chances of getting the proper screenshot */
    await tdsTableToolbarSearchInput.click();
    await expect(tdsTableToolbarSearchInput).toHaveCSS('width', '208px');
    await expect(tdsTableToolbarSearchInput).toBeVisible();
    await tdsTableToolbarSearchInput.fill('Some test text');

    await expect(tdsTableToolbarSearchInput).toHaveValue('Some test text');
    const activeStateClasses = page.locator('tds-table .tds-table__searchbar--active');
    expect(activeStateClasses).toBeTruthy();

    /* Check diff of screenshot after filled */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0.01 });
  });
});
