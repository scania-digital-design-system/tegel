import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/dropdown/test/filter/hide-no-result-message/index.html';

test.describe('tds-dropdown-filter', () => {
  test('renders filter dropdown correctly', async ({ page }) => {
    await page.goto(componentTestPath);
    const dropdown = page.getByTestId('tds-dropdown-testid');
    await expect(dropdown).toHaveCount(1);

    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('typing non existing value does not show "No results!" message', async ({ page }) => {
    await page.goto(componentTestPath);

    const inputElement = page.getByRole('textbox');

    /* Add text and only Option 1 should be visible */
    await inputElement.fill('Johnny looks for no results message');
    await expect(inputElement).toBeVisible();

    const noResult = page.getByText('No result');
    await expect(noResult).toBeHidden();

    /* Check diff on screenshot after adding text */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });
});
