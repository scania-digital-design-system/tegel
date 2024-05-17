import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/table/table/test/expandable-row-methods/index.html';

test.describe.parallel('tds-table-expandable-row-methods', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
    const tableComponent = page.getByRole('table');
    await expect(tableComponent).toHaveCount(1);
    await tableComponent.waitFor({ state: 'visible' });
  });

  test('click expand button', async ({ page }) => {
    page.locator('#expand-button').click();
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0.05 });
  });

  test('click collapse button', async ({ page }) => {
    page.locator('#collapse-button').click();
    const tableRow = page.locator('tds-table-body-row-expandable').last();
    expect(tableRow).toBeVisible();
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0.05 });
  });
});
