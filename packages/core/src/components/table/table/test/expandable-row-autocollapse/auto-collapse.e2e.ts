import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

test.describe.serial('Expandable Table Rows', () => {
  test('should verify auto-collapse behavior between rows', async ({ page }) => {
    // Navigate to the page containing the table
    await page.goto('src/components/table/table/test/expandable-row-autocollapse/index.html');

    // Select row toggles
    const firstRowToggle = page.locator(
      'tds-table-body-row-expandable[data-testid="1"] > tr > td > label',
    );
    const secondRowToggle = page.locator(
      'tds-table-body-row-expandable[data-testid="2"] > tr > td > label',
    );

    // Expand the first row
    await firstRowToggle.click();

    // Assert that the first row is expanded
    const firstRowContent = page.getByText(/Hello world 1/);
    await expect(firstRowContent).toBeVisible();

    // Now expand the second row without navigating away
    await secondRowToggle.click();

    // Assert that the second row is expanded
    const secondRowContent = page.getByText(/Hello to you too/);
    await expect(secondRowContent).toBeVisible();

    // Wait for the first row to be hidden using waitFor instead of expect
    await firstRowContent.waitFor({ state: 'hidden', timeout: 5000 });

    // Double-check the state
    await expect(firstRowContent).toBeHidden();
    await expect(secondRowContent).toBeVisible();

    /* check input screenshot diff */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });
});
