import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/modal/test/open-close/index.html';

test.describe('tds-modal-open', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('1. Modal is opened by default', async ({ page }) => {
    const tdsModal = page.locator('tds-modal');
    const hasShowAttribute = await tdsModal.getAttribute('show');
    if (hasShowAttribute) {
      await expect(tdsModal).toBeVisible(); // Modal is initially open
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    }
  });

  test('Clicking [Delete] button closes the modal', async ({ page }) => {
    const deleteButton = page.getByText('Delete');
    await deleteButton.click(); // Click [Delete] button
    const tdsModal = page.locator('tds-modal');
    await expect(tdsModal).toBeHidden(); // Modal is closed
  });

  test('[Open Modal] button exists', async ({ page }) => {
    const openModalButton = page.getByTestId('tds-modal-button-testid');
    await expect(openModalButton).toBeVisible(); // [Open Modal] button exists and is visible
  });

  test('Clicking [Open Modal] button opens the modal', async ({ page }) => {
    const openModalButton = page.getByTestId('tds-modal-button-testid');
    const tdsModal = page.locator('tds-modal');

    await openModalButton.dispatchEvent('click');
    await expect(tdsModal).toBeVisible(); // Modal should be open after clicking [Open Modal]
  });

  test('Clicking [Close] button closes the modal', async ({ page }) => {
    const closeButton = page.locator('button.tds-modal-close');
    const tdsModal = page.locator('tds-modal');

    await closeButton.dispatchEvent('click');
    await expect(tdsModal).toBeHidden(); // Modal should be closed after clicking Close
  });

  test('Clicking on area outside modal closes the modal', async ({ page }) => {
    const tdsModalBackdrop = page.locator('.tds-modal-backdrop');
    const tdsModal = page.locator('tds-modal');

    await tdsModalBackdrop.dispatchEvent('click');
    await expect(tdsModal).toBeHidden(); // Modal should be closed after clicking outside
  });
});
