import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/button/test/danger/index.html';

test.describe('tds-button-danger', () => {
  test('renders danger button correctly', async ({ page }) => {
    await page.goto(componentTestPath);
    const button = page.getByTestId('tds-button-testid');
    await expect(button).toHaveCount(1);

    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('Check so that height is correct to sm measurements', async ({ page }) => {
    await page.goto(componentTestPath);
    const button = page.getByText('Button', { exact: true });
    const buttonHeight = await button.evaluate((style) => getComputedStyle(style).height);
    expect(buttonHeight).toBe('40px');
  });
});
