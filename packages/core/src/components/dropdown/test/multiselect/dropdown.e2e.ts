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

    test('opens dropdown, selects Option 1, keeps list open, and shows selected label', async ({
      page,
    }) => {
      const dropdown = page.getByTestId('tds-dropdown-testid');
      const triggerButton = dropdown.getByRole('button', { name: 'Label text' });

      /* Initial state: user sees placeholder text in the trigger */
      await expect(triggerButton).toContainText('Placeholder');

      /* Open the dropdown */
      await triggerButton.click();

      /* Click Option 1 */
      await page.locator('tds-dropdown-option[value="option-1"]').click();

      /* Check that the selected text now shows "Option 1" */
      await expect(page.getByRole('checkbox', { name: 'Option 1' })).toBeChecked();

      /* Trigger now displays the selected label */
      const valueText = dropdown.locator('div.placeholder');
      await expect(valueText).toHaveText('Option 1');

      /* also check screenshot diff to make sure it says Option 1 */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });

    test('opens dropdown and selects multiple options; disabled option does not change selection', async ({
      page,
    }) => {
      const dropdown = page.getByTestId('tds-dropdown-testid');
      const triggerButton = dropdown.getByRole('button', { name: 'Label text' });
      await triggerButton.click();

      /* Click Option 1 */
      const option1 = page.locator('tds-dropdown-option[value="option-1"]');
      await option1.click();
      await expect(page.getByRole('checkbox', { name: 'Option 1' })).toBeChecked();
      const valueText = dropdown.locator('div.placeholder');
      await expect(valueText).toHaveText('Option 1');

      /* Click Option 2 (disabled, should not change selection) */
      await page.locator('tds-dropdown-option[value="option-2"]').click();
      await expect(page.getByRole('checkbox', { name: 'Option 2' })).not.toBeChecked();
      await expect(valueText).not.toContainText('Option 2');

      /* Click Option 3 */
      await page.locator('tds-dropdown-option[value="option-3"]').click();
      await expect(page.getByRole('checkbox', { name: 'Option 3' })).toBeChecked();
      await expect(valueText).toHaveText('Option 1, Option 3');

      /* Click Option 4 */
      await page.locator('tds-dropdown-option[value="option-4"]').click();
      await expect(page.getByRole('checkbox', { name: 'Option 4' })).toBeChecked();
      await expect(valueText).toHaveText('Option 1, Option 3, Option 4');

      /* also check screenshot diff to make sure */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });
  });
});
