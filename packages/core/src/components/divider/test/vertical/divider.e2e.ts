import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/divider/test/vertical/index.html';

test.describe.parallel('tds-divider', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('expect to render a vertical divider', async ({ page }) => {
    // expect height to be greater than width
    const divider = page.getByTestId('divider').locator('div.divider').first();
    const box = await divider.boundingBox();
    expect(box.height).toBeGreaterThan(box.width);

    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });
});
