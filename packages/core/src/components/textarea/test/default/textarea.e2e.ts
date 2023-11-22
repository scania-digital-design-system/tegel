import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/textarea/test/default/index.html';

test.describe('tds-textarea', () => {
  test('renders default textarea correctly', async ({ page }) => {
    await page.goto(componentTestPath);
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('default textarea - click on text area - cursor should appear', async ({ page }) => {
    await page.goto(componentTestPath);
    const textarea = page.locator('tds-textarea').locator('textarea');
    const myEventSpy = await page.spyOnEvent('click');
    await textarea.click();
    expect(myEventSpy).toHaveReceivedEvent();
    const textareaCursorState = await textarea.evaluate(
      (button2) => getComputedStyle(button2).cursor,
    );
    expect(textareaCursorState).toBe('text');
  });

  test('default textarea - type text in textarea - should be able to add text', async ({
    page,
  }) => {
    await page.goto(componentTestPath);
    const textarea = page.locator('tds-textarea').locator('textarea');
    const myEventSpy = await page.spyOnEvent('click');
    await textarea.click();
    expect(myEventSpy).toHaveReceivedEvent();
    await textarea.fill('Adding some text');
    expect(await textarea.inputValue()).toBe('Adding some text');
  });
});
