import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

test.describe('tds-button', () => {
  test('renders basic button correctly', async ({ page }) => {
    await page.goto('src/components/button/test/basic/index.html');
    const button = page.locator('tds-button');
    await expect(button).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('component receives click event', async ({ page }) => {
    await page.goto('src/components/button/test/basic/index.html');
    const button = page.locator('tds-button');
    const myEventSpy = await page.spyOnEvent('click');
    await button.click();
    expect(myEventSpy).toHaveReceivedEvent();
  });
});
