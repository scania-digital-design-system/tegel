import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/chip/test/radio/index.html';

test.describe('tds-chip-default', () => {
  test('renders default chip correctly', async ({ page }) => {
    await page.goto(componentTestPath);
    const chip1 = page.getByText('Label 1', { exact: true });
    await expect(chip1).toHaveCount(1);

    const chip2 = page.getByText('Label 2', { exact: true });
    await expect(chip2).toHaveCount(1);

    const chip3 = page.getByText('Label 3', { exact: true });
    await expect(chip3).toHaveCount(1);

    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('expect chips to be of the role radio', async ({ page }) => {
    await page.goto(componentTestPath);
    const chipRole = page.getByRole('radio');
    await expect(chipRole).toHaveCount(3);
  });
});
