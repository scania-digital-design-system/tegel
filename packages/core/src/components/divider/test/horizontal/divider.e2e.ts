import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/divider/test/horizontal/index.html';

test.describe.parallel('tds-divider', () => {
  test('expect to render a horizontal divider', async ({ page }) => {
    await page.goto(componentTestPath);

    // expect width to be greater then height
    const divider = page.getByTestId('divider').locator('div.divider').first();
    const box = await divider.boundingBox();
    expect(box.width).toBeGreaterThan(box.height);

    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });
});
