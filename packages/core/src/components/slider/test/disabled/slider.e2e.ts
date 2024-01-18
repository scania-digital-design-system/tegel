import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/slider/test/disabled/index.html';
test.describe('tds-slider-disabled', () => {
  test('read-only is false', async ({ page }) => {
    await page.goto(componentTestPath);
    const slider = page.locator('tds-slider');
    await expect(slider).not.toHaveAttribute('read-only');
  });

  test('is disabled', async ({ page }) => {
    await page.goto(componentTestPath);
    const slider = page.locator('tds-slider');
    await expect(slider).toHaveAttribute('disabled');
  });

  test('slider can not be clicked on', async ({ page }) => {
    await page.goto(componentTestPath);
    const sliderThumb = page.locator('.tds-slider__thumb');
    const sliderThumbStyle = await sliderThumb.evaluate((style) => getComputedStyle(style).cursor);
    expect(sliderThumbStyle).toBe('not-allowed');
  });
});
