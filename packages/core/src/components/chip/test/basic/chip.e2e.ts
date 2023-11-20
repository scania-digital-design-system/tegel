import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

test.describe('tds-chip', () => {
  test('renders a chip correctly', async ({ page }) => {
    await page.goto('src/components/chip/test/basic/index.html');
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('emits tdsClick event on click for button type', async ({ page }) => {
    await page.goto('src/components/chip/test/basic/index.html');
    const chip = page.locator('tds-chip[type="button"]');
    const myEventSpy = await page.spyOnEvent('tdsClick');

    await chip.click();
    expect(myEventSpy).toHaveReceivedEvent();
  });
});
