import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/dropdown/test/filter/index.html';

test.describe('tds-dropdown-filter', () => {
  test('renders filter dropdown correctly', async ({ page }) => {
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

  test('to have helper text', async ({ page }) => {
    await page.goto(componentTestPath);
    const dropdown = page.locator('tds-dropdown');
    const helperText = dropdown.locator('div[class="helper"]');
    expect(helperText).toBeTruthy();
  });

  test('have the placeholder="Placeholder" text', async ({ page }) => {
    await page.goto(componentTestPath);
    const dropdown = page.locator('tds-dropdown');
    const dropdownSelect = dropdown.locator('div[class="dropdown-select lg"]');
    const input = dropdownSelect.locator('input');
    await expect(input).toHaveAttribute('placeholder', 'Placeholder');
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
    const input = dropdownSelect.locator('input');
    const myEventSpy = await page.spyOnEvent('click');
    await input.click();
    expect(myEventSpy).toHaveReceivedEvent();
    const dropdownList = dropdown.locator('div[class="dropdown-list lg down label-outside open"]');
    expect(dropdownList).toBeTruthy();
  });

  test('clicking the dropdown opens the dropdown-list, then click an option 1', async ({
    page,
  }) => {
    await page.goto(componentTestPath);
    const dropdown = page.locator('tds-dropdown');
    const dropdownSelect = dropdown.locator('div[class="dropdown-select lg"]');
    const input = dropdownSelect.locator('input');
    await input.click();
    const dropdownOptionOne = dropdown.locator('tds-dropdown-option[value="option-1"]');
    await dropdownOptionOne.click();
    await expect(dropdown).toHaveAttribute('value', 'option-1');
  });

  test('clicking the dropdown opens the dropdown-list, then click an option 2 that is disabled should not close it', async ({
    page,
  }) => {
    await page.goto(componentTestPath);
    const dropdown = page.locator('tds-dropdown');
    const dropdownSelect = dropdown.locator('div[class="dropdown-select lg"]');
    const input = dropdownSelect.locator('input');
    await input.click();
    const dropdownOptionTwo = dropdown.locator('tds-dropdown-option[value="option-2"]');
    const myEventSpy = await page.spyOnEvent('click');
    await dropdownOptionTwo.click();
    expect(myEventSpy).not.toHaveReceivedEvent();
  });

  test('clicking the dropdown opens the dropdown-list, then start typing "Option 1" to only show that option in the dropdown list', async ({
    page,
  }) => {
    await page.goto(componentTestPath);
    const dropdown = page.locator('tds-dropdown');
    const dropdownSelect = dropdown.locator('div[class="dropdown-select lg"]');
    const input = dropdownSelect.locator('input');
    await input.click();
    await input.fill('Option 1');
    const dropdownOptionOne = dropdown.locator('tds-dropdown-option[value="option-1"]');
    await expect(dropdownOptionOne).not.toHaveAttribute('hidden');
    const dropdownOptionTwo = dropdown.locator('tds-dropdown-option[value="option-2"]');
    await expect(dropdownOptionTwo).toHaveAttribute('hidden');
    const dropdownOptionThree = dropdown.locator('tds-dropdown-option[value="option-3"]');
    await expect(dropdownOptionThree).toHaveAttribute('hidden');
    const dropdownOptionFour = dropdown.locator('tds-dropdown-option[value="option-4"]');
    await expect(dropdownOptionFour).toHaveAttribute('hidden');
  });
});
