import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../../utils/testConfiguration';

const componentTestPath = 'src/components/table/table/test/filtering/index.html';
const componentName = 'tds-table';
const testDescription = 'tds-table-filtering';

testConfigurations.withModeVariants.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('renders filtering table correctly', async ({ page }) => {
      const tableComponent = page.getByRole('table');
      await expect(tableComponent).toHaveCount(1);

      /* Check diff of screenshot */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0.01 });
    });
  });
});

test.describe.parallel(componentName, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('table has header "Filter"', async ({ page }) => {
    /* Search for header by text and see if it exists */
    const tdsTableToolbarCaption = page.getByText('Filter');
    await expect(tdsTableToolbarCaption).toHaveCount(1);
    await expect(tdsTableToolbarCaption).toBeVisible();
  });

  test('search button inside the header exists', async ({ page }) => {
    const tdsTableToolbarSearchIcon = page.getByRole('img');
    await expect(tdsTableToolbarSearchIcon).toHaveCount(1);
    await expect(tdsTableToolbarSearchIcon).toBeVisible();
  });
});
