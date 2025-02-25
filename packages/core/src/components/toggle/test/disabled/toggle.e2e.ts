import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../utils/testConfiguration';

const componentTestPath = 'src/components/toggle/test/disabled/index.html';
const componentName = 'tds-toggle';

testConfigurations.basic.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, componentName), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('Should have disabled attribute', async ({ page }) => {
      const toggle = page.locator('tds-toggle input');

      const disabled = await toggle.evaluate((element: HTMLInputElement) => element.disabled);
      expect(disabled).toBe(true);

      /* Check diff on screenshot */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });
  });
});

test.describe.parallel(componentName, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('Hover over toggle -> should have inactive cursor', async ({ page }) => {
    const label = page.locator('tds-toggle label');
    const headline = page.locator('tds-toggle .toggle-headline');
    const input = page.locator('tds-toggle input');

    // Label should have a not-allowed cursor
    await label.hover();
    const labelCursorStyle = await label.evaluate((style) => getComputedStyle(style).cursor);
    expect(labelCursorStyle).toBe('not-allowed');

    // Headline should have a not-allowed cursor
    await headline.hover();
    const headlineCursorStyle = await headline.evaluate((style) => getComputedStyle(style).cursor);
    expect(headlineCursorStyle).toBe('not-allowed');

    // Input should have a not-allowed cursor
    await input.hover();
    const inputCursorStyle = await input.evaluate((style) => getComputedStyle(style).cursor);
    expect(inputCursorStyle).toBe('not-allowed');
  });
});
