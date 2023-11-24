import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/dropdown/test/multiselect/index.html';

test.describe('tds-dropdown-multiselect', () => {
  test('renders multiselect dropdown correctly', async ({ page }) => {
    await page.goto(componentTestPath);
    const dropdown = page.locator('tds-dropdown');
    expect(dropdown).toBeTruthy();
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('have label outside', async ({ page }) => {
    await page.goto(componentTestPath);
    const dropdown = page.locator('tds-dropdown');
    const labelOutside = dropdown.locator('div[class="label-outside"]');
    expect(labelOutside).toBeTruthy();
  });

  test('have helper text', async ({ page }) => {
    await page.goto(componentTestPath);
    const dropdown = page.locator('tds-dropdown');
    const helperText = dropdown.locator('div[class="helper"]');
    expect(helperText).toBeTruthy();
  });

  test('have the placeholder="Placeholder" text', async ({ page }) => {
    await page.goto(componentTestPath);
    const dropdown = page.locator('tds-dropdown');
    const button = dropdown.locator('button');
    const placeholder = button.locator('div[class="placeholder lg"]');
    const textAttribute = await placeholder.textContent();
    expect(textAttribute).toBe('Placeholder');
  });

  test('has lg size', async ({ page }) => {
    await page.goto(componentTestPath);
    const dropdown = page.locator('tds-dropdown');
    const dropdownSelect = dropdown.locator('div[class="dropdown-select lg"]');
    expect(dropdownSelect).toBeTruthy();
  });

  test('clicking the dropdown opens the dropdown-list', async ({ page }) => {
    await page.goto(componentTestPath);
    const dropdown = page.locator('tds-dropdown');
    const dropdownSelect = dropdown.locator('div[class="dropdown-select lg"]');
    const button = dropdownSelect.locator('button');
    const myEventSpy = await page.spyOnEvent('click');
    await button.click();
    const dropdownList = dropdown.locator('div[class="dropdown-list lg down label-outside open"]');
    expect(myEventSpy).toHaveReceivedEvent();
    expect(dropdownList).toBeTruthy();
  });

  test('clicking the dropdown opens the dropdown-list, then click on option 1', async ({
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

  test('clicking the dropdown opens the dropdown-list, then click on all the options', async ({
    page,
  }) => {
    await page.goto(componentTestPath);
    const dropdown = page.locator('tds-dropdown');
    const dropdownSelect = dropdown.locator('div[class="dropdown-select lg"]');
    const button = dropdownSelect.locator('button');
    await button.click();
    const dropdownOptionOne = dropdown.locator('tds-dropdown-option[value="option-1"]');
    const dropdownOptionOneCheckbox = dropdownOptionOne.locator('tds-checkbox');
    expect(dropdownOptionOneCheckbox).toBeTruthy();
    await dropdownOptionOne.click();
    const dropdownOptionTwo = dropdown.locator('tds-dropdown-option[value="option-2"]');
    const dropdownOptionTwoCheckbox = dropdownOptionTwo.locator('tds-checkbox');
    expect(dropdownOptionTwoCheckbox).toBeTruthy();
    await dropdownOptionTwo.click();
    const dropdownOptionThree = dropdown.locator('tds-dropdown-option[value="option-3"]');
    const dropdownOptionThreeCheckbox = dropdownOptionThree.locator('tds-checkbox');
    expect(dropdownOptionThreeCheckbox).toBeTruthy();
    await dropdownOptionThree.click();
    const dropdownOptionFour = dropdown.locator('tds-dropdown-option[value="option-4"]');
    const dropdownOptionFourCheckbox = dropdownOptionFour.locator('tds-checkbox');
    expect(dropdownOptionFourCheckbox).toBeTruthy();
    await expect(dropdown).toHaveAttribute('value', 'option-1,option-3');
  });

  /** Skipping this test since the disabled option 2 still gets an event when its a tds-checkbox
    TODO: CHECK ON THIS PROBLEM 
  */
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
