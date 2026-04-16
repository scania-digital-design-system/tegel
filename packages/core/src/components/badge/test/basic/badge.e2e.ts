import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../utils/testConfiguration';

const componentTestPath = 'src/components/badge/test/basic/index.html';
const componentName = 'tds-badge';
const testDescription = 'tds-badge';

testConfigurations.basicWithBrandVariants.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('renders basic badge correctly', async ({ page }) => {
      const badge = page.locator('tds-badge');
      await expect(badge).toHaveClass('hydrated');
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });
  });
});
