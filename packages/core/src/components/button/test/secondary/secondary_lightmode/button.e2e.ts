import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/button/test/secondary/secondary_lightmode/index.html';

test.describe.parallel('tds-button-secondary-secondary-lightmode', () => {
  test('renders secondary button correctly', async ({ page }) => {
    await page.goto(componentTestPath);
    const button = page.getByTestId('tds-button-testid');
    await expect(button).toHaveCount(1);

    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });
});
