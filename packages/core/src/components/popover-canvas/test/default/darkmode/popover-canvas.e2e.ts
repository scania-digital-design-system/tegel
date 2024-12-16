import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/popover-canvas/test/default/darkmode/index.html';

test.describe.parallel('tds-popover-canvas-default-darkmode', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('renders default popover-canvas correctly', async ({ page }) => {
    const triggerButton = page.getByRole('button');
    await triggerButton.click();

    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });
});
