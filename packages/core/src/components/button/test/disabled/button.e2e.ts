import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/button/test/disabled/index.html';

test.describe('tds-button-disabled', () => {
  test('renders disabled button correctly', async ({ page }) => {
    await page.goto(componentTestPath);
    const button = page.getByTestId('tds-button-testid');
    await expect(button).toHaveCount(1);
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('component should not receive click event', async ({ page }) => {
    await page.goto(componentTestPath);

    /* Check if receive  */
    const tdsButton = page.getByTestId('tds-button-testid');
    const myEventSpy = await page.spyOnEvent('click');
    await tdsButton.click();
    expect(myEventSpy).not.toHaveReceivedEvent();

    /* Check if disabled */
    const button = page.getByRole('button');
    await expect(button).toBeDisabled();
  });

  test('the cursor should be not-allowed', async ({ page }) => {
    await page.goto(componentTestPath);
    const button = page.getByTestId('tds-button-testid').getByRole('button');
    const buttonCursorState = await button.evaluate((style) => getComputedStyle(style).cursor);
    expect(buttonCursorState).toBe('not-allowed');
  });
});
