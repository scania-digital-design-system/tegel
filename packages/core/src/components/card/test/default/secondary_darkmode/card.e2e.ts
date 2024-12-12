import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/card/test/default/secondary_darkmode/index.html';

test.describe.parallel('tds-card-default-secondary-darkmode', () => {
  test('renders default card correctly', async ({ page }) => {
    await page.goto(componentTestPath);

    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });
});
