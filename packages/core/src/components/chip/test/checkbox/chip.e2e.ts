import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../utils/testConfiguration';

const componentTestPath = 'src/components/chip/test/checkbox/index.html';
const componentName = 'tds-chip';
const testDescription = 'tds-chip-checkbox';

testConfigurations.basic.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
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

test.describe.parallel(componentName, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('expect chips to be of the role checkbox', async ({ page }) => {
    const chipRole = page.getByRole('checkbox');
    await expect(chipRole).toHaveCount(3);
  });

  test('Check so that height is correct to lg/default measurements', async ({ page }) => {
    const chip1 = page.locator('tds-chip label').filter({ hasText: `Label 1` });
    const chipHeight1 = await chip1.evaluate((style) => getComputedStyle(style).height);
    expect(chipHeight1).toBe('32px');

    const chip2 = page.locator('tds-chip label').filter({ hasText: `Label 2` });
    const chipHeight2 = await chip2.evaluate((style) => getComputedStyle(style).height);
    expect(chipHeight2).toBe('32px');

    const chip3 = page.locator('tds-chip label').filter({ hasText: `Label 3` });
    const chipHeight3 = await chip3.evaluate((style) => getComputedStyle(style).height);
    expect(chipHeight3).toBe('32px');
  });

  test('Chip 1 is clickable', async ({ page }) => {
    const chip = page.locator('tds-chip label').filter({ hasText: `Label 1` });
    chip.hover();
    const chipCursorStyle = await chip.evaluate((style) => getComputedStyle(style).cursor);
    expect(chipCursorStyle).toBe('pointer');

    const myEventSpy = await page.spyOnEvent('click');
    await chip.click();
    expect(myEventSpy).toHaveReceivedEvent();
  });

  test('Chip 2 is clickable', async ({ page }) => {
    const chip = page.locator('tds-chip label').filter({ hasText: `Label 2` });
    chip.hover();
    const chipCursorStyle = await chip.evaluate((style) => getComputedStyle(style).cursor);
    expect(chipCursorStyle).toBe('pointer');

    const myEventSpy = await page.spyOnEvent('click');
    await chip.click();
    expect(myEventSpy).toHaveReceivedEvent();
  });

  test('Chip 3 is clickable', async ({ page }) => {
    const chip = page.locator('tds-chip label').filter({ hasText: `Label 3` });
    chip.hover();
    const chipCursorStyle = await chip.evaluate((style) => getComputedStyle(style).cursor);
    expect(chipCursorStyle).toBe('pointer');

    const myEventSpy = await page.spyOnEvent('click');
    await chip.click();
    expect(myEventSpy).toHaveReceivedEvent();
  });

  test('1st chip is checked', async ({ page }) => {
    const checkedLabel1Chip = page.locator('input[id="option-1"]');
    const isChecked = await checkedLabel1Chip.evaluate((node: HTMLInputElement) => node.checked);
    expect(isChecked).toBeTruthy();
  });

  test('Clicking "Label 2" chip changes checked state appropriately', async ({ page }) => {
    const labelText2 = page.locator('text=Label 2');
    await labelText2.click();
    const chip1 = page.locator('input[id="option-1"]');
    const chip2 = page.locator('input[id="option-2"]');
    const chip3 = page.locator('input[id="option-3"]');

    // "Label 1" is checked
    const chip1checkedStatus = await chip1.evaluate((node: HTMLInputElement) => node.checked);
    expect(chip1checkedStatus).toBeTruthy();

    // "Label 2" becomes checked
    const chip2checkedStatus = await chip2.evaluate((node: HTMLInputElement) => node.checked);
    expect(chip2checkedStatus).toBeTruthy();

    // "Label 3" becomes unchecked
    const chip3checkedStatus = await chip3.evaluate((node: HTMLInputElement) => node.checked);
    expect(chip3checkedStatus).toBeFalsy();
  });

  test('Clicking "Label 2" and "Label 3" chips changes checked state appropriately', async ({
    page,
  }) => {
    const labelText2 = page.locator('text=Label 2');
    await labelText2.click();
    const labelText3 = page.locator('text=Label 3');
    await labelText3.click();
    const chip1 = page.locator('input[id="option-1"]');
    const chip2 = page.locator('input[id="option-2"]');
    const chip3 = page.locator('input[id="option-3"]');

    // "Label 1" is checked
    const chip1checkedStatus = await chip1.evaluate((node: HTMLInputElement) => node.checked);
    expect(chip1checkedStatus).toBeTruthy();

    // "Label 2" becomes checked
    const chip2checkedStatus = await chip2.evaluate((node: HTMLInputElement) => node.checked);
    expect(chip2checkedStatus).toBeTruthy();

    // "Label 3" becomes checked
    const chip3checkedStatus = await chip3.evaluate((node: HTMLInputElement) => node.checked);
    expect(chip3checkedStatus).toBeTruthy();
  });

  test('Clicking "Label 1", "Label 2" and "Label 3" chips changes checked state appropriately', async ({
    page,
  }) => {
    const labelText1 = page.locator('text=Label 1');
    await labelText1.click();
    const labelText2 = page.locator('text=Label 2');
    await labelText2.click();
    const labelText3 = page.locator('text=Label 3');
    await labelText3.click();
    const chip1 = page.locator('input[id="option-1"]');
    const chip2 = page.locator('input[id="option-2"]');
    const chip3 = page.locator('input[id="option-3"]');

    // "Label 1" becomes unchecked
    const chip1checkedStatus = await chip1.evaluate((node: HTMLInputElement) => node.checked);
    expect(chip1checkedStatus).toBeFalsy();

    // "Label 2" becomes checked
    const chip2checkedStatus = await chip2.evaluate((node: HTMLInputElement) => node.checked);
    expect(chip2checkedStatus).toBeTruthy();

    // "Label 3" becomes checked
    const chip3checkedStatus = await chip3.evaluate((node: HTMLInputElement) => node.checked);
    expect(chip3checkedStatus).toBeTruthy();
  });
});
