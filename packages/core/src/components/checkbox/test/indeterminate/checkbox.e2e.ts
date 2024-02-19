import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/checkbox/test/indeterminate/index.html';

test.describe('tds-checkbox', () => {
  test('Hover over checkbox and label -> cursor should become inactive', async ({ page }) => {
    await page.goto(componentTestPath);

    // Find the checkbox and label elements
    const checkbox = page.locator('tds-checkbox');
    const labelElement = page.locator('tds-checkbox', { hasText: 'Label' });

    // Hover over checkbox and label
    await checkbox.hover();
    await labelElement.hover();

    const indeterminateValue = await checkbox.getAttribute('indeterminate');
    expect(indeterminateValue).not.toBeNull();

    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });
});
