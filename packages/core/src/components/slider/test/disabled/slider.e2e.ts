import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../utils/testConfiguration';

const componentTestPath = 'src/components/slider/test/disabled/index.html';
const componentName = 'tds-slider';
const testDescription = 'tds-slider-disabled';

testConfigurations.basic.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('slider is disabled', async ({ page }) => {
      const slider = page.locator('tds-slider input');
      const sliderThumb = page.locator('.tds-slider__thumb');
      const sliderCursorStyle = await sliderThumb.evaluate(
        (style) => getComputedStyle(style).cursor,
      );
      expect(sliderCursorStyle).toBe('not-allowed');
      /* Check diff on screenshot as disabled state changes colors of a component */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
      await expect(slider).toBeDisabled();
    });
  });
});

test.describe.parallel(componentName, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('read-only is false', async ({ page }) => {
    const slider = page.locator('tds-slider');
    await expect(slider).not.toHaveAttribute('read-only');
  });

  test('slider can not be clicked on', async ({ page }) => {
    const sliderThumb = page.locator('.tds-slider__thumb-inner');
    const sliderPointerEvents = await sliderThumb.evaluate(
      (style) => getComputedStyle(style).pointerEvents,
    );
    expect(sliderPointerEvents).toBe('none');
  });
});
