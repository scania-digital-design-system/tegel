import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/modal/test/default/index.html';

test.describe('tds-modal-default', () => {
  test('renders modal correctly', async ({ page }) => {
    await page.goto(componentTestPath);
    const tdsModal = page.getByTestId('tds-modal-testid');
    await expect(tdsModal).toHaveCount(1);
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('modal contains three buttons', async ({ page }) => {
    await page.goto(componentTestPath);
    // Locate the buttons within the modal
    const modalButtons = page.getByRole('button');

    // Assert that there are three buttons
    await expect(modalButtons).toHaveCount(3);
  });
});
