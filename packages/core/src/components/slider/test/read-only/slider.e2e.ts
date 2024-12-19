import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../utils/testConfiguration';

const componentTestPath = 'src/components/slider/test/read-only/index.html';
const componentName = 'tds-slider';
const testDescription = 'tds-slider-read-only';

testConfigurations.basic.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('read-only is true', async ({ page }) => {
      const slider = page.locator('tds-slider');
      await expect(slider).toHaveAttribute('read-only');
    });

    test('is not disabled', async ({ page }) => {
      const sliderThumb = page.locator('.tds-slider__thumb-inner');
      const sliderCursorStyle = await sliderThumb.evaluate(
        (style) => getComputedStyle(style).cursor,
      );
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
});
