import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../utils/testConfiguration';

const componentTestPath = 'src/components/slider/test/default/index.html';
const componentName = 'tds-slider';
const testDescription = 'tds-slider-default';

testConfigurations.basic.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('renders default slider correctly', async ({ page }) => {
      const slider = page.locator('tds-slider');
      await expect(slider).toHaveCount(1);

      /* Check diff on screenshot */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });

    test('value is set to 50', async ({ page }) => {
      const sliderValue = page.locator('.tds-slider__value');
      await expect(sliderValue).toHaveText('50');
    });

    test('min value is set to 0', async ({ page }) => {
      /* Find thumb and pull it towards a left and check if min value is 0 */
      await page.locator('.tds-slider__thumb-inner').hover();
      await page.mouse.down();
      await page.mouse.move(0, 0);
      await page.mouse.up();

      /* Compare value with initial one */
      const thumbValue = page.locator('.tds-slider__value');
      await expect(thumbValue).toHaveText('0');
    });

    test('max value is set to 100', async ({ page }) => {
      /* Find thumb and pull it towards a right and check if min value is 0 */
      await page.locator('.tds-slider__thumb-inner').hover();
      await page.mouse.down();
      await page.mouse.move(2000, 0);
      await page.mouse.up();

      /* Compare value with initial one */
      const thumbValue = page.locator('.tds-slider__value');
      await expect(thumbValue).toHaveText('100');
    });

    test('label is hidden', async ({ page }) => {
      const slider = page.locator('tds-slider');
      const sliderLabel = slider.locator('label');
      await expect(sliderLabel).toHaveText('');
    });

    test('slider is not read only or disabled', async ({ page }) => {
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
      const sliderThumb = page.locator('.tds-slider__thumb-inner');
      const sliderThumbWidth = await sliderThumb.evaluate((style) => getComputedStyle(style).width);
      const sliderThumbHeight = await sliderThumb.evaluate(
        (style) => getComputedStyle(style).height,
      );
      expect(sliderThumbWidth).toBe('20px');
      expect(sliderThumbHeight).toBe('20px');
    });
  });
});
