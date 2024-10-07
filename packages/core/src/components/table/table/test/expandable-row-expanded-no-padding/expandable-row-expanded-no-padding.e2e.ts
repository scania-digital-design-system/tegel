import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath =
  'src/components/table/table/test/expandable-row-expanded-no-padding/index.html';

test.describe.parallel('tds-table-expandable-row-expanded-no-padding', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
    const tableComponent = page.getByRole('table');
    await expect(tableComponent).toHaveCount(1);
    await tableComponent.waitFor({ state: 'visible' });
  });

  test('first row is expanded and has no padding', async ({ page }) => {
    const tableBodyRowFirstInput = page.getByRole('cell').nth(1);
    const tableBodyExpandableRowSlot = page.getByText(/Hello world 1/);
    await expect(tableBodyRowFirstInput).toHaveCount(1);
    await expect(tableBodyExpandableRowSlot).toHaveCount(1);
    await expect(tableBodyExpandableRowSlot).toBeVisible();
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0.05 });
  });
});
