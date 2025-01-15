import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../utils/testConfiguration';

const componentTestPath = 'src/components/popover-canvas/test/show-true/index.html';
const componentName = 'tds-popover-canvas';
const testDescription = 'tds-popover-canvas-show-true';

testConfigurations.basic.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('renders show=true popover-canvas correctly', async ({ page }) => {
      const triggerButton = page.getByRole('button');
      await triggerButton.click();

      // get popover element
      const popover = page.locator('tds-popover-core');

      // wait for it to be visible
      await popover.waitFor({ state: 'visible' });

      /* Check diff on screenshot */
      await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.05 });
    });
  });
});

test.describe.parallel(componentName, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('make sure the popover canvas content is displayed both before and after the trigger button is pressed', async ({
    page,
  }) => {
    const triggerButton = page.getByRole('button');
    const popoverCanvasHeader = page.getByRole('heading');
    const popoverCanvasBody = page.getByText('Where you can put anything you want!', {
      exact: true,
    });
    const popoverCanvasLink = page.getByRole('link');
    await expect(triggerButton).toBeVisible();
    await expect(popoverCanvasHeader).toBeVisible();
    await expect(popoverCanvasBody).toBeVisible();
    await expect(popoverCanvasLink).toBeVisible();

    await triggerButton.click();

    await expect(triggerButton).toBeVisible();
    await expect(popoverCanvasHeader).toBeVisible();
    await expect(popoverCanvasBody).toBeVisible();
    await expect(popoverCanvasLink).toBeVisible();
  });
});
