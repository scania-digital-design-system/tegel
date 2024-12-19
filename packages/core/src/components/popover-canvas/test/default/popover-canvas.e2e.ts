import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../utils/testConfiguration';

const componentTestPath = 'src/components/popover-canvas/test/default/index.html';
const componentName = 'tds-popover-canvas';
const testDescription = 'tds-popover-canvas-default';

testConfigurations.basic.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('renders default popover-canvas correctly', async ({ page }) => {
      const triggerButton = page.getByRole('button');
      await triggerButton.click();

      /* Check diff on screenshot */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });

    test('make sure popover canvas shows after trigger button is pressed and content is displayed', async ({
      page,
    }) => {
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
      const triggerButton = page.getByRole('button');
      await triggerButton.click();

      const closeButton = page.getByTestId('canvas-close-button');
      await expect(closeButton).toBeVisible();
      await closeButton.click();

      await expect(closeButton).not.toBeVisible();
    });
  });
});
