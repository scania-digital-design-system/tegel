import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../utils/testConfiguration';

const componentTestPath = 'src/components/button/test/disabled/index.html';
const componentName = 'tds-button';
const testDescription = 'tds-button-disabled';

testConfigurations.withModeVariants.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('renders disabled button correctly', async ({ page }) => {
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

  test('disabled button should be disabled', async ({ page }) => {
    /* Check if disabled */
    const button = page.getByRole('button');
    await expect(button).toBeDisabled();
  });

  test('the cursor should be not-allowed', async ({ page }) => {
    const button = page.getByTestId('tds-button-testid').getByRole('button');
    const buttonCursorState = await button.evaluate((style) => getComputedStyle(style).cursor);
    expect(buttonCursorState).toBe('not-allowed');
  });
});
