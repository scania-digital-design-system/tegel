import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/button/test/icon/index.html';

test.describe('tds-button-icon', () => {
  test('renders icon button correctly', async ({ page }) => {
    await page.goto(componentTestPath);
    const button = page.getByTestId('tds-button-testid');
    await expect(button).toHaveCount(1);
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('icon should exist', async ({ page }) => {
    await page.goto(componentTestPath);
    const icon = page.getByRole('button').locator('tds-icon');
    await expect(icon).toBeVisible();
  });

  test('Check so that height and width is correct to lg/default measurements with a single button', async ({
    page,
  }) => {
    await page.goto(componentTestPath);
    const button = page.getByTestId('tds-button-testid');
    const buttonHeight = await button.evaluate((style) => getComputedStyle(style).height);
    expect(buttonHeight).toBe('20px');
    const buttonWidth = await button.evaluate((style) => getComputedStyle(style).width);
    expect(buttonWidth).toBe('20px');
  });
});
