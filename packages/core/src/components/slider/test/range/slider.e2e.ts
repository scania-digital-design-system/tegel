import { test } from '@stencil/playwright';
import { expect, type Page } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../utils/testConfiguration';

const componentTestPath = 'src/components/slider/test/range/index.html';
const componentName = 'tds-slider';
const testDescription = 'tds-slider-range';
const snapEdgeCases = [
  {
    label: 'Both thumbs left of shared tick',
    inputLeft: '41',
    inputRight: '47',
    inputLeftExpected: '25',
    inputRightExpected: '50',
    dragLeft: 0.25,
    dragRight: 0.75,
    dragLeftExpected: '25',
    dragRightExpected: '75',
    keyLeft: 'ArrowLeft',
    keyLeftExpected: '25',
    keyRight: 'ArrowRight',
    keyRightExpected: '50',
    clickFill: 0.435,
    clickFillExpected: '25',
  },
  {
    label: 'Thumbs straddling shared tick',
    inputLeft: '49',
    inputRight: '51',
    inputLeftExpected: '50',
    inputRightExpected: '50',
    dragLeft: 0.5,
    dragRight: 0.5,
    dragLeftExpected: '50',
    dragRightExpected: '50',
    keyLeft: 'ArrowRight',
    keyLeftExpected: '50',
    keyRight: 'ArrowLeft',
    keyRightExpected: '50',
    clickFill: 0.5,
    clickFillExpected: '50',
  },
  {
    label: 'Both thumbs right of shared tick',
    inputLeft: '56',
    inputRight: '59',
    inputLeftExpected: '50',
    inputRightExpected: '50',
    dragLeft: 0.5,
    dragRight: 0.75,
    dragLeftExpected: '50',
    dragRightExpected: '75',
    keyLeft: 'ArrowLeft',
    keyLeftExpected: '50',
    keyRight: 'ArrowRight',
    keyRightExpected: '75',
    clickFill: 0.565,
    clickFillExpected: '50',
  },
];

async function dragThumb(page: Page, thumbIndex: number, position: number, label: string) {
  const slider = page.getByLabel(label);
  const track = slider.locator('.tds-slider__track');
  const thumb = slider.locator('.tds-slider__thumb').nth(thumbIndex);
  const trackBox = await track.boundingBox();
  const thumbBox = await thumb.locator('.tds-slider__thumb-inner').boundingBox();

  if (!trackBox || !thumbBox) {
    throw new Error('Could not find the range slider track and thumb');
  }

  await page.mouse.move(thumbBox.x + thumbBox.width / 3, thumbBox.y + thumbBox.height / 3);
  await page.mouse.down();
  await page.mouse.move(trackBox.x + trackBox.width * position, trackBox.y + trackBox.height / 2);
  await page.mouse.up();
}

testConfigurations.basicWithBrandVariants.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('renders range slider correctly', async ({ page }) => {
      const slider = page.locator('tds-slider');
      await expect(slider).toHaveCount(5);

      /* Check diff on screenshot */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });
  });
});

test.describe.parallel(componentName, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('first slider starts with the configured left and right values', async ({ page }) => {
    const thumbs = page.getByLabel('First').locator('.tds-slider__thumb');

    await expect(thumbs).toHaveCount(2);
    await expect(thumbs.nth(0)).toHaveAttribute('aria-valuenow', '25');
    await expect(thumbs.nth(1)).toHaveAttribute('aria-valuenow', '75');
    await expect(thumbs.nth(0).locator('.tds-slider__value')).toHaveText('25');
    await expect(thumbs.nth(0).locator('.tds-slider__value')).toBeVisible();
    await expect(thumbs.nth(1).locator('.tds-slider__value')).toHaveText('75');
    await expect(thumbs.nth(1).locator('.tds-slider__value')).toBeVisible();
  });

  test('mouse drag changes the left thumb value in first slider', async ({ page }) => {
    const thumbs = page.getByLabel('First').locator('.tds-slider__thumb');

    await dragThumb(page, 0, 0.4, 'First');

    const leftValue = Number(await thumbs.nth(0).getAttribute('aria-valuenow'));
    expect(leftValue).toBeGreaterThan(25);
    expect(leftValue).toBeLessThan(75);
    await expect(thumbs.nth(1)).toHaveAttribute('aria-valuenow', '75');
  });

  test('mouse drag changes the right thumb value in first slider', async ({ page }) => {
    const thumbs = page.getByLabel('First').locator('.tds-slider__thumb');

    await dragThumb(page, 1, 0.9, 'First');

    const rightValue = Number(await thumbs.nth(1).getAttribute('aria-valuenow'));
    expect(rightValue).toBeGreaterThan(75);
    expect(rightValue).toBeLessThanOrEqual(100);
    await expect(thumbs.nth(0)).toHaveAttribute('aria-valuenow', '25');
  });

  test('mouse dragging the thumbs to the track edges sets the minimum and maximum in the first slider', async ({
    page,
  }) => {
    const thumbs = page.getByLabel('First').locator('.tds-slider__thumb');

    await dragThumb(page, 0, 0, 'First');
    await expect(thumbs.nth(0)).toHaveAttribute('aria-valuenow', '0');

    await dragThumb(page, 1, 1, 'First');
    await expect(thumbs.nth(1)).toHaveAttribute('aria-valuenow', '100');
  });

  test('left thumb cannot be dragged past the right thumb', async ({ page }) => {
    const thumbs = page.getByLabel('First').locator('.tds-slider__thumb');

    await dragThumb(page, 0, 0.95, 'First');

    await expect(thumbs.nth(0)).toHaveAttribute('aria-valuenow', '75');
    await expect(thumbs.nth(1)).toHaveAttribute('aria-valuenow', '75');
  });

  test('right thumb cannot be dragged past the left thumb', async ({ page }) => {
    const thumbs = page.getByLabel('First').locator('.tds-slider__thumb');

    await dragThumb(page, 1, 0.05, 'First');

    await expect(thumbs.nth(0)).toHaveAttribute('aria-valuenow', '25');
    await expect(thumbs.nth(1)).toHaveAttribute('aria-valuenow', '25');
  });

  test('Arrow keys change the left thumb by the configured step', async ({ page }) => {
    const leftThumb = page.getByLabel('First').locator('.tds-slider__thumb').nth(0);

    await leftThumb.focus();
    await leftThumb.press('ArrowRight');
    await expect(leftThumb).toHaveAttribute('aria-valuenow', '30');
    await leftThumb.press('ArrowLeft');
    await expect(leftThumb).toHaveAttribute('aria-valuenow', '25');
  });

  test('Arrow keys change the right thumb by the configured step', async ({ page }) => {
    const rightThumb = page.getByLabel('First').locator('.tds-slider__thumb').nth(1);

    await rightThumb.focus();
    await rightThumb.press('ArrowLeft');
    await expect(rightThumb).toHaveAttribute('aria-valuenow', '70');
    await rightThumb.press('ArrowRight');
    await expect(rightThumb).toHaveAttribute('aria-valuenow', '75');
  });

  test('keyboard input keeps the left thumb within the range bounds', async ({ page }) => {
    const thumbs = page.getByLabel('First').locator('.tds-slider__thumb');

    await thumbs.nth(0).focus();
    for (let i = 0; i < 20; i += 1) {
      await thumbs.nth(0).press('ArrowLeft');
    }
    await expect(thumbs.nth(0)).toHaveAttribute('aria-valuenow', '0');

    for (let i = 0; i < 20; i += 1) {
      await thumbs.nth(0).press('ArrowRight');
    }
    await expect(thumbs.nth(0)).toHaveAttribute('aria-valuenow', '75');
  });

  test('keyboard input keeps the right thumb within the range bounds', async ({ page }) => {
    const thumbs = page.getByLabel('First').locator('.tds-slider__thumb');

    await thumbs.nth(1).focus();
    for (let i = 0; i < 20; i += 1) {
      await thumbs.nth(1).press('ArrowRight');
    }
    await expect(thumbs.nth(1)).toHaveAttribute('aria-valuenow', '100');

    for (let i = 0; i < 20; i += 1) {
      await thumbs.nth(1).press('ArrowLeft');
    }
    await expect(thumbs.nth(1)).toHaveAttribute('aria-valuenow', '25');
  });

  test('Home and End keys move the range thumbs to their outer bounds', async ({ page }) => {
    const thumbs = page.getByLabel('First').locator('.tds-slider__thumb');

    await thumbs.nth(0).focus();
    await thumbs.nth(0).press('Home');
    await expect(thumbs.nth(0)).toHaveAttribute('aria-valuenow', '0');

    await thumbs.nth(1).focus();
    await thumbs.nth(1).press('End');
    await expect(thumbs.nth(1)).toHaveAttribute('aria-valuenow', '100');
  });

  test('clicking outside the fill moves the thumb on that side', async ({ page }) => {
    const slider = page.getByLabel('First');
    const track = slider.locator('.tds-slider__track');
    const trackBox = await track.boundingBox();
    const thumbs = slider.locator('.tds-slider__thumb');

    if (!trackBox) {
      throw new Error('Could not find the range slider track');
    }

    await page.mouse.click(trackBox.x + trackBox.width * 0.1, trackBox.y + trackBox.height / 2);
    await expect(thumbs.nth(0)).toHaveAttribute('aria-valuenow', '10');
    await expect(thumbs.nth(1)).toHaveAttribute('aria-valuenow', '75');

    await page.mouse.click(trackBox.x + trackBox.width * 0.9, trackBox.y + trackBox.height / 2);
    await expect(thumbs.nth(1)).toHaveAttribute('aria-valuenow', '90');
  });

  test('clicking inside the track fill moves the left thumb', async ({ page }) => {
    const slider = page.getByLabel('First');
    const track = slider.locator('.tds-slider__track');
    const trackBox = await track.boundingBox();
    const thumbs = slider.locator('.tds-slider__thumb');

    if (!trackBox) {
      throw new Error('Could not find the range slider track');
    }

    await page.mouse.click(trackBox.x + trackBox.width * 0.5, trackBox.y + trackBox.height / 2);
    await expect(thumbs.nth(0)).toHaveAttribute('aria-valuenow', '50');
    await expect(thumbs.nth(1)).toHaveAttribute('aria-valuenow', '75');
  });

  test('snap keeps mouse and keyboard thumb values on tick marks', async ({ page }) => {
    const snappedSlider = page.getByLabel('Second');
    const thumbs = snappedSlider.locator('.tds-slider__thumb');

    await dragThumb(page, 0, 0.4, 'Second');
    await expect(thumbs.nth(0)).toHaveAttribute('aria-valuenow', '50');

    await thumbs.nth(1).focus();
    await thumbs.nth(1).press('ArrowLeft');
    await expect(thumbs.nth(1)).toHaveAttribute('aria-valuenow', '75');
  });

  test('range input fields are visible, enabled, and update their thumb values', async ({
    page,
  }) => {
    const inputSlider = page.getByLabel('Second');
    const leftInput = inputSlider.locator('tds-text-field[name="left-value-input"]');
    const rightInput = inputSlider.locator('tds-text-field[name="right-value-input"]');
    const thumbs = inputSlider.locator('.tds-slider__thumb');

    await expect(leftInput).toBeVisible();
    await expect(rightInput).toBeVisible();
    await expect(leftInput.locator('input')).toBeEnabled();
    await expect(rightInput.locator('input')).toBeEnabled();

    await leftInput.locator('input').fill('30');
    await leftInput.locator('input').blur();
    await expect(thumbs.nth(0)).toHaveAttribute('aria-valuenow', '25');

    await rightInput.locator('input').fill('70');
    await rightInput.locator('input').blur();
    await expect(thumbs.nth(1)).toHaveAttribute('aria-valuenow', '75');
  });

  test(`track clicks update the appropriate thumb on ticks`, async ({ page }) => {
    const slider = page.getByLabel('Second');
    const track = slider.locator('.tds-slider__track');
    const trackBox = await track.boundingBox();
    const thumbs = slider.locator('.tds-slider__thumb');

    if (!trackBox) {
      throw new Error('Could not find the track for Second');
    }

    await page.mouse.click(trackBox.x + trackBox.width * 0.5, trackBox.y + trackBox.height / 2);
    await expect(thumbs.nth(0)).toHaveAttribute('aria-valuenow', '50');

    await page.mouse.click(trackBox.x + trackBox.width * 0.1, trackBox.y + trackBox.height / 2);
    await expect(thumbs.nth(0)).toHaveAttribute('aria-valuenow', '0');

    await page.mouse.click(trackBox.x + trackBox.width * 0.9, trackBox.y + trackBox.height / 2);
    await expect(thumbs.nth(1)).toHaveAttribute('aria-valuenow', '100');
  });

  snapEdgeCases.forEach((scenario) => {
    test(`${scenario.label}: direct input does not accept non-tick values`, async ({ page }) => {
      const slider = page.getByLabel(scenario.label);
      const leftInput = slider.locator('tds-text-field[name="left-value-input"] input');
      const rightInput = slider.locator('tds-text-field[name="right-value-input"] input');
      const thumbs = slider.locator('.tds-slider__thumb');

      await expect(leftInput).toBeVisible();
      await expect(rightInput).toBeVisible();
      await leftInput.fill(scenario.inputLeft);
      await leftInput.blur();
      await expect(thumbs.nth(0)).toHaveAttribute('aria-valuenow', scenario.inputLeftExpected);

      await rightInput.fill(scenario.inputRight);
      await rightInput.blur();
      await expect(thumbs.nth(1)).toHaveAttribute('aria-valuenow', scenario.inputRightExpected);
    });

    test(`${scenario.label}: dragging snaps both thumbs to valid ticks`, async ({ page }) => {
      const slider = page.getByLabel(scenario.label);
      const thumbs = slider.locator('.tds-slider__thumb');

      await dragThumb(page, 0, scenario.dragLeft, scenario.label);
      await expect(thumbs.nth(0)).toHaveAttribute('aria-valuenow', scenario.dragLeftExpected);
      await dragThumb(page, 1, scenario.dragRight, scenario.label);
      await expect(thumbs.nth(1)).toHaveAttribute('aria-valuenow', scenario.dragRightExpected);
    });

    test(`${scenario.label}: keyboard movement snaps both thumbs to valid ticks`, async ({
      page,
    }) => {
      const slider = page.getByLabel(scenario.label);
      const thumbs = slider.locator('.tds-slider__thumb');

      await thumbs.nth(0).focus();
      await thumbs.nth(0).press(scenario.keyLeft);
      await expect(thumbs.nth(0)).toHaveAttribute('aria-valuenow', scenario.keyLeftExpected);
      await expect(thumbs.nth(0).locator('.tds-slider__value')).toBeVisible();

      await thumbs.nth(1).focus();
      await thumbs.nth(1).press(scenario.keyRight);
      await expect(thumbs.nth(1)).toHaveAttribute('aria-valuenow', scenario.keyRightExpected);
      await expect(thumbs.nth(1).locator('.tds-slider__value')).toBeVisible();
    });
  });
});
