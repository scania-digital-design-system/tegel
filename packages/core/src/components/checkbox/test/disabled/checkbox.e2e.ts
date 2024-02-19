import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/checkbox/test/disabled/index.html';

test.describe('tds-checkbox', () => {
  test('Hover over checkbox and label -> cursor should become inactive', async ({ page }) => {
    await page.goto(componentTestPath);

    // Find the checkbox and label elements
    const checkbox = page.locator('tds-checkbox');
    const labelElement = page.locator('tds-checkbox', { hasText: 'Label' });

    // Hover over checkbox and label
    await checkbox.hover();
    await labelElement.hover();

    // Get cursor styles for checkbox and label
    const checkboxCursorStyle = await checkbox.evaluate(
      (element) => getComputedStyle(element).cursor,
    );
    const labelCursorStyle = await labelElement.evaluate(
      (element) => getComputedStyle(element).cursor,
    );

    // Check if cursor styles are 'auto' indicating inactive cursor
    expect(checkboxCursorStyle).toBe('auto');
    expect(labelCursorStyle).toBe('auto');

    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });
});
