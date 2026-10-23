import { test } from '@stencil/playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../utils/testConfiguration';

// Defined once for reuse
const componentTestPath = 'src/components/text-field/test/multiple-readonly/index.html';
const componentName = 'tds-text-field';
const testDescription = 'tds-text-field-multiple-readonly';

testConfigurations.withModeVariantsAndBrands.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('shows tooltip for each readonly text-field', async ({ page }) => {
      // First, verify that the tooltips are not visible at start
      const tooltips = await page.getByText('This field is non-editable').all();
      for (const tooltip of tooltips) {
        await expect(tooltip).not.toBeVisible();
      }

      // Get the FIRST tds-text-field component
      const firstTextField = page.locator('tds-text-field[tds-aria-label="first-text-field"]');
      await expect(firstTextField).toBeVisible();

      // Get the icon and hover over it
      const firstIcon = firstTextField.locator('tds-icon[name="edit_inactive"]');
      await expect(firstIcon).toBeVisible();
      await firstIcon.hover();

      // Expect to see the tooltip text (within the first text-field component)
      await expect(firstTextField.getByText('This field is non-editable')).toBeVisible();

      // Get the SECOND tds-text-field component
      const secondTextField = page.locator('tds-text-field[tds-aria-label="second-text-field"]');
      await expect(secondTextField).toBeVisible();

      // Get the icon and hover over it
      const secondIcon = secondTextField.locator('tds-icon[name="edit_inactive"]');
      await expect(secondIcon).toBeVisible();
      await secondIcon.hover();

      // Expect to see the tooltip text (within the second text-field component)
      await expect(secondTextField.getByText('This field is non-editable')).toBeVisible();

      // Get the THIRD tds-text-field component
      const thirdTextField = page.locator('tds-text-field[tds-aria-label="third-text-field"]');
      await expect(thirdTextField).toBeVisible();

      // Get the icon and hover over it
      const thirdIcon = thirdTextField.locator('tds-icon[name="edit_inactive"]');
      await expect(thirdIcon).toBeVisible();
      await thirdIcon.hover();

      // Expect to see the tooltip text (within the third text-field component)
      await expect(thirdTextField.getByText('This field is non-editable')).toBeVisible();
    });
  });
});
