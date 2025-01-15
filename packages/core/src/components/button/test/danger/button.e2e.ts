import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../utils/testConfiguration';

const componentTestPath = 'src/components/button/test/danger/index.html';
const componentName = 'tds-button';
const testDescription = 'tds-button-danger';

testConfigurations.withModeVariants.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('renders danger button correctly', async ({ page }) => {
      const button = page.getByTestId('tds-button-testid');
      await expect(button).toHaveCount(1);

      /* Check diff on screenshot */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });
  });
});

test.describe.parallel(componentName, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('Check so that height is correct to sm measurements', async ({ page }) => {
    const button = page.getByText('Button', { exact: true });
    const buttonHeight = await button.evaluate((style) => getComputedStyle(style).height);
    expect(buttonHeight).toBe('40px');
  });
});
