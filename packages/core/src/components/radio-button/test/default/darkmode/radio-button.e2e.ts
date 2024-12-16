import { expect } from '@playwright/test';
import { test } from 'stencil-playwright';

const componentTestPath = 'src/components/radio-button/test/default/darkmode/index.html';

test.describe.parallel('TdsRadioButton component tests default darkmode', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('Radio buttons with Label text = "Label text 1" and "Label text 2" render on the page', async ({
    page,
  }) => {
    const radioButton1 = page.locator('tds-radio-button', { hasText: 'Label text 1' });
    const radioButton2 = page.locator('tds-radio-button', { hasText: 'Label text 2' });
    await expect(radioButton1).toBeVisible();
    await expect(radioButton2).toBeVisible();
    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0 });
  });
});
