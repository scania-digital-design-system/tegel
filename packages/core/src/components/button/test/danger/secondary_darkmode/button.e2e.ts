import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/button/test/danger/secondary_darkmode/index.html';

test.describe.parallel('tds-button-danger-secondary-darkmode', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('renders danger button correctly', async ({ page }) => {
    const button = page.getByTestId('tds-button-testid');
    await expect(button).toHaveCount(1);

    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });
});
