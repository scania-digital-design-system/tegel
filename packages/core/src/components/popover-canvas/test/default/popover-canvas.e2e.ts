import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/popover-canvas/test/default/index.html';

test.describe.parallel('tds-popover-canvas-default', () => {
  test('renders default popover-canvas correctly', async ({ page }) => {
    await page.goto(componentTestPath);
    const triggerButton = page.getByRole('button');
    await triggerButton.click();

    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('make sure popover canvas shows after trigger button is pressed and content is displayed', async ({
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

    await popoverCanvasHeader.waitFor({ state: 'visible' });
    await expect(popoverCanvasHeader).toBeVisible();
    await expect(popoverCanvasBody).toBeVisible();
    await expect(popoverCanvasLink).toBeVisible();
  });

  test('activating close method should close the dialog', async ({ page }) => {
    await page.goto(componentTestPath);
    const triggerButton = page.getByRole('button');
    await triggerButton.click();

    const closeButton = page.getByTestId('canvas-close-button');
    await expect(closeButton).toBeVisible();
    await closeButton.click();

    await expect(closeButton).not.toBeVisible();
  });
});
