import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/popover-canvas/test/show-false/index.html';

test.describe('tds-popover-canvas-show-false', () => {
  test('renders show=false popover-canvas correctly', async ({ page }) => {
    await page.goto(componentTestPath);
    const triggerButton = page.getByRole('button');
    await triggerButton.click();

    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('make sure popover canvas shows after trigger button is pressed and content is not displayed before or after button click', async ({
    page,
  }) => {
    await page.goto(componentTestPath);
    const triggerButton = page.getByRole('button');
    const popoverCanvasHeader = page.getByRole('heading');
    const popoverCanvasBody = page.getByText('Where you can put anything you want!', {
      exact: true,
    });
    const popoverCanvasLink = page.getByRole('link');
    await expect(triggerButton).toBeVisible();
    await expect(popoverCanvasHeader).toBeHidden();
    await expect(popoverCanvasBody).toBeHidden();
    await expect(popoverCanvasLink).toBeHidden();

    await triggerButton.click();

    await expect(triggerButton).toBeVisible();
    await expect(popoverCanvasHeader).toBeHidden();
    await expect(popoverCanvasBody).toBeHidden();
    await expect(popoverCanvasLink).toBeHidden();
  });
});
