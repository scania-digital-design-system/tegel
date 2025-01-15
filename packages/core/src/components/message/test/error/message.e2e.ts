import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../utils/testConfiguration';

const componentTestPath = 'src/components/message/test/error/index.html';
const componentName = 'tds-message';
const testDescription = 'tds-message-error';

testConfigurations.withModeVariants.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('is error message rendered correctly', async ({ page }) => {
      /* Check diff on screenshot */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });
  });
});

test.describe.parallel(componentName, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('has header text', async ({ page }) => {
    const messageComponentHeader = page.getByText('Message header', { exact: true });
    await expect(messageComponentHeader).toHaveCount(1);
    await expect(messageComponentHeader).toBeVisible();
  });

  test('has subheader text', async ({ page }) => {
    const messageComponentSubHeader = page.getByText('Longer Message text can be placed here.');
    await expect(messageComponentSubHeader).toHaveCount(1);
    await expect(messageComponentSubHeader).toBeVisible();
  });

  test('has error icon', async ({ page }) => {
    const messageIcon = page.getByRole('img');
    await expect(messageIcon).toHaveCount(1);
    await expect(messageIcon).toBeVisible();
  });
});
