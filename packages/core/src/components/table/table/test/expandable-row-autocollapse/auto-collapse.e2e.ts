import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/table/table/test/expandable-row-autocollapse/index.html';

test.describe.serial('Expandable Table Rows', () => {
  test('should verify auto-collapse behavior between rows', async ({ page }) => {
    // Navigate to the page containing the table
    await page.goto(componentTestPath);

    const firstRowToggle = page.locator(
      'tds-table-body-row-expandable[data-testid="1"] > tr > td > label',
    );
    const secondRowToggle = page.locator(
      'tds-table-body-row-expandable[data-testid="2"] > tr > td > label',
    );

    // Expand first row and capture the state
    await firstRowToggle.click();
    await page.waitForTimeout(100); // Small delay for animation
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });

    // Expand second row and capture the final state
    await secondRowToggle.click();
    await page.waitForTimeout(100); // Small delay for animation
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });
});
