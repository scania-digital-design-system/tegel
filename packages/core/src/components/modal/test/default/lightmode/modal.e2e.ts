import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/modal/test/default/lightmode/index.html';

test.describe.parallel('tds-modal-default-lightmode', () => {
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

  test('modal contains a header and a body', async ({ page }) => {
    await page.goto(componentTestPath);

    const modalHeader = page.getByText('This is a header', { exact: true });
    const modalBody = page.getByText('Where you can put anything you want!', {
      exact: true,
    });

    // Assert that there are three buttons
    await expect(modalHeader).toBeVisible();
    await expect(modalBody).toBeVisible();
  });
});
