import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/toast/test/success-empty-action-slot/index.html';

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

  // Test if component has no action slot
  test('should not have action slot', async ({ page }) => {
    const tdsToast = page.getByTestId('tds-toast-testid');
    await expect(tdsToast).not.toHaveText(/Link example/);
  });
});
