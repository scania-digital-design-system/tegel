import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath =
  'src/components/table/table/test/column-filtering/header-input-wrapper/index.html';

test.describe.parallel('tds-table-column-filtering focus', () => {
  test('expect wrapper to effect slotted inputs style on focus', async ({ page }) => {
    await page.goto(componentTestPath);

    const inputfield = page.getByTestId('firstHeaderInput');

    await inputfield.focus();

    const color = await inputfield.evaluate((el) => {
      return window.getComputedStyle(el).getPropertyValue('background-color');
    });

    expect(color).toBe('rgb(255, 255, 255)'); // white

    /* Check diff of screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0.01 });
  });
});
