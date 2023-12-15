import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/modal/test/default/index.html';

test.describe('tds-modal', () => {
  test('renders modal correctly', async ({ page }) => {
    await page.goto(componentTestPath);
    const tdsModal = page.getByTestId('tds-modal-testid');
    await expect(tdsModal).toHaveCount(1);
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('modal contains two buttons', async ({ page }) => {
    await page.goto(componentTestPath);
    const tdsModal = page.getByTestId('tds-modal-testid');

    // Locate the buttons within the modal
    const buttonLocator = tdsModal.locator('tds-button[data-dismiss-modal]');
    const buttonCount = await buttonLocator.count();

    // Assert that there are two buttons
    expect(buttonCount).toBe(2);
  });
});
