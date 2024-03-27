import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/table/table/test/expandable-row/index.html';

test.describe('tds-table-expandable-row', () => {
  // Inject beforeEach hook here
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
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

  test('under first row opened expanded row with text "Hello world 1"', async ({ page }) => {
    const tableBodyRowFirstInput = page.getByRole('cell').nth(1);
    const tableBodyExpandableRowSlot = page.getByText(/Hello world 1/);
    await expect(tableBodyRowFirstInput).toHaveCount(1);
    await expect(tableBodyExpandableRowSlot).toHaveCount(1);
    await expect(tableBodyExpandableRowSlot).toBeHidden();

    await tableBodyRowFirstInput.click();
    await expect(tableBodyExpandableRowSlot).toBeVisible();

    /* check input screenshot diff */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0.05 });
  });

  test('under second row opened expanded row with text "Hello to you too"', async ({ page }) => {
    const tableBodyRowSecondInput = page.getByRole('cell').nth(2);
    const tableBodyExpandableRowSlot = page.getByText(/Hello to you too/);
    await expect(tableBodyRowSecondInput).toHaveCount(1);
    await expect(tableBodyExpandableRowSlot).toHaveCount(1);
    await expect(tableBodyExpandableRowSlot).toBeHidden();

    await tableBodyRowSecondInput.click();
    await expect(tableBodyExpandableRowSlot).toBeVisible();

    /* check input screenshot diff */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0.05 });
  });

  test('under third row opened expanded row with a button with text "Call to action"', async ({
    page,
  }) => {
    const tableBodyRowThirdInput = page.getByRole('cell').nth(3);
    const tableBodyRowButton = page.getByText(/Call to action/);
    await expect(tableBodyRowThirdInput).toHaveCount(1);
    await expect(tableBodyRowButton).toHaveCount(1);
    await expect(tableBodyRowButton).toBeHidden();

    await tableBodyRowThirdInput.click();
    await expect(tableBodyRowButton).toBeVisible();

    /* check input screenshot diff */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0.05 });
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
