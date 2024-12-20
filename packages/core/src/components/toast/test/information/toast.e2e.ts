import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../utils/testConfiguration';

const componentTestPath = 'src/components/toast/test/information/index.html';
const componentName = 'tds-toast';
const testDescription = 'Toast Component Tests';

testConfigurations.basic.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);

      const tdsToast = page.getByTestId('tds-toast-testid');
      await expect(tdsToast).not.toBeNull();
    });

    // Test if component renders and take screenshot
    test('should render toast component and take screenshot', async ({ page }) => {
      const tdsToast = page.getByTestId('tds-toast-testid');
      await expect(tdsToast).toHaveCount(1);
      /* Expect no difference in screenshot  */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });

    // Test if component has header text "Message header"
    test('should have header text "Message header"', async ({ page }) => {
      const tdsToast = page.getByTestId('tds-toast-testid');
      await expect(tdsToast).toHaveText(/Message header/);
    });

    // Test if component has subheader text "Short subheader"
    test('should have subheader text "Short subheader"', async ({ page }) => {
      const tdsToast = page.getByTestId('tds-toast-testid');
      await expect(tdsToast).toHaveText(/Short subheader/);
    });

    // Test if component has a link with "Link example" text
    test('should have a link with "Link example" text', async ({ page }) => {
      const tdsToast = page.getByTestId('tds-toast-testid');
      await expect(tdsToast).toHaveText(/Link example/);
    });
  });
});
