import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/textarea/test/read-only/index.html';

test.describe.parallel('tds-textarea-read-only', () => {
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
    const textarea = page.getByRole('textbox');

    /* Expect the textarea within tds-textarea to have the readonly attribute */
    await expect(textarea).toHaveAttribute('readonly');
  });

  test('be able to find label if "outside" is set', async ({ page }) => {
    await page.goto(componentTestPath);
    const textareaLabel = page.getByText('Label');
    await expect(textareaLabel).toHaveCount(1);
    await expect(textareaLabel).toBeVisible();
  });
});
