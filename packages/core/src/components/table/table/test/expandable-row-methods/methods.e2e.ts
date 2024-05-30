import { E2EPage, test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/table/table/test/expandable-row-methods/index.html';

const click = async (page: E2EPage, id: string) => {
  const expandButton = page.locator(id);
  await expandButton.waitFor({ state: 'visible' });
  await expandButton.click();
  await page.waitForChanges();
  await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
};

test.describe('tds-table-expandable-row-methods', () => {
  // Setup beforeEach hook
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
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
