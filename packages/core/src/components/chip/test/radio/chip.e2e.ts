import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

test.describe('tds-chip', () => {
  test('renders chip type radio correctly', async ({ page }) => {
    await page.goto(`src/components/chip/test/radio/index.html`);
    const chip = page.locator('tds-chip[type="radio"]');
    await expect(chip).toHaveScreenshot({ maxDiffPixels: 0 });
  });
  // Test for radio type chip
  test('emits tdsChange event on click for radio type', async ({ page }) => {
    await page.goto('src/components/chip/test/radio/index.html');
    const chip = page.locator('tds-chip[type="radio"]');
    const myEventSpy = await page.spyOnEvent('tdsChange');

    await chip.click();
    expect(myEventSpy).toHaveReceivedEvent();
  });
});
