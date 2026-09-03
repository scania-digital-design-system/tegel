import { E2EPage, test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../utils/testConfiguration';

const componentTestPath = 'src/components/popover-canvas/test/show-false/index.html';
const componentName = 'tds-popover-canvas';
const testDescription = 'tds-popover-canvas-show-false';

const waitForHydration = async (page: E2EPage) => {
  await expect(page.locator('tds-popover-canvas')).toHaveClass(/hydrated/);
  await expect(page.locator('tds-button#trigger')).toHaveClass(/hydrated/);
};

testConfigurations.basicWithBrandVariants.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
      await waitForHydration(page);
    });

    test('renders show=false popover-canvas correctly', async ({ page }) => {
      const triggerButton = page.getByRole('button');

      await triggerButton.click();
      await page.waitForChanges();

      /* Check diff on screenshot */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });
  });
});

test.describe.parallel(componentName, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
    await waitForHydration(page);
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
    await page.waitForChanges();

    await expect(triggerButton).toBeVisible();
    await expect(popoverCanvasHeader).toBeHidden();
    await expect(popoverCanvasBody).toBeHidden();
    await expect(popoverCanvasLink).toBeHidden();
  });
});
