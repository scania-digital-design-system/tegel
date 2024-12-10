import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/message/test/error/index.html';

test.describe.parallel('tds-message-error', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('is error message rendered correctly', async ({ page }) => {
    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('has header text', async ({ page }) => {
    const messageComponentHeader = page.getByText('Message header', { exact: true });
    await expect(messageComponentHeader).toHaveCount(1);
    await expect(messageComponentHeader).toBeVisible();
  });

  test('has subheader text', async ({ page }) => {
    const messageComponentSubHeader = page.getByText('Longer Message text can be placed here.');
    await expect(messageComponentSubHeader).toHaveCount(1);
    await expect(messageComponentSubHeader).toBeVisible();
  });

  test('has error icon', async ({ page }) => {
    const messageIcon = page.getByRole('img');
    await expect(messageIcon).toHaveCount(1);
    await expect(messageIcon).toBeVisible();
  });
});
