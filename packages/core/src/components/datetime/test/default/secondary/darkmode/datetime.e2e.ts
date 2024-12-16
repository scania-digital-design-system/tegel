import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/datetime/test/default/secondary/darkmode/index.html';

test.describe('tds-datetime-default-secondary-darkmode', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('renders datetime component correctly', async ({ page }) => {
    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('icon click triggers native datetime picker', async ({ page }) => {
    // Assuming the calendar icon can be clicked to open the datetime picker
    await page.click('input[type="datetime-local"]');

    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });

    // Verify the input is indeed focused. This is an indirect test to ensure
    // that actions leading up to the display of the native picker are correctly initiated.
    const inputIsFocused = await page.evaluate(
      () => (document.activeElement as HTMLInputElement).type === 'datetime-local',
    );
    expect(inputIsFocused).toBeTruthy();
  });
});
