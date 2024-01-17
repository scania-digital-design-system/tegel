import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/slider/test/default/index.html';

test.describe('tds-slider-default', () => {
  test('renders default slider correctly', async ({ page }) => {
    await page.goto(componentTestPath);
    const slider = page.locator('tds-slider');
    await expect(slider).toHaveCount(1);

    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('value is set to 50', async ({ page }) => {
    await page.goto(componentTestPath);
    const slider = page.locator('tds-slider');
    const sliderValue = await slider.getAttribute('value');
    expect(sliderValue).toBe('50');
  });

  test('min value is set to 0', async ({ page }) => {
    await page.goto(componentTestPath);
    const slider = page.locator('tds-slider');
    const sliderMinValue = await slider.getAttribute('min');
    expect(sliderMinValue).toBe('0');
  });

  test('max value is set to 100', async ({ page }) => {
    await page.goto(componentTestPath);
    const slider = page.locator('tds-slider');
    const sliderMaxValue = await slider.getAttribute('max');
    expect(sliderMaxValue).toBe('100');
  });

  test('label is hidden', async ({ page }) => {
    await page.goto(componentTestPath);
    const slider = page.locator('tds-slider');
    const sliderLabel = slider.locator('label');
    await expect(sliderLabel).toHaveText('');
  });

  test('slider is not read only or disabled', async ({ page }) => {
    await page.goto(componentTestPath);

    /* Find thumb and pull it towards a left and check if value in thumb is changing */
    await page.locator('.tds-slider__thumb-inner').hover();
    await page.mouse.down();
    await page.mouse.move(100, 0);
    await page.mouse.up();

    /* Compare value with initial one */
    const thumbValue = page.locator('.tds-slider__value');
    await expect(thumbValue).not.toHaveText('50');
  });

  test('thumb is size large', async ({ page }) => {
    await page.goto(componentTestPath);
    const slider = page.locator('tds-slider');
    const sliderMaxValue = await slider.getAttribute('thumb-size');
    expect(sliderMaxValue).toBe('lg');
  });
});
