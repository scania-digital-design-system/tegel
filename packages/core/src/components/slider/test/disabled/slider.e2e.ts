import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/slider/test/disabled/index.html';
test.describe('tds-slider-disabled', () => {
  test('read-only is false', async ({ page }) => {
    await page.goto(componentTestPath);
    const slider = page.locator('tds-slider');
    await expect(slider).not.toHaveAttribute('read-only');
    /* Check diff on screenshot as disabled state changes colors of a component */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('slider is disabled', async ({ page }) => {
    await page.goto(componentTestPath);
    const sliderThumb = page.locator('.tds-slider__thumb');
    const sliderCursorStyle = await sliderThumb.evaluate((style) => getComputedStyle(style).cursor);
    expect(sliderCursorStyle).toBe('not-allowed');
  });

  test('slider can not be clicked on', async ({ page }) => {
    await page.goto(componentTestPath);
    const sliderThumb = page.locator('.tds-slider__thumb-inner');
    const sliderPointerEvents = await sliderThumb.evaluate(
      (style) => getComputedStyle(style).pointerEvents,
    );
    expect(sliderPointerEvents).toBe('none');
  });
});
