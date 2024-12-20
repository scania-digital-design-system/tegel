import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../../utils/testConfiguration';

const componentTestPath = 'src/components/table/table/test/pagination/index.html';
const componentName = 'tds-table';
const testDescription = 'tds-table-pagination';

testConfigurations.withModeVariants.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('renders pagination table correctly', async ({ page }) => {
      const tableComponent = page.getByRole('table');
      await expect(tableComponent).toHaveCount(1);

      /* Check screenshots for diffs */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });

    test('table has a footer', async ({ page }) => {
      const tableFooter = page.locator('tds-table-footer');
      await expect(tableFooter).toHaveCount(1);
    });

    test('footer has field for number of page, value = 1', async ({ page }) => {
      const tableFooterPaginationSpinbutton = page.getByRole('spinbutton');
      await expect(tableFooterPaginationSpinbutton).toHaveCount(1);
      await expect(tableFooterPaginationSpinbutton).toBeVisible();
      await expect(tableFooterPaginationSpinbutton).toHaveValue('1');
    });

    test('footer contains text "of 4 pages"', async ({ page }) => {
      const tableFooterOfPagesText = page.getByText(/of 4 pages/);
      await expect(tableFooterOfPagesText).toHaveCount(1);
      await expect(tableFooterOfPagesText).toBeVisible();
    });

    test('Footer contains left chevron button, it is disabled', async ({ page }) => {
      const tableFooterLeftChevronButton = page.getByRole('button').first();
      await expect(tableFooterLeftChevronButton).toBeVisible();
      await expect(tableFooterLeftChevronButton).toHaveAttribute('disabled');
    });

    test('Footer contains right chevron button, it is not disabled', async ({ page }) => {
      const tableFooterRightChevronButton = page.getByRole('button').last();
      await expect(tableFooterRightChevronButton).toBeVisible();
      await expect(tableFooterRightChevronButton).not.toHaveAttribute('disabled');
    });

    test('Footer contains buttons that are clickable and change value in input', async ({
      page,
    }) => {
      const tableFooterPaginationSpinbutton = page.getByRole('spinbutton');
      await expect(tableFooterPaginationSpinbutton).toHaveValue('1');
      const tableFooterRightChevronButton = page.getByRole('button').nth(2);
      await tableFooterRightChevronButton.click();
      await expect(tableFooterPaginationSpinbutton).toHaveValue('2');
      const tableFooterLeftChevronButton = page.getByRole('button').nth(1);
      await tableFooterLeftChevronButton.click();
      await expect(tableFooterPaginationSpinbutton).toHaveValue('1');
    });

    test('Footer contains skip to last and first page buttons that are clickable', async ({
      page,
    }) => {
      const tableFooterPaginationSpinbutton = page.getByRole('spinbutton');
      await expect(tableFooterPaginationSpinbutton).toHaveValue('1');
      const tableFooterRightSkipForwardButton = page.getByRole('button').nth(3);
      await tableFooterRightSkipForwardButton.click();
      await expect(tableFooterPaginationSpinbutton).toHaveValue('4');
      const tableFooterLeftSkitBackwardsButton = page.getByRole('button').first();
      await tableFooterLeftSkitBackwardsButton.click();
      await expect(tableFooterPaginationSpinbutton).toHaveValue('1');
    });

    test('Footer contains rowsperpage dropdown and text', async ({ page }) => {
      const tableFooterOfPagesText = page.getByText(/Rows per page/);
      await expect(tableFooterOfPagesText).toHaveCount(1);
      await expect(tableFooterOfPagesText).toBeVisible();

      const dropdown = page.locator('tds-dropdown');
      await expect(dropdown).toHaveCount(1);
      await expect(dropdown).toBeVisible();
    });

    test('renders pagination dropdown list correctly', async ({ page }) => {
      const dropdown = page.locator('tds-dropdown');
      dropdown.click();

      /* Check screenshots for diffs */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });
  });
});
