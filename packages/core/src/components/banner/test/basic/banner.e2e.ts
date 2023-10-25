import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import { configureSnapshotPath } from '../../../../utils/configureSnapshotPath';

test.beforeEach(configureSnapshotPath());

test.describe('tds-banner', () => {
  test('renders basic banner correctly', async ({ page }) => {
    await page.goto('src/components/banner/test/basic/index.html');
    const accordion = page.locator('tds-banner');
    await expect(accordion).toHaveClass(/hydrated/);
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });
});
