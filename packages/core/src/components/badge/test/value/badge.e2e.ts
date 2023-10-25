import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import { configureSnapshotPath } from '../../../../utils/configureSnapshotPath';

test.beforeEach(configureSnapshotPath());

test.describe('tds-badge', () => {
  test('renders value badge correctly', async ({ page }) => {
    await page.goto('src/components/badge/test/value/index.html');

    (await page.locator('tds-badge').all()).forEach(async (element) => {
      await expect(element).toHaveClass(/hydrated/);
    });

    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });
});
