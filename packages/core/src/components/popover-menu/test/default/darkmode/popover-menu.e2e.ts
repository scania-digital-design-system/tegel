import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/popover-menu/test/default/darkmode/index.html';

test.describe.parallel('tds-popover-menu-default-darkmode', () => {
  test('renders default popover-menu correctly', async ({ page }) => {
    await page.goto(componentTestPath);
    const triggerButton = page.getByRole('button').filter({ has: page.getByRole('img') });
    await triggerButton.click();

    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });
});
