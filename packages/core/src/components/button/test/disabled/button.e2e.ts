import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

test.describe('tds-button', () => {
  test('renders disabled button correctly', async ({ page }) => {
    await page.goto('src/components/button/test/disabled/index.html');
    const button = page.locator('tds-button');
    await expect(button).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('that the component is disabled', async ({ page }) => {
    await page.goto('src/components/button/test/disabled/index.html');
    const button = page.locator('tds-button');
    await expect(button).toHaveAttribute('disabled', '');
    const myEventSpy = await page.spyOnEvent('click');
    await button.click();
    expect(myEventSpy).not.toHaveReceivedEvent();
  });
});
