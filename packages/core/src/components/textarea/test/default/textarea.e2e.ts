import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/textarea/test/default/index.html';

test.describe('tds-textarea', () => {
  test('renders default textarea correctly', async ({ page }) => {
    await page.goto(componentTestPath);
    const tdsTextarea = page.locator('tds-textarea');
    expect(tdsTextarea).toBeTruthy();
    /* Expect no difference in screenshot  */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('default textarea - click on text area - cursor should appear', async ({ page }) => {
    await page.goto(componentTestPath);
    const textarea = page.locator('tds-textarea').locator('textarea');
    const myEventSpy = await page.spyOnEvent('click');
    await textarea.click();
    /* Expect to have received an event from clicking on the textarea */
    expect(myEventSpy).toHaveReceivedEvent();
    const textareaCursorState = await textarea.evaluate((style) => getComputedStyle(style).cursor);
    /* Expect the textbox to have the cursor text style */
    expect(textareaCursorState).toBe('text');
  });

  test('default textarea - type text in textarea - should be able to add text', async ({
    page,
  }) => {
    await page.goto(componentTestPath);
    const textarea = page.locator('tds-textarea').locator('textarea');
    const myEventSpy = await page.spyOnEvent('click');
    await textarea.click();
    /* Expect to have received an event from clicking on the textarea */
    expect(myEventSpy).toHaveReceivedEvent();
    await textarea.fill('Adding some text');
    /* Expect the inputValue of textarea to have "Adding some text" after it has been typed */
    expect(await textarea.inputValue()).toBe('Adding some text');
  });
});
