import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/slider/test/read-only/index.html';
test.describe('tds-slider-read-only', () => {
  test('read-only is true', async ({ page }) => {
    await page.goto(componentTestPath);
    const slider = page.locator('tds-slider');
    await expect(slider).toHaveAttribute('read-only');
  });

  test('is not disabled', async ({ page }) => {
    await page.goto(componentTestPath);
    const slider = page.locator('tds-slider');
    await expect(slider).not.toHaveAttribute('disabled');
  });

  test('slider can not be clicked on', async ({ page }) => {
    await page.goto(componentTestPath);
    const sliderThumb = page.locator('.tds-slider__thumb-inner');
    const sliderThumbStyle = await sliderThumb.evaluate(
      (style) => getComputedStyle(style).pointerEvents,
    );
    expect(sliderThumbStyle).toBe('none');
  });
});
