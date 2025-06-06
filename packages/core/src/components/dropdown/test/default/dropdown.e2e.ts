import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../utils/testConfiguration';

const componentTestPath = 'src/components/dropdown/test/default/index.html';
const componentName = 'tds-dropdown';
const testDescription = 'tds-dropdown-default';

testConfigurations.withModeVariants.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('renders default dropdown correctly', async ({ page }) => {
      const dropdown = page.getByTestId('tds-dropdown-testid');
      await expect(dropdown).toHaveCount(1);

      /* check diff in screenshot */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });

    test('clicking the dropdown button opens the dropdown-list', async ({ page }) => {
      const dropdown = page.getByTestId('tds-dropdown-testid');
      const dropdownButton = dropdown.getByRole('button');
      const dropdownListElementOne = page
        .locator('tds-dropdown-option')
        .filter({ hasText: 'Option 1' });
      await expect(dropdownListElementOne).toBeHidden();
      await dropdownButton.click();

      /* before clicking dropdownlist should not be visible, the button should be */
      await expect(dropdownButton).toBeVisible();
      await expect(dropdownListElementOne).toBeVisible();

      /* checks diff on screenshot */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });

    test('clicking the dropdown opens the dropdown-list, then click Option 1', async ({ page }) => {
      /* click the dropdown button */
      const dropdown = page.getByTestId('tds-dropdown-testid');
      const dropdownButton = dropdown.getByRole('button');
      await dropdownButton.click();

      /* Click the Option 1 button */
      const dropdownListElementOneButton = page
        .locator('tds-dropdown-option')
        .filter({ hasText: /Option 1/ })
        .getByRole('option');
      await dropdownListElementOneButton.click();

      await expect(dropdownListElementOneButton).toBeHidden();

      await expect(dropdownButton).toHaveText(/Option 1/);
      /* also check screenshot diff to make sure it says Option 1 */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });

    test('focusElement() method focus and opens the dropdown-list', async ({ page }) => {
      const dropdownButton = page.getByRole('button').first();
      const dropdownListElementOne = page
        .locator('tds-dropdown-option')
        .filter({ hasText: 'Option 1' });
      await expect(dropdownListElementOne).toBeHidden();

      await page.evaluate(() => {
        const dropdownnew = document.querySelector('tds-dropdown');
        dropdownnew.focusElement();
      });

      /* before clicking dropdownlist should not be visible, the button should be */
      await expect(dropdownButton).toBeVisible();
      await expect(dropdownListElementOne).toBeVisible();

      /* checks diff on screenshot */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });
  });
});

test.describe.parallel(componentName, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('should find label and be visible', async ({ page }) => {
    const labelText = page.getByText(/Label text/);
    await expect(labelText).toBeVisible();
  });

  test('find helper text and check if visible', async ({ page }) => {
    const helperText = page.getByText(/Helper text/);
    await expect(helperText).toBeVisible();
  });

  test('have the placeholder="Placeholder" text', async ({ page }) => {
    // Check that the placeholder text is visible
    const dropdown = page.getByTestId('tds-dropdown-testid');
    const dropdownButton = dropdown.getByRole('button');
    await expect(dropdownButton).toHaveText(/Placeholder/);
  });

  test('clicking the dropdown opens the dropdown-list, then click an option 2 that is disabled should not close it', async ({
    page,
  }) => {
    const dropdownListElementTwoButton = page
      .locator('tds-dropdown-option')
      .filter({ hasText: /Option 2/ });
    const dropdown = page.getByTestId('tds-dropdown-testid');
    const dropdownButton = dropdown.getByRole('button');

    /* before clicking dropdownlist should not be visible, the button should be */
    await expect(dropdownButton).toBeVisible();
    await expect(dropdownListElementTwoButton).toBeHidden();

    /* after clicking dropdownlist should be visible, the button should also be */
    await dropdownButton.click();
    await expect(dropdownButton).toBeVisible();
    await expect(dropdownListElementTwoButton).toBeVisible();

    /* after clicking option 2 that is disabled list should be visible and also button should be */
    await dropdownListElementTwoButton.click();
    await expect(dropdownButton).toBeVisible();
    await expect(dropdownListElementTwoButton).toBeVisible();
  });
});
