import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../../utils/testConfiguration';

const componentTestPath = 'src/components/table/table/test/expandable-row/index.html';
const componentName = 'tds-table';
const testDescription = 'tds-table-expandable-row-double-click-first';

testConfigurations.withModeVariants.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('double click on expand button in first row -> expanded row should be closed', async ({
      page,
    }) => {
      const tableBodyRowFirstInput = page.getByRole('cell').nth(1);
      await tableBodyRowFirstInput.dblclick();

      const tableBodyFirstExpandableRowSlot = page.getByText(/Hello world 1/);
      const tableBodySecondExpandableRowSlot = page.getByText(/Hello to you too/);
      const tableBodyThirdExpandableRowSlot = page.getByText(/Call to action/);

      await expect(tableBodyFirstExpandableRowSlot).toBeHidden();
      await expect(tableBodySecondExpandableRowSlot).toBeHidden();
      await expect(tableBodyThirdExpandableRowSlot).toBeHidden();
    });
  });
});
