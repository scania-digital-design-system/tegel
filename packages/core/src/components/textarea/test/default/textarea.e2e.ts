import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/textarea/test/default/index.html';

test.describe.parallel('tds-textarea-default', () => {
  test('renders default textarea correctly', async ({ page }) => {
    await page.goto(componentTestPath);
    const tdsTextarea = page.getByTestId('tds-textarea-testid');
    await expect(tdsTextarea).toHaveCount(1);

    /* Expect no difference in screenshot  */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('test if able to type in textarea', async ({ page }) => {
    await page.goto(componentTestPath);
    const textarea = page.getByRole('textbox');

    /* Expect to have received an event from clicking on the textarea */
    const myEventSpy = await page.spyOnEvent('click');
    await textarea.click();
    expect(myEventSpy).toHaveReceivedEvent();

    /* Expect the textbox to have the cursor text style */
    const textareaCursorState = await textarea.evaluate((style) => getComputedStyle(style).cursor);
    expect(textareaCursorState).toBe('text');

    /* Expect the inputValue of textarea to have "Adding some text" after it has been typed */
    await textarea.fill('Adding some text');
    expect(await textarea.inputValue()).toBe('Adding some text');

    /* Expect no difference in screenshot  */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('not able to find label if "no-label" is set', async ({ page }) => {
    await page.goto(componentTestPath);
    const textareaLabel = page.getByText('Label');
    await expect(textareaLabel).toHaveCount(0);
    await expect(textareaLabel).toBeHidden();
  });
});
