import { test } from '@stencil/playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../utils/testConfiguration';

const componentTestPath = 'src/components/slider/test/reverse/index.html';
const componentName = 'tds-slider';
const testDescription = 'tds-slider-reverse';

testConfigurations.basicWithBrandVariants.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('renders reverse slider correctly', async ({ page }) => {
      const slider = page.locator('tds-slider');
      await expect(slider).toHaveCount(1);

      /* Check diff on screenshot */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });

    test('updating value still works as standard slider', async ({ page }) => {
      const sliderMinusControl = page.locator('.tds-slider__control-minus');
      const sliderValue = page.locator('.tds-slider__value');

      await expect(sliderMinusControl).toBeVisible();
      await expect(sliderValue).toHaveText('65');

      await sliderMinusControl.click();
      await expect(sliderValue).toHaveText('60');

      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });
  });
});
