import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../../utils/testConfiguration';

const componentTestPath = 'src/components/dropdown/test/filter/hide-no-result-message/index.html';
const componentName = 'tds-dropdown';
const testDescription = 'tds-dropdown-filter';

testConfigurations.withModeVariants.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('renders filter dropdown correctly', async ({ page }) => {
      const dropdown = page.getByTestId('tds-dropdown-testid');
      await expect(dropdown).toHaveCount(1);

      /* Check diff on screenshot */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });

    test('typing non existing value does not show "No results!" message', async ({ page }) => {
      const inputElement = page.getByRole('textbox');

      /* Add text and only Option 1 should be visible */
      await inputElement.fill('Johnny looks for no results message');
      await expect(inputElement).toBeVisible();

      const noResult = page.getByText('No result');
      await expect(noResult).toBeHidden();

      /* Check diff on screenshot after adding text */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });
  });
});
