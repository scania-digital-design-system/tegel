import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/message/test/success/index.html';

test.describe('tds-message-success', () => {
  test('is success message rendered correctly', async ({ page }) => {
    await page.goto(componentTestPath);

    /* Take screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });
});
