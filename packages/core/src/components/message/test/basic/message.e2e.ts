import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/message/test/basic/index.html';

test.describe.parallel('tds-message-basic', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('is basic message rendered correctly', async ({ page }) => {
    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('has icon', async ({ page }) => {
    const messageIcon = page.getByRole('img');
    await expect(messageIcon).toHaveCount(1);
    await expect(messageIcon).toBeVisible();
  });
});
