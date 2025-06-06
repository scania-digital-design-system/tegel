import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../utils/testConfiguration';

const componentTestPath = 'src/components/stepper/test/large-horizontal-text-below/index.html';
const componentName = 'tds-stepper';

testConfigurations.basic.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, componentName), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    // Test if component renders and take a screenshot of the component
    test('Stepper - Large horizontal with text below', async ({ page }) => {
      const stepper = page.locator('[data-testid="tds-stepper-testid"]');
      await stepper.waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });
  });
});
