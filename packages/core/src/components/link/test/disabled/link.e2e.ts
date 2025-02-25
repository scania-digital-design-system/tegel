import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../utils/testConfiguration';

const componentTestPath = 'src/components/link/test/disabled/index.html';
const componentName = 'tds-link';
const testDescription = 'tds-link-disabled';

testConfigurations.basic.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('disabled link is rendered correctly', async ({ page }) => {
      const tdsLink = page.getByTestId('tds-link-testid');
      await expect(tdsLink).toHaveCount(1);
      /* Check diff on screenshot */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });
  });
});

test.describe.parallel(componentName, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('text shows on page', async ({ page }) => {
    const pageText = page.getByText(
      'The Tegel Design System is for digital products and services at Scania. It enables an efficient' +
        "    development process and ensures a premium experience across all of Scania's digital touchpoints.",
      { exact: true },
    );
    await expect(pageText).toHaveCount(1);
    await expect(pageText).toBeVisible();
  });

  test('link is underlined', async ({ page }) => {
    const tdsLink = page.getByText('Tegel', { exact: true });
    const linkUnderlineState = await tdsLink.evaluate(
      (style) => getComputedStyle(style).textDecorationLine,
    );
    expect(linkUnderlineState).toBe('underline');
  });

  test('component is disabled', async ({ page }) => {
    const tdsLink = page.getByText('Tegel', { exact: true });
    const linkUnderlineState = await tdsLink.evaluate(
      (style) => getComputedStyle(style).pointerEvents,
    );
    expect(linkUnderlineState).toBe('none');

    /* click on a link does not change URL */
    await page.locator('tds-link').click();
    await expect(page).toHaveURL(/.*localhost/);
  });
});
