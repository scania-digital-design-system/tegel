import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/chip/test/default/darkmode/index.html';

test.describe.parallel('tds-chip-default-darkmode', () => {
  test('renders default chip correctly', async ({ page }) => {
    await page.goto(componentTestPath);
    const chip = page.locator('tds-chip');
    await expect(chip).toHaveCount(1);

    const labelElement = page.locator('tds-chip label'); // Target label underneath chip
    expect(labelElement).toHaveText('Label');

    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });
});
