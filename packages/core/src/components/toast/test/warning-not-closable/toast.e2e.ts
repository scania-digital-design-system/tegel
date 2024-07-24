import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/toast/test/warning-not-closable/index.html';

test.describe('Toast Component Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
    const tdsToast = page.getByTestId('tds-toast-testid');
    expect(tdsToast).not.toBeNull();
  });

  // Test if component renders and take screenshot
  test('should render toast component and take screenshot', async ({ page }) => {
    const tdsToast = page.getByTestId('tds-toast-testid');
    await expect(tdsToast).toHaveCount(1);
    /* Expect no difference in screenshot  */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  // Test if component does not have close button
  test('should not have close button', async ({ page }) => {
    const tdsToast = page.getByTestId('tds-toast-testid');
    const closeButton = tdsToast.locator('button.close');
    expect(closeButton).not.toBeVisible();
    expect(closeButton).toBeNull();
  });
});
