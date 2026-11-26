import { test } from '@stencil/playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../../utils/testConfiguration';

const componentTestPath = 'src/components/table/table/test/empty-state/index.html';
const componentName = 'tds-table';
const testDescription = 'tds-table-empty-state';

testConfigurations.withModeVariantsAndBrands.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('renders the no-data slot', async ({ page }) => {
      const tableBody = page.locator('tds-table-body');

      await tableBody.evaluate((element) => {
        (element as HTMLElement & { emptyState: string }).emptyState = 'no-data';
      });

      await expect(page.getByRole('heading', { name: 'No vehicles yet' })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'No data found' })).toBeHidden();

      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });

    test('renders the no-filtered-data slot', async ({ page }) => {
      const tableBody = page.locator('tds-table-body');

      await tableBody.evaluate((element) => {
        (element as HTMLElement & { emptyState: string }).emptyState = 'no-filtered-data';
      });

      await expect(page.getByRole('heading', { name: 'No data found' })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'No vehicles yet' })).toBeHidden();

      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });

    test('updates the displayed layout when emptyState changes', async ({ page }) => {
      const tableBody = page.locator('tds-table-body');
      const fleetCell = page.getByRole('cell', { name: 'R 460' });
      const noDataHeading = page.getByRole('heading', { name: 'No vehicles yet' });
      const noFilteredDataHeading = page.getByRole('heading', { name: 'No data found' });

      await expect(fleetCell).toBeVisible();
      await expect(noDataHeading).toBeHidden();
      await expect(noFilteredDataHeading).toBeHidden();

      await tableBody.evaluate((element) => {
        (element as HTMLElement & { emptyState: string }).emptyState = 'no-data';
      });

      await expect(noDataHeading).toBeVisible();
      await expect(fleetCell).toBeHidden();
      await expect(noFilteredDataHeading).toBeHidden();

      await tableBody.evaluate((element) => {
        (element as HTMLElement & { emptyState: string }).emptyState = 'no-filtered-data';
      });

      await expect(noFilteredDataHeading).toBeVisible();
      await expect(fleetCell).toBeHidden();
      await expect(noDataHeading).toBeHidden();

      await tableBody.evaluate((element) => {
        (element as HTMLElement & { emptyState: string }).emptyState = 'none';
      });

      await expect(fleetCell).toBeVisible();
      await expect(noDataHeading).toBeHidden();
      await expect(noFilteredDataHeading).toBeHidden();
    });
  });
});
