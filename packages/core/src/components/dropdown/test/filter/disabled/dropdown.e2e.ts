import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../../utils/testConfiguration';

const componentTestPath = 'src/components/dropdown/test/filter/disabled/index.html';
const componentName = 'tds-dropdown';
const testDescription = 'tds-dropdown-filter-disabled';

testConfigurations.withModeVariants.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('clicking the dropdown icon does not open the dropdown-list', async ({ page }) => {
      const dropdownButtonIcon = page.locator('.menu-icon');

      const dropdownListElementOne = page
        .locator('tds-dropdown-option')
        .filter({ hasText: 'Option 1' });

      await expect(dropdownListElementOne).toBeHidden();
      /* force a click on the icon. Since the icon is inside of a disabled button playwright will error if it is not forced */
      await dropdownButtonIcon.click({
        force: true,
      });

      /* no child elements should be visible. */
      await expect(dropdownListElementOne).toBeHidden();

      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });
  });
});

test.describe.parallel(componentName, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('clicking the dropdown button does not open the dropdown-list', async ({ page }) => {
    const dropdownButton = page.getByRole('textbox').first();

    /* check that the icon is inside of a disabled element */
    await expect(dropdownButton).toBeDisabled();

    const dropdownListElementOne = page
      .locator('tds-dropdown-option')
      .filter({ hasText: 'Option 1' });

    await expect(dropdownListElementOne).toBeHidden();
    /* force a click on the icon. Since the icon is inside of a disabled button playwright will error if it is not forced */
    await dropdownButton.click({
      force: true,
    });

    /* no child elements should be visible. */
    await expect(dropdownListElementOne).toBeHidden();
  });
});
