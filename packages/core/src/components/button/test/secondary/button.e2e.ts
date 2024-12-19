import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../utils/testConfiguration';

const componentTestPath = 'src/components/button/test/secondary/index.html';
const componentName = 'tds-button';
const testDescription = 'tds-button-secondary';

testConfigurations.withModeVariants.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('renders secondary button correctly', async ({ page }) => {
      const button = page.getByTestId('tds-button-testid');
      await expect(button).toHaveCount(1);

      /* Check diff on screenshot */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });

    test('Check so that height is correct to md measurements', async ({ page }) => {
      const button = page.getByText('Button', { exact: true });
      const buttonHeight = await button.evaluate((style) => getComputedStyle(style).height);
      expect(buttonHeight).toBe('48px');
    });
  });
});
