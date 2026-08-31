import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../utils/testConfiguration';

declare global {
  interface Window {
    openEventFired?: boolean;
    closeEventFired?: boolean;
  }
}

const componentTestPath = 'src/components/modal/test/open-close/index.html';
const componentName = 'tds-modal';
const testDescription = 'tds-modal-open';

testConfigurations.basicWithBrandVariants.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
      // Wait for Stencil hydration so the modal's click listener is attached
      // before tests dispatchEvent('click') on the open button. The modal is
      // hidden by default, so wait for 'attached' rather than 'visible'.
      await page.locator('tds-modal.hydrated').waitFor({ state: 'attached' });
    });

    test('Modal is closed by default', async ({ page }) => {
      const tdsModal = page.locator('tds-modal');
      await expect(tdsModal).toBeHidden(); // Modal is initially closed
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });

    test('Clicking [Open Modal] button opens the modal', async ({ page }) => {
      const tdsModal = page.locator('tds-modal');

      const openModalButton = page.locator('tds-button[text="Open Modal"]');
      await expect(openModalButton).toBeVisible();

      await openModalButton.click();
      await page.waitForChanges();

      // Assert that the modal is visible
      await expect(tdsModal).toBeVisible();
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });

    test('Clicking [Delete] button closes the modal', async ({ page }) => {
      const tdsModal = page.locator('tds-modal');

      const openModalButton = page.locator('tds-button[text="Open Modal"]');
      await expect(openModalButton).toBeVisible();

      await openModalButton.click();
      await page.waitForChanges();

      await expect(tdsModal).toBeVisible();

      const deleteButton = page.locator('tds-button[text="Delete"]');
      await expect(deleteButton).toBeVisible();

      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });

      await deleteButton.click(); // Click [Delete] button
      await page.waitForChanges();

      await expect(deleteButton).toBeHidden(); // button is removed
      await expect(tdsModal).toBeHidden();
    });
  });
});

test.describe.parallel('tds-modal-open', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('[Open Modal] button exists', async ({ page }) => {
    const openModalButton = page.locator('tds-button[text="Open Modal"]');
    await expect(openModalButton).toBeVisible(); // [Open Modal] button exists and is visible
  });

  test('Open modal using selector', async ({ page }) => {
    const openModalButton = page.locator('tds-button[text="Open Modal"]');
    await expect(openModalButton).toBeVisible();

    await openModalButton.click();
    await page.waitForChanges();

    const modalSelector = 'tds-modal'; // Adjust the selector to match your modal's attributes
    await page.waitForSelector(modalSelector);
    const modal = page.locator(modalSelector);

    await expect(modal).toBeVisible(); // Modal should be open when using selector
  });

  test('Clicking [Close] button closes the modal', async ({ page }) => {
    const tdsModal = page.locator('tds-modal');

    const openModalButton = page.locator('tds-button[text="Open Modal"]');
    await expect(openModalButton).toBeVisible();

    await openModalButton.click();
    await page.waitForChanges();

    const closeButton = page.locator('button[aria-label="close"]');
    await expect(closeButton).toBeVisible();

    // Now, close the modal
    await closeButton.click();
    await page.waitForChanges();

    await expect(tdsModal).toBeHidden(); // Modal should be closed after clicking Close
  });

  test('Clicking on area outside modal closes the modal', async ({ page }) => {
    const tdsModalBackdrop = page.locator('.tds-modal-backdrop');
    const tdsModal = page.locator('tds-modal');

    // First, open the modal
    const openModalButton = page.locator('tds-button[text="Open Modal"]');
    await expect(openModalButton).toBeVisible();

    await openModalButton.click();
    await page.waitForChanges();

    await expect(tdsModal).toBeVisible(); // Modal should be open

    // Now, close the modal by clicking outside
    await tdsModalBackdrop.click();
    await page.waitForChanges();

    await expect(tdsModal).toBeHidden(); // Modal should be closed after clicking outside
  });
});

test.describe.parallel('tds-modal-events', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('Should emit tdsOpen event when opening the modal', async ({ page }) => {
    await page.evaluate(() => {
      window.openEventFired = false;
      const modal = document.querySelector('tds-modal');
      modal?.addEventListener('tdsOpen', () => {
        window.openEventFired = true;
      });
    });

    const openModalButton = page.locator('tds-button[text="Open Modal"]');
    await expect(openModalButton).toBeVisible();

    await openModalButton.click();
    await page.waitForChanges();

    const eventFired = await page.evaluate(() => window.openEventFired);
    expect(eventFired).toBe(true);
  });

  test('Should emit tdsClose event when closing the modal', async ({ page }) => {
    await page.evaluate(() => {
      window.closeEventFired = false;
      const modal = document.querySelector('tds-modal');
      modal?.addEventListener('tdsClose', () => {
        window.closeEventFired = true;
      });
    });

    const openModalButton = page.locator('tds-button[text="Open Modal"]');
    await expect(openModalButton).toBeVisible();

    await openModalButton.click();
    await page.waitForChanges();

    const closeModalButton = page.locator('tds-button[text="Delete"]');
    await expect(closeModalButton).toBeVisible();

    await closeModalButton.click();
    await page.waitForChanges();

    const eventFired = await page.evaluate(() => window.closeEventFired);
    expect(eventFired).toBe(true);
  });
});
