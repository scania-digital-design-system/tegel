import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/checkbox/test/indeterminate/index.html';

test.describe('tds-checkbox', () => {
  test('Checkbox indeterminate state', async ({ page }) => {
    await page.goto(componentTestPath);

    // Find the checkbox and label elements
    const checkbox = page.locator('tds-checkbox');
    const labelElement = page.locator('tds-checkbox label'); // Target label underneath checkbox

    // Hover over checkbox and label
    await checkbox.hover();
    await labelElement.hover();

    const indeterminateValue = await checkbox.getAttribute('indeterminate');

    expect(labelElement).toHaveText('Label'); // Check label text
    expect(indeterminateValue).not.toBeNull();

    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });
});
