import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/link/test/default/darkmode/index.html';

test.describe.parallel('tds-link-default-darkmode', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('is default link rendered correctly', async ({ page }) => {
    const tdsLink = page.getByTestId('tds-link-testid');

    await expect(tdsLink).toHaveCount(1);

    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });
});
