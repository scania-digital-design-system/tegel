import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/modal/test/closable-false/index.html';

test('x button is hidden', async ({ page }) => {
  await page.goto(componentTestPath);

  const modalComponent = page.getByTestId('tds-modal-testid-1');
  expect(modalComponent).toHaveCount(1);
  // wait for it to show
  await modalComponent.waitFor({ state: 'visible' });

  // Get the close button within the modal
  const tdsModalCloseButton = modalComponent.locator('.tds-modal-close');

  await expect(tdsModalCloseButton).toBeHidden();
  await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
});
