import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/message/test/error/index.html';

test.describe('tds-message', () => {
  test('is rendered correctly', async ({ page }) => {
    await page.goto(componentTestPath);

    /* Check if a component exists in the DOM */
    const messageComponent = page.locator('tds-message');
    expect(messageComponent).toBeTruthy();

    /* Take screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('is in error variant', async ({ page }) => {
    await page.goto(componentTestPath);
    const messageComponentDiv = page.locator('tds-message > div');
    await expect(messageComponentDiv).toHaveClass(/error/);
  });

  test('has header text', async ({ page }) => {
    await page.goto(componentTestPath);
    const messageComponentHeader = page.locator('tds-message .header');
    await expect(messageComponentHeader).not.toBeEmpty();
  });

  test('has subheader text', async ({ page }) => {
    await page.goto(componentTestPath);
    const messageComponent = page.locator('tds-message');
    await expect(messageComponent).toHaveText(
      /Longer Message text can be placed here. Longer Message text can be placed here./,
    );
  });

  test('has error icon', async ({ page }) => {
    await page.goto(componentTestPath);
    const messageIconComponent = page.locator('tds-message tds-icon');
    await expect(messageIconComponent).toHaveAttribute('name', 'error');
  });
});
