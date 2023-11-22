import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/textarea/test/read-only/index.html';

test.describe('tds-textarea', () => {
  test('renders read-only textarea correctly', async ({ page }) => {
    await page.goto(componentTestPath);
    const textarea = page.locator('tds-textarea');
    await expect(textarea).toHaveAttribute('read-only');
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('read-only textarea - native textarea should have readonly attribute', async ({ page }) => {
    await page.goto(componentTestPath);
    const textarea = page.locator('tds-textarea').locator('textarea');
    await expect(textarea).toHaveAttribute('readonly');
    const readonlyIcon = page.locator('tds-icon[name="edit_inactive"]');
    expect(readonlyIcon).not.toBeNull();
  });

  // Error: locator.fill: Target closed
  // Not able to update the since we get Playwright error here when trying to input a readonly input.
  // Skipping for now.
  test.skip('Type text in textarea - no possibility to type text', async ({ page }) => {
    await page.goto(componentTestPath);
    const textarea = page.locator('tds-textarea').locator('textarea');
    await textarea.fill('Adding some text');
    expect(await textarea.inputValue()).not.toBe('Adding some text');
  });
});
