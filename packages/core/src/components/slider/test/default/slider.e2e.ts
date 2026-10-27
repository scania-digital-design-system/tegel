import { test } from '@stencil/playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../utils/testConfiguration';

const componentTestPath = 'src/components/slider/test/default/index.html';
const componentName = 'tds-slider';
const testDescription = 'tds-slider-default';

testConfigurations.basicWithBrandVariants.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('renders default slider correctly', async ({ page }) => {
      const slider = page.locator('tds-slider');
      await expect(slider).toHaveCount(2);

      /* Check diff on screenshot */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });
  });
});

test.describe.parallel(componentName, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('value is set to 50', async ({ page }) => {
    const sliderValue = page.getByLabel('First slider').locator('.tds-slider__value');
    await expect(sliderValue).toHaveText('50');
  });

  test('min value is set to 0', async ({ page }) => {
    /* Find thumb and pull it towards a left and check if min value is 0 */
    const firstSliderSection = page.getByLabel('First slider');
    await firstSliderSection.locator('.tds-slider__thumb-inner').hover();
    await page.mouse.down();
    await page.mouse.move(0, 0);
    await page.mouse.up();

    /* Compare value with initial one */
    const thumbValue = firstSliderSection.locator('.tds-slider__value');
    await expect(thumbValue).toHaveText('0');
  });

  test('max value is set to 100', async ({ page }) => {
    /* Find thumb and pull it towards a right and check if min value is 0 */
    const firstSliderSection = page.getByLabel('First slider');
    await firstSliderSection.locator('.tds-slider__thumb-inner').hover();
    await page.mouse.down();
    await page.mouse.move(2000, 0);
    await page.mouse.up();

    /* Compare value with initial one */
    const thumbValue = firstSliderSection.locator('.tds-slider__value');
    await expect(thumbValue).toHaveText('100');
  });

  test('label is hidden', async ({ page }) => {
    const slider = page.getByLabel('First slider').locator('tds-slider');
    const sliderLabel = slider.locator('label');
    await expect(sliderLabel).toHaveText('');
  });

  test('slider is not read only or disabled', async ({ page }) => {
    /* Find thumb and pull it towards a left and check if value in thumb is changing */
    const firstSliderSection = page.getByLabel('First slider');

    await firstSliderSection.locator('.tds-slider__thumb-inner').hover();
    await page.mouse.down();
    await page.mouse.move(100, 0);
    await page.mouse.up();

    /* Compare value with initial one */
    const thumbValue = firstSliderSection.locator('.tds-slider__value');
    await expect(thumbValue).not.toHaveText('50');
  });

  test('thumb is size large', async ({ page }) => {
    const sliderThumb = page.getByLabel('First slider').locator('.tds-slider__thumb-inner');
    const sliderThumbWidth = await sliderThumb.evaluate((style) => getComputedStyle(style).width);
    const sliderThumbHeight = await sliderThumb.evaluate((style) => getComputedStyle(style).height);
    expect(sliderThumbWidth).toBe('20px');
    expect(sliderThumbHeight).toBe('20px');
  });

  test('controls on second slider change the value', async ({ page }) => {
    const secondSliderSection = page.getByLabel('Second slider');

    // At start, value is 40
    const thumbValue = secondSliderSection.locator('.tds-slider__value');
    await expect(thumbValue).toHaveText('40');

    // Use plus control to change value...
    const plusControl = secondSliderSection.locator('.tds-slider__control-plus');
    await expect(plusControl).toBeVisible();

    // Click plus control
    await plusControl.click();
    // Expect value to have increased
    await expect(thumbValue).toHaveText('41');

    // Use minus control to change value...
    const minusControl = secondSliderSection.locator('.tds-slider__control-minus');
    await expect(minusControl).toBeVisible();

    // Click minus control
    await minusControl.click();
    // Expect value to have decreased
    await expect(thumbValue).toHaveText('40');
  });
});
