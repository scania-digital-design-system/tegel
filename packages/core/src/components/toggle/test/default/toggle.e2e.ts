import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/toggle/test/default/index.html';

test.describe.parallel('tds-toggle', () => {
  test('Renders basic toggle correctly', async ({ page }) => {
    await page.goto(componentTestPath);
    const labelElement = page.locator('tds-toggle label');
    const headlineElement = page.locator('tds-toggle .toggle-headline'); // Target label underneath toggle

    expect(labelElement).toHaveText('Label'); // Check label text
    expect(headlineElement).toHaveText('switch me');

    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('Click on toggle -> should become checked', async ({ page }) => {
    await page.goto(componentTestPath);
    const toggle = page.locator('tds-toggle input');

    // Expect not to be checked on render
    let isChecked = await toggle.evaluate((element: HTMLInputElement) => element.checked);
    expect(isChecked).toBe(false);

    // Click the toggle input
    await toggle.click();

    // Expect toggle input to be checked after click
    isChecked = await toggle.evaluate((element: HTMLInputElement) => element.checked);
    expect(isChecked).toBe(true);
  });
});
