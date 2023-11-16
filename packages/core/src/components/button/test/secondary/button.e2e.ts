import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

test.describe('tds-button', () => {
  test('renders secondary button correctly', async ({ page }) => {
    await page.goto('src/components/button/test/secondary/index.html');
    const button = page.locator('tds-button');
    await expect(button).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('component receives click event', async ({ page }) => {
    await page.goto('src/components/button/test/secondary/index.html');
    const button = page.locator('tds-button');
    const myEventSpy = await page.spyOnEvent('click');
    await button.click();
    expect(myEventSpy).toHaveReceivedEvent();
  });

  test('component should have correct background color on hovering', async ({ page }) => {
    await page.goto('src/components/button/test/secondary/index.html');
    const button = page.locator('tds-button');
    const innerButton = button.locator('button');
    await innerButton.hover();
    const buttonBackgroundColor = await innerButton.evaluate(
      (button2) => getComputedStyle(button2).backgroundColor,
    );
    expect(buttonBackgroundColor).toBe('rgb(32, 88, 168)');
  });

  test('component should have correct background color on pressed', async ({ page }) => {
    await page.goto('src/components/button/test/secondary/index.html');
    const button = page.locator('tds-button');
    const innerButton = button.locator('button');
    await innerButton.hover();
    await page.mouse.down({ button: 'left' });
    const buttonBackgroundColor = await innerButton.evaluate(
      (button2) => getComputedStyle(button2).backgroundColor,
    );
    expect(buttonBackgroundColor).toBe('rgba(0, 0, 0, 0)');
  });

  test('component should have correct border when active', async ({ page }) => {
    await page.goto('src/components/button/test/secondary/index.html');
    const button = page.locator('tds-button');
    const innerButton = button.locator('button');
    await innerButton.focus();
    const buttonBackgroundColor = await innerButton.evaluate(
      (button2) => getComputedStyle(button2).backgroundColor,
    );
    const buttonBorderColor = await innerButton.evaluate(
      (button2) => getComputedStyle(button2).borderColor,
    );
    const buttonOutlineColor = await innerButton.evaluate(
      (button2) => getComputedStyle(button2).outlineColor,
    );
    expect(buttonBackgroundColor).toBe('rgba(0, 0, 0, 0)');
    expect(buttonBorderColor).toBe('rgb(43, 112, 211)');
    expect(buttonOutlineColor).toBe('rgb(43, 112, 211)');
  });

  test('Type = Button', async ({ page }) => {
    await page.goto('src/components/button/test/secondary/index.html');
    const button = page.locator('tds-button');
    const innerButton = button.locator('button');
    const type = await innerButton.getAttribute('type');
    expect(type).toBe('button');
  });

  test('check if the inner button contain classes primary lg and sc-tds-button', async ({
    page,
  }) => {
    await page.goto('src/components/button/test/secondary/index.html');
    const button = page.locator('tds-button');
    const innerButton = button.locator('button');
    const classAttribute = await innerButton.getAttribute('class');
    const classes = classAttribute.split(' ');
    expect(classes).toContain('secondary');
    expect(classes).toContain('md');
    expect(classes).toContain('sc-tds-button');
  });

  test('Text is displayed, style is aligned to default(primary) state', async ({ page }) => {
    await page.goto('src/components/button/test/secondary/index.html');
    const button = page.locator('tds-button');
    await expect(button).toHaveCSS('color', 'rgb(13, 15, 19)');
    const textAttribute = await button.textContent();
    expect(textAttribute).toBe('Button');
  });

  test('Check so that height is correct to md measurements', async ({ page }) => {
    await page.goto('src/components/button/test/secondary/index.html');
    const button = page.locator('tds-button');
    const innerButton = button.locator('button');
    const buttonHeight = await innerButton.evaluate((button2) => getComputedStyle(button2).height);
    expect(buttonHeight).toBe('48px');
  });
});
