import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/datetime/test/default/secondary/lightmode/index.html';

test.describe('tds-datetime-default-secondary-lightmode', () => {
  test('renders datetime component correctly', async ({ page }) => {
    await page.goto(componentTestPath);

    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('icon click triggers native datetime picker', async ({ page }) => {
    await page.goto(componentTestPath);

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
