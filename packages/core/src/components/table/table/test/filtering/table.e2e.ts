import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/table/table/test/filtering/index.html';

test.describe('tds-table-filtering', () => {
  test('renders filtering table correctly', async ({ page }) => {
    await page.goto(componentTestPath);
    const tableComponent = page.getByRole('table');
    await expect(tableComponent).toHaveCount(1);

    /* Check diff of screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0.05 });
  });

  test('table has header "Filter"', async ({ page }) => {
    await page.goto(componentTestPath);

    /* Search for header by text and see if it exists */
    const tdsTableToolbarCaption = page.getByText('Filter');
    await expect(tdsTableToolbarCaption).toHaveCount(1);
    await expect(tdsTableToolbarCaption).toBeVisible();
  });

  test('search button inside the header exists', async ({ page }) => {
    await page.goto(componentTestPath);
    const tdsTableToolbarSearchIcon = page.getByRole('img');
    await expect(tdsTableToolbarSearchIcon).toHaveCount(1);
    await expect(tdsTableToolbarSearchIcon).toBeVisible();
  });

  test('look for textbox and click it', async ({ page }) => {
    await page.goto(componentTestPath);
    const tdsTableToolbarSearchInput = page.getByRole('textbox');
    await tdsTableToolbarSearchInput.click();
    await expect(tdsTableToolbarSearchInput).toHaveCSS('width', '208px');

    /* Check diff of screenshot after click */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0.05 });
  });

  test('clicking on search button opens field for entering data', async ({ page }) => {
    await page.goto(componentTestPath);
    const tdsTableToolbarSearchInput = page.getByRole('textbox');
    await expect(tdsTableToolbarSearchInput).toHaveCount(1);

    /* Click on search button, make sure input expands and it is visible. 
    Input text and make sure it is filled + make sure active class is added to it. 
    We do all of this to make sure the searchbar is opened and ready to use. 
    That increses chances of getting the proper screenshot */
    await tdsTableToolbarSearchInput.click();
    await expect(tdsTableToolbarSearchInput).toHaveCSS('width', '208px');
    await expect(tdsTableToolbarSearchInput).toBeVisible();
    await tdsTableToolbarSearchInput.fill('Some test text');

    await expect(tdsTableToolbarSearchInput).toHaveValue('Some test text');
    const activeStateClasses = page.locator('tds-table .tds-table__searchbar--active');
    expect(activeStateClasses).toBeTruthy();

    /* Check diff of screenshot after filled */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0.05 });
  });
});
