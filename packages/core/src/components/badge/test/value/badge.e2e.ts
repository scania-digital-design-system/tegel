import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../utils/testConfiguration';

const componentTestPath = 'src/components/badge/test/value/index.html';
const componentName = 'tds-badge';
const testDescription = 'tds-badge';

testConfigurations.basicWithBrandVariants.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('renders value badge correctly', async ({ page }) => {
      await Promise.all(
        (
          await page.locator('tds-badge').all()
        ).map((element) => expect(element).toHaveClass(/hydrated/)),
      );

      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });
  });
});
