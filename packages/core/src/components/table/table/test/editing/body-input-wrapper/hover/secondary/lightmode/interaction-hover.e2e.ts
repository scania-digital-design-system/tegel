import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath =
  'src/components/table/table/test/editing/body-input-wrapper/hover/secondary/lightmode/index.html';

test.describe.parallel('tds-table-editable-cells-hover-secondary-lightmode', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('expect wrapper to effect slotted inputs style on hover', async ({ page }) => {
    const inputfield = page.getByTestId('firstInput');

    await inputfield.hover();

    /* Check diff of screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0.01 });
  });
});
