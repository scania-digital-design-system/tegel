import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/table/table/test/editing/body-input-wrapper/index.html';

test.describe.parallel('tds-table-editable-cells fill', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('expect slotted inputs to persist inputed value', async ({ page }) => {
    const inputfield = page.getByTestId('firstInput');
    await inputfield.fill('Hello World!');

    await inputfield.blur();

    let value = await inputfield.inputValue();

    expect(value).toBe('Hello World!');

    /* Check diff of screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0.01 });
  });
});
