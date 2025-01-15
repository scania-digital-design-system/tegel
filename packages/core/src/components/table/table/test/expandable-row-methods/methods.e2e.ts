import { E2EPage, test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../../utils/testConfiguration';

const componentTestPath = 'src/components/table/table/test/expandable-row-methods/index.html';
const componentName = 'tds-table';
const testDescription = 'tds-table-expandable-row-methods';

const click = async (page: E2EPage, id: string) => {
  const expandButton = page.locator(id);
  await expandButton.waitFor({ state: 'visible' });
  await expandButton.click();
  await page.waitForChanges();
  await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
};

testConfigurations.withModeVariants.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);

      const tableComponent = page.getByRole('table');
      await expect(tableComponent).toHaveCount(1);
      await tableComponent.waitFor({ state: 'visible' });
    });

    // Test for clicking the expand button
    test('click expand button', async ({ page }) => {
      await click(page, '#expand-button');
    });

    // Test for clicking the collapse button
    test('click collapse button', async ({ page }) => {
      await click(page, '#collapse-button');
    });
  });
});
