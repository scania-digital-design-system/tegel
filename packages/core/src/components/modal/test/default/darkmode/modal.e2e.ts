import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/modal/test/default/darkmode/index.html';

test.describe.parallel('tds-modal-default-darkmode', () => {
  test('renders modal correctly', async ({ page }) => {
    await page.goto(componentTestPath);
    const tdsModal = page.getByTestId('tds-modal-testid');
    await expect(tdsModal).toHaveCount(1);
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });
});
