import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/toast/test/error-with-slots/index.html';

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

  // Test if component has header text "Message header"
  test('should have header text "Slotted header"', async ({ page }) => {
    const tdsToast = page.getByTestId('tds-toast-testid');
    await expect(tdsToast).toHaveText(/Slotted header/);
  });

  // Test if component has subheader text "Short subheader"
  test('should have subheader text "Slotted subheader"', async ({ page }) => {
    const tdsToast = page.getByTestId('tds-toast-testid');
    await expect(tdsToast).toHaveText(/Slotted subheader/);
  });

  // Test if component has a link with "Link example" text
  test('should have a link with "Link example" text', async ({ page }) => {
    const tdsToast = page.getByTestId('tds-toast-testid');
    await expect(tdsToast).toHaveText(/Link example/);
  });
});
