import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../utils/testConfiguration';

const componentTestPath = 'src/components/dropdown/test/multiselect/index.html';
const componentName = 'tds-dropdown';
const testDescription = 'tds-dropdown-multiselect';

testConfigurations.withModeVariants.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('renders multiselect dropdown correctly', async ({ page }) => {
      const dropdown = page.getByTestId('tds-dropdown-testid');
      await expect(dropdown).toHaveCount(1);

      /* Check diff on screenshot */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });

    test('clicking the dropdown opens the dropdown-list, then click Option 1, should not close it', async ({
      page,
    }) => {
      /* click the dropdown button */
      const dropdown = page.getByTestId('tds-dropdown-testid');
      const dropdownButton = dropdown.getByRole('button');
      await dropdownButton.click();

      /* Click the Option 1 button */
      const dropdownListElementOneButton = page
        .locator('tds-dropdown-option')
        .filter({ hasText: /Option 1/ });
      await dropdownListElementOneButton.click();

      await expect(dropdownListElementOneButton).toBeVisible();

      // Check that the dropdown button now has the text "Option 1"
      await expect(dropdownButton).toHaveText(/Option 1/);

      /* also check screenshot diff to make sure it says Option 1 */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });

    test('clicking the dropdown opens the dropdown-list, then click on all the options', async ({
      page,
    }) => {
      /* click the button */
      const dropdown = page.getByTestId('tds-dropdown-testid');
      const dropdownButton = dropdown.getByRole('button');
      await dropdownButton.click();

      /* get all checkboxes */
      const dropdownListElementOneButton = dropdown
        .getByText(/Option 1/)
        .filter({ has: page.getByRole('checkbox') });
      const dropdownListElementTwoButton = dropdown
        .getByText(/Option 2/)
        .filter({ has: page.getByRole('checkbox') });
      const dropdownListElementThreeButton = dropdown
        .getByText(/Option 3/)
        .filter({ has: page.getByRole('checkbox') });
      const dropdownListElementFourButton = dropdown
        .getByText(/Option 4/)
        .filter({ has: page.getByRole('checkbox') });
      await expect(dropdownListElementOneButton).toHaveCount(1);
      await expect(dropdownListElementTwoButton).toHaveCount(1);
      await expect(dropdownListElementThreeButton).toHaveCount(1);
      await expect(dropdownListElementFourButton).toHaveCount(1);

      /* check each one and see that it updates correctly */
      await dropdownListElementOneButton.click();

      // Check that the dropdown button now has the text "Option 1"
      await expect(dropdownButton).toHaveText(/Option 1/);

      await dropdownListElementTwoButton.click();
      // Option 2 is disabled, so clicking it shouldn't change the text
      await expect(dropdownButton).toHaveText(/Option 1/);

      await dropdownListElementThreeButton.click();
      // Now the button should show "Option 1, Option 3"
      await expect(dropdownButton).toHaveText(/Option 1, Option 3/);

      await dropdownListElementFourButton.click();
      // Now the button should show "Option 1, Option 3, Option 4"
      await expect(dropdownButton).toHaveText(/Option 1, Option 3, Option 4/);

      /* also check screenshot diff to make sure */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });
  });
});
