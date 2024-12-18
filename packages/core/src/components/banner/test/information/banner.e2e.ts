import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  getTestDescribeText,
  setupPage,
  testConfigurations,
} from '../../../../utils/testConfiguration';

const componentTestPath = 'src/components/banner/test/information/index.html';
const componentName = 'tds-banner';
const testDescription = 'tds-banner-information';

testConfigurations.basic.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('renders information banner correctly', async ({ page }) => {
      /* Check diff on screenshot */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });

    test('icons exists', async ({ page }) => {
      const images = page.getByRole('img');
      await expect(images).toHaveCount(2);
    });
  });
});
