import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/checkbox/test/default/darkmode/index.html';

test.describe.parallel('tds-checkbox-darkmode', () => {
  test('renders basic checkbox correctly', async ({ page }) => {
    await page.goto(componentTestPath);
    const labelElement = page.locator('tds-checkbox label'); // Target label underneath checkbox

    expect(labelElement).toHaveText('Label'); // Check label text
    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });
});
