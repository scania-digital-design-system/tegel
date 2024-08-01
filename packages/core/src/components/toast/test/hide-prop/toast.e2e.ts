import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/toast/test/hide-prop/index.html';

test.describe('Toast Component Tests', () => {
  // Test if component is hidden
  test('should be hidden', async ({ page }) => {
    await page.goto(componentTestPath);
    const tdsToast = page.getByTestId('tds-toast-testid');
    await expect(tdsToast).toHaveCSS('display', 'none');
  });
});
