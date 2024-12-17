import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/slider/test/read-only/index.html';

test.describe.parallel('tds-slider-read-only', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('read-only is true', async ({ page }) => {
    const slider = page.locator('tds-slider');
    await expect(slider).toHaveAttribute('read-only');
  });

  test('is not disabled', async ({ page }) => {
    const sliderThumb = page.locator('.tds-slider__thumb-inner');
    const sliderCursorStyle = await sliderThumb.evaluate((style) => getComputedStyle(style).cursor);
    expect(sliderCursorStyle).toBe('pointer');
    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('slider can not be clicked on', async ({ page }) => {
    const sliderThumb = page.locator('.tds-slider__thumb-inner');
    const sliderThumbStyle = await sliderThumb.evaluate(
      (style) => getComputedStyle(style).pointerEvents,
    );
    expect(sliderThumbStyle).toBe('none');
  });
});
