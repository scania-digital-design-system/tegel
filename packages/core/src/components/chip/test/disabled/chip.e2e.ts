import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../utils/testConfiguration';

const componentTestPath = 'src/components/chip/test/disabled/index.html';
const componentName = 'tds-chip';

testConfigurations.basic.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, 'tds-chip-checkbox'), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('renders checkbox chips correctly', async ({ page }) => {
      const chip1 = page.getByText('Label 1', { exact: true });
      await expect(chip1).toHaveCount(1);

      const chip2 = page.getByText('Label 2', { exact: true });
      await expect(chip2).toHaveCount(1);

      const chip3 = page.getByText('Label 3', { exact: true });
      await expect(chip3).toHaveCount(1);

      /* Check diff on screenshot */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });
  });
});

testConfigurations.basic.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, 'tds-chip-radio'), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('renders radio chips correctly', async ({ page }) => {
      const chip1 = page.getByText('Label 1 for radio', { exact: true });
      await expect(chip1).toHaveCount(1);

      const chip2 = page.getByText('Label 2 for radio', { exact: true });
      await expect(chip2).toHaveCount(1);

      const chip3 = page.getByText('Label 3 for radio', { exact: true });
      await expect(chip3).toHaveCount(1);

      /* Check diff on screenshot */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });
  });
});

testConfigurations.basic.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, 'tds-chip-button'), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('renders button chips correctly', async ({ page }) => {
      const chip1 = page.getByText('Label 1 for button', { exact: true });
      await expect(chip1).toHaveCount(1);

      const chip2 = page.getByText('Label 2 for button', { exact: true });
      await expect(chip2).toHaveCount(1);

      const chip3 = page.getByText('Label 3 for button', { exact: true });
      await expect(chip3).toHaveCount(1);

      /* Check diff on screenshot */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });
  });
});

test.describe.parallel('tds-chip-checkbox', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('Chip 1 is disabled and not clickable', async ({ page }) => {
    const chip1 = page.locator('tds-chip[chip-id="option-1"]');

    const isDisabled = await chip1.evaluate((el) => el.hasAttribute('disabled'));
    expect(isDisabled).toBe(true);

    const chipInput = chip1.locator('input');
    // Verify the input has 'pointer-events: none'
    const chipCursorStyle = await chipInput.evaluate((el) =>
      getComputedStyle(el).getPropertyValue('pointer-events'),
    );
    expect(chipCursorStyle).toBe('none');
  });

  test('Chip 2 is clickable', async ({ page }) => {
    const checkboxLabel2 = page.locator('tds-chip[type="checkbox"] >> text=Label 2');
    checkboxLabel2.hover();
    const chipCursorStyle = await checkboxLabel2.evaluate(
      (style) => getComputedStyle(style).cursor,
    );
    expect(chipCursorStyle).toBe('pointer');

    const myEventSpy = await page.spyOnEvent('click');
    await checkboxLabel2.click();
    expect(myEventSpy).toHaveReceivedEvent();
  });

  test('Chip 3 is clickable', async ({ page }) => {
    const checkboxLabel3 = page.locator('tds-chip[type="checkbox"] >> text=Label 2');
    checkboxLabel3.hover();
    const chipCursorStyle = await checkboxLabel3.evaluate(
      (style) => getComputedStyle(style).cursor,
    );
    expect(chipCursorStyle).toBe('pointer');

    const myEventSpy = await page.spyOnEvent('click');
    await checkboxLabel3.click();
    expect(myEventSpy).toHaveReceivedEvent();
  });
});

test.describe.parallel('tds-chip-radio', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('Radio Chip 1 is disabled and not clickable', async ({ page }) => {
    const radioChip1 = page.locator('tds-chip[chip-id="radio-option-1"]');

    const isDisabled = await radioChip1.evaluate((el) => el.hasAttribute('disabled'));
    expect(isDisabled).toBe(true);

    const chipInput = radioChip1.locator('input');
    // Verify the input has 'pointer-events: none'
    const chipCursorStyle = await chipInput.evaluate((el) =>
      getComputedStyle(el).getPropertyValue('pointer-events'),
    );
    expect(chipCursorStyle).toBe('none');
  });
});

test.describe.parallel('tds-chip-button', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('Button Chip 1 is disabled and not clickable', async ({ page }) => {
    const buttonChip1 = page.locator('tds-chip[chip-id="button-option-1"]');

    const isDisabled = await buttonChip1.evaluate((el) => el.hasAttribute('disabled'));
    expect(isDisabled).toBe(true);

    const chipInput = buttonChip1.locator('input');
    // Verify the input has 'pointer-events: none'
    const chipCursorStyle = await chipInput.evaluate((el) =>
      getComputedStyle(el).getPropertyValue('pointer-events'),
    );
    expect(chipCursorStyle).toBe('none');
  });
});
