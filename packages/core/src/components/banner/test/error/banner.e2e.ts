import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  getTestDescribeText,
  setupPage,
  testConfigurations,
} from '../../../../utils/testConfiguration';

const componentTestPath = 'src/components/banner/test/error/index.html';
const componentName = 'tds-banner';
const testDescription = 'tds-banner-error';

testConfigurations.basic.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('renders error banner correctly', async ({ page }) => {
      /* Check diff on screenshot */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });
  });
});

test.describe.parallel(componentName, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('icons exists', async ({ page }) => {
    const images = page.getByRole('img');
    await expect(images).toHaveCount(2);
  });
});
