import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/toggle/test/disabled/index.html';

test.describe.parallel('tds-toggle', () => {
  test('Should have disabled attribute', async ({ page }) => {
    await page.goto(componentTestPath);

    const toggle = page.locator('tds-toggle input');

    const disabled = await toggle.evaluate((element: HTMLInputElement) => element.disabled);
    expect(disabled).toBe(true);

    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('Hover over toggle -> should have inactive cursor', async ({ page }) => {
    await page.goto(componentTestPath);
    const label = page.locator('tds-toggle label');
    const headline = page.locator('tds-toggle .toggle-headline');
    const input = page.locator('tds-toggle input');

    // Label should have a not-allowed cursor
    await label.hover();
    const labelCursorStyle = await label.evaluate((style) => getComputedStyle(style).cursor);
    expect(labelCursorStyle).toBe('not-allowed');

    // Headline should have a not-allowed cursor
    await headline.hover();
    const headlineCursorStyle = await headline.evaluate((style) => getComputedStyle(style).cursor);
    expect(headlineCursorStyle).toBe('not-allowed');

    // Input should have a not-allowed cursor
    await input.hover();
    const inputCursorStyle = await input.evaluate((style) => getComputedStyle(style).cursor);
    expect(inputCursorStyle).toBe('not-allowed');
  });
});
