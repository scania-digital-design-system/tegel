import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/chip/test/icon/index.html';

test.describe.parallel('tds-chip-default', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('renders default chip correctly', async ({ page }) => {
    const chip = page.locator('tds-chip');
    await expect(chip).toHaveCount(1);

    const labelElement = page.locator('tds-chip label'); // Target label underneath chip
    expect(labelElement).toHaveText('Label');

    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('expect chip to be of the role button', async ({ page }) => {
    const chipRole = page.getByRole('button');
    await expect(chipRole).toHaveCount(1);
  });

  test('Check so that the chip contains an icon', async ({ page }) => {
    const icon = page.locator('tds-icon');
    await expect(icon).toBeVisible();
    await expect(icon).toHaveAttribute('name', 'star');
  });
});
