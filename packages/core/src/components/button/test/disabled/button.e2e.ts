import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentName = 'disabled';

test.describe('tds-button', () => {
  test('renders disabled button correctly', async ({ page }) => {
    await page.goto(`src/components/button/test/${componentName}/index.html`);
    const button = page.locator('tds-button');
    await expect(button).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('that the component is disabled', async ({ page }) => {
    await page.goto(`src/components/button/test/${componentName}/index.html`);
    const button = page.locator('tds-button');
    await expect(button).toHaveAttribute('disabled', '');
    const myEventSpy = await page.spyOnEvent('click');
    await button.click();
    expect(myEventSpy).not.toHaveReceivedEvent();
  });

  test('Button color is aligned to disabled state', async ({ page }) => {
    await page.goto(`src/components/button/test/${componentName}/index.html`);
    const button = page.locator('tds-button');
    const innerButton = button.locator('button');
    const buttonBackgroundColor = await innerButton.evaluate(
      (button2) => getComputedStyle(button2).backgroundColor,
    );
    expect(buttonBackgroundColor).toBe('rgb(249, 250, 251)');
  });

  test('Text is displayed, style is aligned to disabled state', async ({ page }) => {
    await page.goto(`src/components/button/test/${componentName}/index.html`);
    const button = page.locator('tds-button');
    const textAttribute = await button.textContent();
    await expect(button).toHaveCSS('color', 'rgb(13, 15, 19)');
    expect(textAttribute).toBe('Button');
  });

  test('the cursor should be not-allowed', async ({ page }) => {
    await page.goto(`src/components/button/test/${componentName}/index.html`);
    const button = page.locator('tds-button');
    const innerButton = button.locator('button');
    const buttonCursorState = await innerButton.evaluate(
      (button2) => getComputedStyle(button2).cursor,
    );
    expect(buttonCursorState).toBe('not-allowed');
  });
});
