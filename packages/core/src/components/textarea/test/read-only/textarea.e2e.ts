import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/textarea/test/read-only/index.html';

test.describe('tds-textarea', () => {
  test('renders read-only textarea correctly', async ({ page }) => {
    await page.goto(componentTestPath);
    const tdsTextarea = page.getByTestId('tds-textarea-testid');
    await expect(tdsTextarea).toHaveCount(1);

    /* Expect the tds-textarea to have the read-only attribute */
    await expect(tdsTextarea).toHaveAttribute('read-only');

    /* Expect no diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('read-only textarea - native textarea should have readonly attribute', async ({ page }) => {
    await page.goto(componentTestPath);
    const textarea = page.getByTestId('tds-textarea-testid').locator('textarea');

    /* Expect the textarea within tds-textarea to have the readonly attribute */
    await expect(textarea).toHaveAttribute('readonly');
  });
});
