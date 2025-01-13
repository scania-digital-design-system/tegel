import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../utils/testConfiguration';

const componentTestPath = 'src/components/dropdown/test/error/index.html';
const componentName = 'tds-dropdown';
const testDescription = 'tds-dropdown-error';

testConfigurations.withModeVariants.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('renders error dropdown correctly', async ({ page }) => {
      const dropdown = page.getByTestId('tds-dropdown-testid');
      await expect(dropdown).toHaveCount(1);

      /* Check diff on screenshot */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });

    test('clicking the dropdown opens the dropdown-list', async ({ page }) => {
      const dropdownListElementOneButton = page
        .locator('tds-dropdown-option')
        .filter({ hasText: /Option 1/ })
        .getByRole('button');
      const dropdownButton = page.getByRole('button', { name: 'Placeholder' });

      /* before clicking dropdownlist should not be visible, the button should be */
      await expect(dropdownButton).toBeVisible();
      await expect(dropdownListElementOneButton).toBeHidden();
      await dropdownButton.click();

      /* after clicking dropdownlist should be visible, the button should also be */
      await expect(dropdownButton).toBeVisible();
      await expect(dropdownListElementOneButton).toBeVisible();

      /* check diff on screenshot */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });
  });
});

test.describe.parallel(componentName, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('find helper text and check if visible and have icon', async ({ page }) => {
    const helperText = page.getByText(/Helper text/);
    await expect(helperText).toBeVisible();
    const helperTextIcon = helperText.getByRole('img');
    await expect(helperTextIcon).toHaveCount(1);
  });
});
