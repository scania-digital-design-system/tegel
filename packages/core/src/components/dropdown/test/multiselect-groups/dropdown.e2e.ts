import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../utils/testConfiguration';

const componentTestPath = 'src/components/dropdown/test/multiselect-groups/index.html';
const componentName = 'tds-dropdown';
const testDescription = 'tds-dropdown-multiselect-groups';

testConfigurations.basic.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('shows collapsed group label when all enabled children are selected', async ({ page }) => {
      const dropdown = page.getByTestId('tds-dropdown-testid');
      const inputElement = page.getByRole('textbox');

      await inputElement.click();
      await page.getByRole('checkbox', { name: 'Trucks' }).click();

      await expect(page.getByRole('checkbox', { name: 'R-series' })).toBeChecked();
      await expect(page.getByRole('checkbox', { name: 'S-series' })).toBeChecked();
      await expect(inputElement).toHaveValue('Trucks');
      await expect(dropdown).toHaveAttribute('value', 'r-series,s-series');
    });

    test('shows disabled selected children individually when enabled group children are fully selected', async ({
      page,
    }) => {
      const inputElement = page.getByRole('textbox');

      await page.evaluate(async () => {
        await customElements.whenDefined('tds-dropdown');
        const dropdown = document.querySelector('tds-dropdown');
        dropdown.value = ['citywide', 'interlink'];
      });

      await expect(inputElement).toHaveValue('Citywide, Interlink');
    });

    test('hides group parent when filter matches no children in the group', async ({ page }) => {
      const inputElement = page.getByRole('textbox');
      const trucksParent = page.locator('tds-dropdown-option[group-parent][value="trucks"]');
      const busesParent = page.locator('tds-dropdown-option[group-parent][value="buses"]');

      await inputElement.click();
      await expect(trucksParent).toBeVisible();
      await expect(busesParent).toBeVisible();

      await inputElement.fill('nomatch');

      await expect(trucksParent).toBeHidden();
      await expect(busesParent).toBeHidden();
    });

    test('shows group parent when filter matches a child in the group', async ({ page }) => {
      const inputElement = page.getByRole('textbox');
      const trucksParent = page.locator('tds-dropdown-option[group-parent][value="trucks"]');
      const busesParent = page.locator('tds-dropdown-option[group-parent][value="buses"]');
      const rSeriesOption = page.locator('tds-dropdown-option[value="r-series"]');

      await inputElement.click();
      await inputElement.fill('R-series');

      await expect(rSeriesOption).toBeVisible();
      await expect(trucksParent).toBeVisible();
      await expect(busesParent).toBeHidden();
    });
  });
});
