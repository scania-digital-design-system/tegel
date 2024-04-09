import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/datetime/test/success/index.html';

test.describe('tds-datetime-success', () => {
  test('renders success datetime component correctly', async ({ page }) => {
    await page.goto(componentTestPath);

    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('component should have size "md"', async ({ page }) => {
    await page.goto(componentTestPath);
    const dateTime = page.locator('tds-datetime');
    const dateTimeContainer = page.locator('.tds-datetime-container');

    // Check for the label text
    const label = page.locator('.tds-datetime-label');
    await expect(label).toBeVisible();
    await expect(label).toHaveText('Label text');

    // Check for the helper text
    const helperText = page.locator('.tds-datetime-helper .tds-helper');
    await expect(helperText).toBeVisible();
    await expect(helperText).toHaveText('Helper text');

    // For example, checking for the "state" attribute to be "success"
    await expect(dateTime).toHaveAttribute('state', 'success');
    await expect(dateTimeContainer).toHaveCSS('height', '48px');
    await expect(dateTime).toHaveAttribute('size', 'md');
    await expect(dateTime).not.toHaveAttribute('min');
    await expect(dateTime).not.toHaveAttribute('max');
  });
});
