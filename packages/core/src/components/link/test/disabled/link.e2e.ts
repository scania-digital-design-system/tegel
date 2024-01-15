import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/link/test/disabled/index.html';

test.describe('tds-link-default', () => {
  test('is disabled link rendered correctly', async ({ page }) => {
    await page.goto(componentTestPath);
    const tdsLink = page.getByTestId('tds-link-testid');
    await expect(tdsLink).toHaveCount(1);
    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('text shows on page', async ({ page }) => {
    await page.goto(componentTestPath);
    const pageText = page.getByText(
      'The Tegel Design System is for digital products and services at Scania. It enables an efficient' +
        "    development process and ensures a premium experience across all of Scania's digital touchpoints.",
      { exact: true },
    );
    await expect(pageText).toHaveCount(1);
    await expect(pageText).toBeVisible();
  });

  test('link is underlined', async ({ page }) => {
    await page.goto(componentTestPath);
    const tdsLink = page.getByText('Tegel', { exact: true });
    const linkUnderlineState = await tdsLink.evaluate(
      (style) => getComputedStyle(style).textDecorationLine,
    );
    expect(linkUnderlineState).toBe('underline');
  });

  test('component is disabled', async ({ page }) => {
    await page.goto(componentTestPath);
    const tdsLink = page.getByText('Tegel', { exact: true });
    const linkUnderlineState = await tdsLink.evaluate(
      (style) => getComputedStyle(style).pointerEvents,
    );
    expect(linkUnderlineState).toBe('none');
  });
});
