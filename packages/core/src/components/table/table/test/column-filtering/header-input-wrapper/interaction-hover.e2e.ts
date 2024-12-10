import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath =
  'src/components/table/table/test/column-filtering/header-input-wrapper/index.html';

test.describe.parallel('tds-table-column-filtering hover', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('expect wrapper to effect slotted inputs style on hover', async ({ page }) => {
    const inputfield = page.getByTestId('firstHeaderInput');

    await inputfield.hover();

    const color = await inputfield.evaluate((el) => {
      return window.getComputedStyle(el).getPropertyValue('background-color');
    });

    expect(color).toBe('rgba(0, 0, 0, 0)');

    /* Check diff of screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0.01 });
  });

  test('expect slotted input to show search icon on hover', async ({ page }) => {
    const inputfield = page.getByTestId('firstHeaderInput');

    await inputfield.hover();

    // finding wrapper component after hover over slotted input
    const icon = page.getByTestId('firstHeaderWrapper').locator('tds-icon');
    let iconClass = await icon.evaluate((element: HTMLInputElement) => element.className);

    expect(iconClass).toContain('search-icon');
  });
});
