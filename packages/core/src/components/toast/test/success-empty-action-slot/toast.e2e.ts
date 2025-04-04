import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../utils/testConfiguration';

const componentTestPath = 'src/components/toast/test/success-empty-action-slot/index.html';
const componentName = 'tds-toast';
const testDescription = 'Toast Component Tests';

testConfigurations.basic.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);

      const tdsToast = page.getByTestId('tds-toast-testid');
      expect(tdsToast).not.toBeNull();
    });

    // Test if component renders and take screenshot
    test('should render toast component and take screenshot', async ({ page }) => {
      const tdsToast = page.getByTestId('tds-toast-testid');
      await expect(tdsToast).toHaveCount(1);
      /* Expect no difference in screenshot  */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });
  });
});

test.describe.parallel(componentName, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);

    const tdsToast = page.getByTestId('tds-toast-testid');
    expect(tdsToast).not.toBeNull();
  });

  // Test if component has no action slot
  test('should not have action slot', async ({ page }) => {
    const tdsToast = page.getByTestId('tds-toast-testid');
    await expect(tdsToast).not.toHaveText(/Link example/);
  });
});
