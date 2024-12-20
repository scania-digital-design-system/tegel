import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../../utils/testConfiguration';

const componentTestPath = 'src/components/table/table/test/expandable-row/index.html';
const componentName = 'tds-table';
const testDescription = 'tds-table-expandable-row';

testConfigurations.withModeVariants.forEach((config) => {
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
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0.05 });
    });

    test('each row has expand checkbox', async ({ page }) => {
      const tableBodyRowsExpandInput = page.getByRole('cell').getByRole('checkbox');
      await expect(tableBodyRowsExpandInput).toHaveCount(3);
    });
  });
});
