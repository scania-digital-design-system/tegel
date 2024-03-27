import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/modal/test/open-close/index.html';

test.describe.parallel('tds-modal-open', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('Modal is closed by default', async ({ page }) => {
    const tdsModal = page.locator('tds-modal');
    await expect(tdsModal).toBeHidden(); // Modal is initially closed
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('[Open Modal] button exists', async ({ page }) => {
    const openModalButton = page.getByRole('button').filter({ hasText: /Open Modal/ });
    await expect(openModalButton).toBeVisible(); // [Open Modal] button exists and is visible
  });

  test('Open modal using selector', async ({ page }) => {
    const openModalButton = page.getByRole('button').filter({ hasText: /Open Modal/ });
    await openModalButton.dispatchEvent('click');

    const modalSelector = 'tds-modal'; // Adjust the selector to match your modal's attributes
    await page.waitForSelector(modalSelector);
    const modal = await page.locator(modalSelector);

    await expect(modal).toBeVisible(); // Modal should be open when using selector
  });

  test('Clicking [Open Modal] button opens the modal', async ({ page }) => {
    const openModalButton = page.getByRole('button').filter({ hasText: /Open Modal/ });
    const tdsModal = page.locator('tds-modal');

    await openModalButton.dispatchEvent('click');

    // Assert that the modal is visible
    await expect(tdsModal).toBeVisible();
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('Clicking [Delete] button closes the modal', async ({ page }) => {
    const deleteButton = page.getByRole('button').filter({ hasText: /Delete/ });
    const openModalButton = page.getByRole('button').filter({ hasText: /Open Modal/ });
    const tdsModal = page.locator('tds-modal');

    await openModalButton.dispatchEvent('click');

    await expect(tdsModal).toBeVisible();
    await expect(deleteButton).toBeVisible();
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });

    await deleteButton.dispatchEvent('click'); // Click [Delete] button

    await expect(deleteButton).toBeHidden(); // button is removed
    await expect(tdsModal).toBeHidden();
  });

  test('Clicking [Close] button closes the modal', async ({ page }) => {
    const closeButton = page.locator('button[aria-label="close"]');
    const tdsModal = page.locator('tds-modal');

    // Now, close the modal
    await closeButton.dispatchEvent('click');
    await expect(tdsModal).toBeHidden(); // Modal should be closed after clicking Close
  });

  test('Clicking on area outside modal closes the modal', async ({ page }) => {
    const tdsModalBackdrop = page.locator('.tds-modal-backdrop');
    const tdsModal = page.locator('tds-modal');

    // First, open the modal
    const openModalButton = page.getByRole('button').filter({ hasText: /Open Modal/ });
    await openModalButton.dispatchEvent('click');
    await expect(tdsModal).toBeVisible(); // Modal should be open

    // Now, close the modal by clicking outside
    await tdsModalBackdrop.dispatchEvent('click');
    await expect(tdsModal).toBeHidden(); // Modal should be closed after clicking outside
  });
});
