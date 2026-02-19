import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../../utils/testConfiguration';

const componentTestPath = 'src/components/table/table/test/colspan-rowspan/index.html';
const componentName = 'tds-table';
const testDescription = 'tds-table-colspan-rowspan';

testConfigurations.withModeVariants.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('renders table with colspan and rowspan correctly', async ({ page }) => {
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });
  });
});

test.describe.parallel(componentName, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('header cell with colSpan has colspan attribute set to 2', async ({ page }) => {
    const spanningHeaderCell = page.locator('tds-header-cell').first();
    await expect(spanningHeaderCell).toHaveAttribute('colspan', '2');
  });

  test('header cell without colSpan does not have a colspan attribute', async ({ page }) => {
    const normalHeaderCell = page.locator('tds-header-cell').last();
    await expect(normalHeaderCell).not.toHaveAttribute('colspan');
  });

  test('body cell with colSpan has colspan attribute set to 2', async ({ page }) => {
    // First body cell in the fixture has col-span="2"
    const spanningBodyCell = page.locator('tds-body-cell').first();
    await expect(spanningBodyCell).toHaveAttribute('colspan', '2');
  });

  test('body cell with rowSpan has rowspan attribute set to 2', async ({ page }) => {
    // Third body cell in the fixture (first cell of second row) has row-span="2"
    const spanningBodyCell = page.locator('tds-body-cell').nth(2);
    await expect(spanningBodyCell).toHaveAttribute('rowspan', '2');
  });

  test('body cell without colSpan or rowSpan does not have span attributes', async ({ page }) => {
    // Second body cell (C1) has no spanning
    const normalBodyCell = page.locator('tds-body-cell').nth(1);
    await expect(normalBodyCell).not.toHaveAttribute('colspan');
    await expect(normalBodyCell).not.toHaveAttribute('rowspan');
  });
});
