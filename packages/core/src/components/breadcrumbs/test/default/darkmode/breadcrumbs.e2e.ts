import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/breadcrumbs/test/default/darkmode/index.html';

test.describe.parallel('tds-breadcrumbs-default-darkmode', () => {
  test('renders default breadcrumbs correctly', async ({ page }) => {
    await page.goto(componentTestPath);

    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('page 3 item should be able to become focused', async ({ page }) => {
    await page.goto(componentTestPath);

    const pageThree = page.getByText(/Page 3/);
    await pageThree.focus();

    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });
});
