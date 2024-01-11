import { test, expect } from '@playwright/test';

const componentTestPath = 'src/components/modal/test/prevent-true/index.html';

test.describe('tds-modal-open', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('Prevent = true: Clicking on area outside modal does not close the modal', async ({
    page,
  }) => {
    const tdsModalBackdrop = page.locator('.tds-modal-backdrop');
    const tdsModal = page.locator('tds-modal');

    await tdsModalBackdrop.dispatchEvent('click');
    await expect(tdsModal).toBeVisible(); // Modal should remain open when prevent is true
  });
});
