import { test } from '@stencil/playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../utils/testConfiguration';

const componentTestPath = 'src/components/slider/test/with-input-field/index.html';
const componentName = 'tds-slider';
const testDescription = 'tds-slider-with-input-field';

testConfigurations.basicWithBrandVariants.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('renders sliders with input field correctly', async ({ page }) => {
      const slider = page.locator('tds-slider');
      await expect(slider).toHaveCount(2);

      /* Check diff on screenshot */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });

    test('hover on first slider looks correct', async ({ page }) => {
      const sliderPrimaryThumb = page.getByLabel('Primary').locator('.tds-slider__thumb-inner');

      await sliderPrimaryThumb.hover();

      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });

    test('press on first slider looks correct', async ({ page }) => {
      const sliderPrimaryThumb = page.getByLabel('Primary').locator('.tds-slider__thumb-inner');

      await sliderPrimaryThumb.hover();

      // Press and hold the mouse button
      await page.mouse.down();

      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });

      await page.mouse.up();
    });
  });
});

test.describe.parallel(componentName, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('values are correctly set', async ({ page }) => {
    const sliderValuePrimary = page.getByLabel('Primary').locator('.tds-slider__value');
    const sliderValueSecondary = page.getByLabel('Secondary').locator('.tds-slider__value');

    await expect(sliderValuePrimary).toHaveText('73');
    await expect(sliderValueSecondary).toHaveText('37');
  });

  test('label is shown', async ({ page }) => {
    const sliderLabelPrimary = page.getByText('Primary');
    const sliderLabelSecondary = page.getByText('Secondary');

    await expect(sliderLabelPrimary).toBeVisible();
    await expect(sliderLabelSecondary).toBeVisible();
  });
});
