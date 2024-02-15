import { expect } from '@playwright/test';
import { test } from 'stencil-playwright';

test.describe('Radio button - disabled state', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('src/components/radio-button/test/disabled/index.html');
  });

  test('Radio buttons with Label text = "Label text 1" and "Label text 2" renders on the page', async ({
    page,
  }) => {
    const radioButton1 = page.locator('tds-radio-button', { hasText: 'Label text 1' });
    const radioButton2 = page.locator('tds-radio-button', { hasText: 'Label text 2' });
    await expect(radioButton1).toBeVisible();
    await expect(radioButton2).toBeVisible();
    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0 });
  });

  test('1st radio button is disabled', async ({ page }) => {
    const disabledLabel1RadioButton = page.locator('input[id="option-1"]:disabled');
    await expect(disabledLabel1RadioButton).toHaveCount(1);
  });

  test('1st radio button is checked', async ({ page }) => {
    const checkedLabel1RadioButton = page.locator('input[id="option-1"]');
    const isChecked = await checkedLabel1RadioButton.evaluate(
      (node: HTMLInputElement) => node.checked,
    );
    expect(isChecked).toBeTruthy();
  });

  test('Hover cursor over Label text 1 radio button -> cursor should NOT be able to click on it', async ({
    page,
  }) => {
    const inputElement = page.locator('input[id="option-1"]');
    await inputElement.hover();
    await expect(inputElement).toHaveCSS('cursor', 'not-allowed');

    const labelElement = page.locator('text=Label text 1');
    await labelElement.hover();
    await expect(labelElement).toHaveCSS('cursor', 'not-allowed');
  });

  test('Hover cursor over Label text 2 radio button -> cursor should NOT be able to click on it', async ({
    page,
  }) => {
    const inputElement = page.locator('input[id="option-2"]');
    await inputElement.hover();
    await expect(inputElement).toHaveCSS('cursor', 'not-allowed');

    const labelElement = page.locator('text=Label text 2');
    await labelElement.hover();
    await expect(labelElement).toHaveCSS('cursor', 'not-allowed');
  });
});
