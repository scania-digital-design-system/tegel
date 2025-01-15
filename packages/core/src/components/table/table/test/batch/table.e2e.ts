import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../../utils/testConfiguration';

const componentTestPath = 'src/components/table/table/test/batch/index.html';
const componentName = 'tds-table';
const testDescription = 'tds-table-batch';

testConfigurations.withModeVariants.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('renders batch table correctly', async ({ page }) => {
      const tableComponent = page.getByRole('table');
      await expect(tableComponent).toHaveCount(1);

      /* Check diff on screenshot */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });
  });
});

test.describe.parallel(componentName, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
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
