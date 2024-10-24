import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

test.describe.serial('Expandable Table Rows', () => {
  test('should collapse the second row when expanding the first row', async ({ page }) => {
    // Navigate to the page containing the table
    await page.goto('src/components/table/table/test/expandable-row-autocollapse/index.html');

    // Select the row element by data-testid or row-id
    const firstRowToggle = page.locator(
      'tds-table-body-row-expandable[data-testid="1"] > tr > td > label',
    );
    // Expand the first row
    await firstRowToggle.click();

    // Assert that the first row is expanded
    const firstRowContent = page.getByText(/Hello world 1/);
    await expect(firstRowContent).toBeVisible();
    /* check input screenshot diff */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('should collapse the first row when expanding the second row', async ({ page }) => {
    // Navigate to the page containing the table
    await page.goto('src/components/table/table/test/expandable-row-autocollapse/index.html');

    // Select the row element by data-testid or row-id
    const secondRowToggle = page.locator(
      'tds-table-body-row-expandable[data-testid="2"] > tr > td > label',
    );

    // Expand the second row
    await secondRowToggle.click();

    // Assert that the second row is expanded
    const secondRowContent = page.getByText(/Hello to you too/);
    await expect(secondRowContent).toBeVisible();

    // Assert that the first row is now collapsed
    const firstRowContent = page.getByText(/Hello world 1/);
    await expect(firstRowContent).toBeHidden();
    /* check input screenshot diff */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });
});
