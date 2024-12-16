import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/message/test/information/primary/lightmode/index.html';

test.describe('tds-message-information-primary-lightmode', () => {
  test('is information message rendered correctly', async ({ page }) => {
    await page.goto(componentTestPath);

    /* Take screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });
});
