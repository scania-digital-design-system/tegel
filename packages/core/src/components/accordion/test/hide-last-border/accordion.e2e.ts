import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  getTestDescribeText,
  setupPage,
  testConfigurations,
} from '../../../../utils/testConfiguration';

const componentTestPath = 'src/components/accordion/test/hide-last-border/index.html';
const accordionSelector = 'tds-accordion';
const componentName = 'tds-accordion';

testConfigurations.withModeVariants.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, componentName), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('renders accordion with hidden last border correctly', async ({ page }) => {
      // Define selector for accordion
      const accordion = page.locator(accordionSelector);

      // Check if accordion contains the correct text
      await expect(accordion).toContainText('First item');
      await expect(accordion).toContainText('Second item');

      // Check screenshot diff to make sure the accordion is rendered correctly
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });
  });
});
