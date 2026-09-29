import { test } from '@stencil/playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../../utils/testConfiguration';

const componentTestPath = 'src/components/table/table/test/expandable-row/index.html';
const componentName = 'tds-table';
const testDescription = 'tds-table-expandable-row';

testConfigurations.withModeVariantsAndBrands.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);

      const tableComponent = page.getByRole('table');
      await expect(tableComponent).toHaveCount(1);
      // Wait for the component to be visible
      await tableComponent.waitFor({ state: 'visible' });
    });

    test('render expandable-row table correctly', async ({ page }) => {
      /* check of diff in component screenshot */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });
  });
});

test.describe.parallel(componentName, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);

    const tableComponent = page.getByRole('table');
    await expect(tableComponent).toHaveCount(1);
    // Wait for the component to be visible
    await tableComponent.waitFor({ state: 'visible' });
  });

  test('each row has expand button', async ({ page }) => {
    const expandButtons = page.locator(
      'tds-table-body-row-expandable button.tds-table__expand-control',
    );
    await expect(expandButtons).toHaveCount(3);
  });
});
