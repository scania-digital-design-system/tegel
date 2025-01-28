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
      const dropdownButton = page.getByRole('button', { name: 'Placeholder' });
      await dropdownButton.click();

      /* Click the Option 1 button */
      const dropdownListElementOneButton = page
        .locator('tds-dropdown-option')
        .filter({ hasText: /Option 1/ });
      await dropdownListElementOneButton.click();

      await expect(dropdownListElementOneButton).toBeVisible();
      const dropdownButtonWithOption1 = page.getByRole('button', { name: 'Option 1' });
      await expect(dropdownButtonWithOption1.first()).toBeVisible();

      /* also check screenshot diff to make sure it says Option 1 */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });

    test('clicking the dropdown opens the dropdown-list, then click on all the options', async ({
      page,
    }) => {
      /* click the button */
      const dropdownButton = page.getByRole('button', { name: 'Placeholder' });
      await dropdownButton.click();

      /* get all checkboxes */
      const dropdownListElementOneButton = page
        .getByText(/Option 1/)
        .filter({ has: page.getByRole('checkbox') });
      const dropdownListElementTwoButton = page
        .getByText(/Option 2/)
        .filter({ has: page.getByRole('checkbox') });
      const dropdownListElementThreeButton = page
        .getByText(/Option 3/)
        .filter({ has: page.getByRole('checkbox') });
      const dropdownListElementFourButton = page
        .getByText(/Option 4/)
        .filter({ has: page.getByRole('checkbox') });
      await expect(dropdownListElementOneButton).toHaveCount(1);
      await expect(dropdownListElementTwoButton).toHaveCount(1);
      await expect(dropdownListElementThreeButton).toHaveCount(1);
      await expect(dropdownListElementFourButton).toHaveCount(1);

      /* check each one and see that it updates correctly */
      await dropdownListElementOneButton.click();
      await expect(dropdownListElementOneButton).toHaveAttribute('aria-selected');
      await expect(dropdownListElementTwoButton).not.toHaveAttribute('aria-selected');
      await expect(dropdownListElementThreeButton).not.toHaveAttribute('aria-selected');
      await expect(dropdownListElementFourButton).not.toHaveAttribute('aria-selected');
      const inputText = page.getByRole('button', { name: /Option 1/ });
      await expect(inputText).toHaveCount(1);

      await dropdownListElementTwoButton.click();
      await expect(dropdownListElementOneButton).toHaveAttribute('aria-selected');
      await expect(dropdownListElementTwoButton).not.toHaveAttribute('aria-selected');
      await expect(dropdownListElementThreeButton).not.toHaveAttribute('aria-selected');
      await expect(dropdownListElementFourButton).not.toHaveAttribute('aria-selected');
      await expect(inputText).toHaveCount(1);

      await dropdownListElementThreeButton.click();
      await expect(dropdownListElementOneButton).toHaveAttribute('aria-selected');
      await expect(dropdownListElementTwoButton).not.toHaveAttribute('aria-selected');
      await expect(dropdownListElementThreeButton).toHaveAttribute('aria-selected');
      await expect(dropdownListElementFourButton).not.toHaveAttribute('aria-selected');
      const inputText2 = page.getByRole('button', { name: /Option 1,Option 3/ });
      await expect(inputText2).toHaveCount(1);

      await dropdownListElementFourButton.click();
      await expect(dropdownListElementOneButton).toHaveAttribute('aria-selected');
      await expect(dropdownListElementTwoButton).not.toHaveAttribute('aria-selected');
      await expect(dropdownListElementThreeButton).toHaveAttribute('aria-selected');
      await expect(dropdownListElementFourButton).toHaveAttribute('aria-selected');
      const inputText3 = page.getByRole('button', { name: /Option 1,Option 3,Option 4/ });
      await expect(inputText3).toHaveCount(1);

      /* also check screenshot diff to make sure */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });
  });
});
