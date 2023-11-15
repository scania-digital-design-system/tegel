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

  test('Button color is aligned to disabled state', async ({ page }) => {
    await page.goto('src/components/button/test/disabled/index.html');
    const button = page.locator('tds-button');
    await expect(button).toHaveCSS(
      'background',
      'rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box',
    );
    await expect(button).toHaveCSS('border-color', 'rgb(13, 15, 19)');
  });

  test('Text is displayed, style is aligned to disabled state', async ({ page }) => {
    await page.goto('src/components/button/test/disabled/index.html');
    const button = page.locator('tds-button');
    const textAttribute = await button.textContent();
    await expect(button).toHaveCSS('color', 'rgb(13, 15, 19)');
    expect(textAttribute).toBe('Button');
  });
});
