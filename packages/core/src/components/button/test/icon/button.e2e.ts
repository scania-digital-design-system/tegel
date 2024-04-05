import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/button/test/icon/index.html';

test.describe.parallel('tds-button-icon', () => {
  test('renders icon button correctly', async ({ page }) => {
    await page.goto(componentTestPath);
    const button = page.getByTestId('tds-button-testid');
    await expect(button).toHaveCount(1);

    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('icon should exist', async ({ page }) => {
    await page.goto(componentTestPath);
    const icon = page.getByRole('img');
    await expect(icon).toBeVisible();
  });

  test('Check so that height and width is correct to lg/default measurements with a single button', async ({
    page,
  }) => {
    await page.goto(componentTestPath);
    const button = page.getByRole('button');
    const buttonHeight = await button.evaluate((style) => getComputedStyle(style).height);
    expect(buttonHeight).toBe('56px');
    const buttonWidth = await button.evaluate((style) => getComputedStyle(style).width);
    expect(buttonWidth).toBe('56px');

    const icon = page.getByRole('img');
    const iconHeight = await icon.evaluate((style) => getComputedStyle(style).height);
    expect(iconHeight).toBe('20px');
    const iconWidth = await icon.evaluate((style) => getComputedStyle(style).width);
    expect(iconWidth).toBe('20px');
  });

  test('Check so that height and width is correct to lg/default measurements with a single button for the icon', async ({
    page,
  }) => {
    await page.goto(componentTestPath);
    const icon = page.getByRole('img');
    const iconHeight = await icon.evaluate((style) => getComputedStyle(style).height);
    expect(iconHeight).toBe('20px');
    const iconWidth = await icon.evaluate((style) => getComputedStyle(style).width);
    expect(iconWidth).toBe('20px');
  });
});
