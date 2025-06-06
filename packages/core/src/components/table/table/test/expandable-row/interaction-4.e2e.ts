import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/table/table/test/expandable-row/index.html';
const testDescription = 'tds-table-expandable-row-double-click-first';

test.describe.parallel(testDescription, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
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
