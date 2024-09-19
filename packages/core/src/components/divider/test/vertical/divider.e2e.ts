import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/divider/test/vertical/index.html';

test.describe.parallel('tds-divider', () => {
  test('expect to render a vertical divider', async ({ page }) => {
    await page.goto(componentTestPath);

    // expect height to be greater than width
    const divider = page.getByTestId('divider').locator('div.divider').first();
    const box = await divider.boundingBox();
    expect(box.height).toBeGreaterThan(box.width);

    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });
});
