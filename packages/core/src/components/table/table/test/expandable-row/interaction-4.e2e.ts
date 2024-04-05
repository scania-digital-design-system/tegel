import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/table/table/test/expandable-row/index.html';

test.describe('tds-table-expandable-row-double-click-first', () => {
  test('double click on expand button in first row -> expanded row should be closed', async ({
    page,
  }) => {
    await page.goto(componentTestPath);
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
