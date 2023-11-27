import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/textarea/test/read-only/index.html';

test.describe('tds-textarea', () => {
  test('renders read-only textarea correctly', async ({ page }) => {
    await page.goto(componentTestPath);
    const tdsTextarea = page.locator('tds-textarea');
    expect(tdsTextarea).toBeTruthy();

    /* Expect the tds-textarea to have the read-only attribute */
    await expect(tdsTextarea).toHaveAttribute('read-only');
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
    expect(readonlyIcon).toBeTruthy();
  });
});
