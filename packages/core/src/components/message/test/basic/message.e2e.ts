import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../utils/testConfiguration';

const componentTestPath = 'src/components/message/test/basic/index.html';
const componentName = 'tds-message';
const testDescription = 'tds-message-basic';

testConfigurations.withModeVariants.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('is basic message rendered correctly', async ({ page }) => {
      /* Check diff on screenshot */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });
  });
});

test.describe.parallel(componentName, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('has icon', async ({ page }) => {
    const messageIcon = page.locator('tds-icon');
    await expect(messageIcon).toHaveCount(1);
    await expect(messageIcon).toBeVisible();
  });
});
