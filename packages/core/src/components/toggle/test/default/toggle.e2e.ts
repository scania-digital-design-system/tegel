import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../utils/testConfiguration';

const componentTestPath = 'src/components/toggle/test/default/index.html';
const componentName = 'tds-toggle';

testConfigurations.basic.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, componentName), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('Renders basic toggle correctly', async ({ page }) => {
      const labelElement = page.locator('tds-toggle label');
      const headlineElement = page.locator('tds-toggle .toggle-headline'); // Target label underneath toggle

      expect(labelElement).toHaveText('Label'); // Check label text
      expect(headlineElement).toHaveText('switch me');

      /* Check diff on screenshot */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });

    test('Renders pressed state correctly(unchecked)', async ({ page }) => {
      const toggle = page.locator('tds-toggle input');

      // Ensure initial state
      let isChecked = await toggle.evaluate((element: HTMLInputElement) => element.checked);
      expect(isChecked).toBe(false);

      // Simulate press (mouse down) to trigger pressed/active state
      const toggleBox = await toggle.boundingBox();
      if (!toggleBox) {
        throw new Error('Toggle bounding box not found');
      }

      await page.mouse.move(toggleBox.x + toggleBox.width / 2, toggleBox.y + toggleBox.height / 2);
      await page.mouse.down();

      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });

    test('Renders pressed state correctly(checked)', async ({ page }) => {
      const toggle = page.locator('tds-toggle input');

      // Click the toggle input to check it
      await toggle.click();
      let isChecked = await toggle.evaluate((element: HTMLInputElement) => element.checked);
      expect(isChecked).toBe(true);

      // Simulate press (mouse down) to trigger pressed/active state
      const toggleBox = await toggle.boundingBox();
      if (!toggleBox) {
        throw new Error('Toggle bounding box not found');
      }

      await page.mouse.move(toggleBox.x + toggleBox.width / 2, toggleBox.y + toggleBox.height / 2);
      await page.mouse.down();

      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });

    test('Click on toggle -> should become checked', async ({ page }) => {
      const toggle = page.locator('tds-toggle input');

      // Expect not to be checked on render
      let isChecked = await toggle.evaluate((element: HTMLInputElement) => element.checked);
      expect(isChecked).toBe(false);

      // Click the toggle input
      await toggle.click();

      // Expect toggle input to be checked after click
      isChecked = await toggle.evaluate((element: HTMLInputElement) => element.checked);
      expect(isChecked).toBe(true);

      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });
  });
});
