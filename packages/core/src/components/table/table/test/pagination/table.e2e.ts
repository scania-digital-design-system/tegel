import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/table/table/test/pagination/index.html';

test.describe.parallel('tds-table-pagination', () => {
  test('renders pagination table correctly', async ({ page }) => {
    await page.goto(componentTestPath);
    const tableComponent = page.getByRole('table');
    await expect(tableComponent).toHaveCount(1);

    /* Check screenshots for diffs */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('table has a footer', async ({ page }) => {
    await page.goto(componentTestPath);
    const tableFooter = page.locator('tds-table-footer');
    await expect(tableFooter).toHaveCount(1);
  });

  test('footer has field for number of page, value = 1', async ({ page }) => {
    await page.goto(componentTestPath);
    const tableFooterPaginationSpinbutton = page.getByRole('spinbutton');
    await expect(tableFooterPaginationSpinbutton).toHaveCount(1);
    await expect(tableFooterPaginationSpinbutton).toBeVisible();
    await expect(tableFooterPaginationSpinbutton).toHaveValue('1');
  });

  test('footer contains text "of 4 pages"', async ({ page }) => {
    await page.goto(componentTestPath);
    const tableFooterOfPagesText = page.getByText(/of 4 pages/);
    await expect(tableFooterOfPagesText).toHaveCount(1);
    await expect(tableFooterOfPagesText).toBeVisible();
  });

  test('Footer contains left chevron button, it is disabled', async ({ page }) => {
    await page.goto(componentTestPath);
    const tableFooterLeftChevronButton = page.getByRole('button').first();
    await expect(tableFooterLeftChevronButton).toBeVisible();
    await expect(tableFooterLeftChevronButton).toHaveAttribute('disabled');
  });

  test('Footer contains right chevron button, it is not disabled', async ({ page }) => {
    await page.goto(componentTestPath);
    const tableFooterRightChevronButton = page.getByRole('button').last();
    await expect(tableFooterRightChevronButton).toBeVisible();
    await expect(tableFooterRightChevronButton).not.toHaveAttribute('disabled');
  });

  test('footer contains buttons that are clickable and change value in input', async ({ page }) => {
    await page.goto(componentTestPath);
    const tableFooterPaginationSpinbutton = page.getByRole('spinbutton');
    await expect(tableFooterPaginationSpinbutton).toHaveValue('1');
    const tableFooterRightChevronButton = page.getByRole('button').last();
    await tableFooterRightChevronButton.click();
    await expect(tableFooterPaginationSpinbutton).toHaveValue('2');
    const tableFooterLeftChevronButton = page.getByRole('button').first();
    await tableFooterLeftChevronButton.click();
    await expect(tableFooterPaginationSpinbutton).toHaveValue('1');
  });
});
