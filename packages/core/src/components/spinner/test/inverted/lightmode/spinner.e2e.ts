import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/spinner/test/inverted/lightmode/index.html';

test.describe.parallel('tds-spinner-inverted-lightmode', () => {
  test('renders inverted spinner correctly', async ({ page }) => {
    await page.goto(componentTestPath);

    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });
});
