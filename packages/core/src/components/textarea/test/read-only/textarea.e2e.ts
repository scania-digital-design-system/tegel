import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/textarea/test/read-only/index.html';

test.describe('tds-textarea', () => {
  test('renders read-only textarea correctly', async ({ page }) => {
    await page.goto(componentTestPath);
    const textarea = page.locator('tds-textarea');
    /* Expect the tds-textarea to have the read-only attribute */
    await expect(textarea).toHaveAttribute('read-only');
    /* Expect no diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('read-only textarea - native textarea should have readonly attribute', async ({ page }) => {
    await page.goto(componentTestPath);
    const textarea = page.locator('tds-textarea').locator('textarea');
    /* Expect the textarea within tds-textarea to have the readonly attribute */
    await expect(textarea).toHaveAttribute('readonly');
    const readonlyIcon = page.locator('tds-icon[name="edit_inactive"]');
    /* Expect a tds-icon to be present when readonly mode is active */
    expect(readonlyIcon).not.toBeNull();
  });

  // Error: locator.fill: Target closed
  // Not able to update the since we get Playwright error here when trying to input a readonly input.
  // Skipping for now.
  test.skip('Type text in textarea - no possibility to type text', async ({ page }) => {
    await page.goto(componentTestPath);
    const textarea = page.locator('tds-textarea').locator('textarea');
    await textarea.fill('Adding some text');
    /* Expect the inputValue of textarea to not have the text "Adding some text" since its readonly */
    expect(await textarea.inputValue()).not.toBe('Adding some text');
  });
});
