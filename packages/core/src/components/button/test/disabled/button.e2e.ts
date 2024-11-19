import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/button/test/disabled/index.html';

test.describe.parallel('tds-button-disabled', () => {
  test('renders disabled button correctly', async ({ page }) => {
    await page.goto(componentTestPath);
    const button = page.getByTestId('tds-button-testid');
    await expect(button).toHaveCount(1);

    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('disabled button should be disabled', async ({ page }) => {
    await page.goto(componentTestPath);

    /* Check if disabled */
    const button = page.getByRole('button');
    await expect(button).toBeDisabled();
  });

  test('the pointer-events should be none', async ({ page }) => {
    await page.goto(componentTestPath);
    const button = page.getByTestId('tds-button-testid').getByRole('button');
    const buttonCursorState = await button.evaluate(
      (style) => getComputedStyle(style).pointerEvents,
    );
    expect(buttonCursorState).toBe('none');
  });
});
