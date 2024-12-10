import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/datetime/test/disabled/index.html';

test.describe('tds-datetime-disabled', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('renders disabled datetime component correctly', async ({ page }) => {
    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('when in disabled state all but helper text should have pointer events none', async ({
    page,
  }) => {
    // Check for disabled state of the datetime input
    const datetimeInput = page.locator('input[type="datetime-local"]');
    const label = page.locator('label');
    const helperText = page.locator('.tds-datetime-helper .tds-helper');

    await expect(datetimeInput).toBeDisabled();

    await datetimeInput.hover();
    await expect(datetimeInput).toHaveCSS('cursor', 'not-allowed');

    await label.hover();
    await expect(label).toHaveCSS('cursor', 'not-allowed');

    await expect(helperText).not.toHaveCSS('pointer-events', 'none');
  });
});
