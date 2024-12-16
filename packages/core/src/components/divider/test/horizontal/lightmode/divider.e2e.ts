import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/divider/test/horizontal/lightmode/index.html';

test.describe.parallel('tds-divider-lightmode', () => {
  test('expect to render a divider in lightmode', async ({ page }) => {
    await page.goto(componentTestPath);

    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });
});
