import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/button/test/ghost/unspecified/index.html';

test.describe.parallel('tds-button-ghost', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('renders ghost button correctly', async ({ page }) => {
    const button = page.getByTestId('tds-button-testid');
    await expect(button).toHaveCount(1);

    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('Check so that height is correct to md measurements', async ({ page }) => {
    const button = page.getByText('Button', { exact: true });
    const buttonHeight = await button.evaluate((style) => getComputedStyle(style).height);
    expect(buttonHeight).toBe('24px');
  });
});
