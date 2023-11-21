import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/dropdown/test/multiselect/index.html';

test.describe('tds-dropdown', () => {
  test('renders multiselect dropdown correctly', async ({ page }) => {
    await page.goto(componentTestPath);
    const dropdown = page.locator('tds-dropdown');
    await expect(dropdown).toHaveClass(/hydrated/);
    await expect(dropdown).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('multiselect dropdown have label outside', async ({ page }) => {
    await page.goto(componentTestPath);
    const dropdown = page.locator('tds-dropdown');
    const labelOutside = dropdown.locator('div[class="label-outside"]');
    expect(labelOutside).not.toBeNull();
  });

  test('multiselect dropdown to have helper text', async ({ page }) => {
    await page.goto(componentTestPath);
    const dropdown = page.locator('tds-dropdown');
    const helperText = dropdown.locator('div[class="helper"]');
    expect(helperText).not.toBeNull();
  });

  test('multiselect dropdown have the placeholder="Placeholder" text', async ({ page }) => {
    await page.goto(componentTestPath);
    const dropdown = page.locator('tds-dropdown');
    const button = dropdown.locator('button');
    const placeholder = button.locator('div[class="placeholder lg"]');
    const textAttribute = await placeholder.textContent();
    expect(textAttribute).toBe('Placeholder');
  });

  test('multiselect dropdown has lg size', async ({ page }) => {
    await page.goto(componentTestPath);
    const dropdown = page.locator('tds-dropdown');
    const dropdownSelect = dropdown.locator('div[class="dropdown-select lg"]');
    expect(dropdownSelect).not.toBeNull();
  });

  test('multiselect clicking the dropdown opens the dropdown-list', async ({ page }) => {
    await page.goto(componentTestPath);
    const dropdown = page.locator('tds-dropdown');
    const dropdownSelect = dropdown.locator('div[class="dropdown-select lg"]');
    const button = dropdownSelect.locator('button');
    const myEventSpy = await page.spyOnEvent('click');
    await button.click();
    const dropdownList = dropdown.locator('div[class="dropdown-list lg down label-outside open"]');
    expect(myEventSpy).toHaveReceivedEvent();
    expect(dropdownList).not.toBeNull();
  });

  test('multiselect clicking the dropdown opens the dropdown-list, then click on option 1', async ({
    page,
  }) => {
    await page.goto(componentTestPath);
    const dropdown = page.locator('tds-dropdown');
    const dropdownSelect = dropdown.locator('div[class="dropdown-select lg"]');
    const button = dropdownSelect.locator('button');
    await button.click();
    const dropdownOptionOne = dropdown.locator('tds-dropdown-option[value="option-1"]');
    await dropdownOptionOne.click();
    await expect(dropdown).toHaveAttribute('value', 'option-1');
  });

  test('multiselect clicking the dropdown opens the dropdown-list, then click on all the options', async ({
    page,
  }) => {
    await page.goto(componentTestPath);
    const dropdown = page.locator('tds-dropdown');
    const dropdownSelect = dropdown.locator('div[class="dropdown-select lg"]');
    const button = dropdownSelect.locator('button');
    await button.click();
    const dropdownOptionOne = dropdown.locator('tds-dropdown-option[value="option-1"]');
    const dropdownOptionOneCheckbox = dropdownOptionOne.locator('tds-checkbox');
    expect(dropdownOptionOneCheckbox).not.toBeNull();
    await dropdownOptionOne.click();
    const dropdownOptionTwo = dropdown.locator('tds-dropdown-option[value="option-2"]');
    const dropdownOptionTwoCheckbox = dropdownOptionTwo.locator('tds-checkbox');
    expect(dropdownOptionTwoCheckbox).not.toBeNull();
    await dropdownOptionTwo.click();
    const dropdownOptionThree = dropdown.locator('tds-dropdown-option[value="option-3"]');
    const dropdownOptionThreeCheckbox = dropdownOptionThree.locator('tds-checkbox');
    expect(dropdownOptionThreeCheckbox).not.toBeNull();
    await dropdownOptionThree.click();
    const dropdownOptionFour = dropdown.locator('tds-dropdown-option[value="option-4"]');
    const dropdownOptionFourCheckbox = dropdownOptionFour.locator('tds-checkbox');
    expect(dropdownOptionFourCheckbox).not.toBeNull();
    await expect(dropdown).toHaveAttribute('value', 'option-1,option-3');
  });

  // Skipping this test since the disabled option 2 still gets an event when its a tds-checkbox
  test.skip('multiselect clicking the dropdown opens the dropdown-list, then click an option 2 that is disabled should not close it', async ({
    page,
  }) => {
    await page.goto(componentTestPath);
    const dropdown = page.locator('tds-dropdown');
    const dropdownSelect = dropdown.locator('div[class="dropdown-select lg"]');
    const button = dropdownSelect.locator('button');
    await button.click();
    const dropdownOptionTwo = dropdown.locator('tds-dropdown-option[value="option-2"]');
    const myEventSpy = await page.spyOnEvent('click');
    await dropdownOptionTwo.click();
    expect(myEventSpy).not.toHaveReceivedEvent();
  });
});
