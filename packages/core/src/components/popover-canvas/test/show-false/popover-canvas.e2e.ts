import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../utils/testConfiguration';

const componentTestPath = 'src/components/popover-canvas/test/show-false/index.html';
const componentName = 'tds-popover-canvas';
const testDescription = 'tds-popover-canvas-show-false';

testConfigurations.basic.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('renders show=false popover-canvas correctly', async ({ page }) => {
      const triggerButton = page.getByRole('button');
      await triggerButton.click();

      /* Check diff on screenshot */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });

    test('make sure popover canvas does not show after trigger button is pressed and content is not displayed before or after button click', async ({
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

      await expect(triggerButton).toBeVisible();
      await expect(popoverCanvasHeader).toBeHidden();
      await expect(popoverCanvasBody).toBeHidden();
      await expect(popoverCanvasLink).toBeHidden();
    });
  });
});
