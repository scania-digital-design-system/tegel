import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/dropdown/test/filter/index.html';

test.describe('tds-dropdown', () => {
  test('renders filter dropdown correctly', async ({ page }) => {
    await page.goto(componentTestPath);
    const dropdown = page.locator('tds-dropdown');
    await expect(dropdown).toHaveClass(/hydrated/);
    await expect(dropdown).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('filter dropdown have label outside', async ({ page }) => {
    await page.goto(componentTestPath);
    const dropdown = page.locator('tds-dropdown');
    const labelOutside = dropdown.locator('div[class="label-outside"]');
    expect(labelOutside).not.toBeNull();
  });

  test('filter dropdown to have helper text', async ({ page }) => {
    await page.goto(componentTestPath);
    const dropdown = page.locator('tds-dropdown');
    const helperText = dropdown.locator('div[class="helper"]');
    expect(helperText).not.toBeNull();
  });

  test('filter dropdown have the placeholder="Placeholder" text', async ({ page }) => {
    await page.goto(componentTestPath);
    const dropdown = page.locator('tds-dropdown');
    const dropdownSelect = dropdown.locator('div[class="dropdown-select lg"]');
    const input = dropdownSelect.locator('input');
    await expect(input).toHaveAttribute('placeholder', 'Placeholder');
  });

  test('filter dropdown has lg size', async ({ page }) => {
    await page.goto(componentTestPath);
    const dropdown = page.locator('tds-dropdown');
    const dropdownSelect = dropdown.locator('div[class="dropdown-select lg"]');
    expect(dropdownSelect).not.toBeNull();
  });

  test('filter clicking the dropdown opens the dropdown-list', async ({ page }) => {
    await page.goto(componentTestPath);
    const dropdown = page.locator('tds-dropdown');
    const dropdownSelect = dropdown.locator('div[class="dropdown-select lg"]');
    const input = dropdownSelect.locator('input');
    const myEventSpy = await page.spyOnEvent('click');
    await input.click();
    expect(myEventSpy).toHaveReceivedEvent();
    const dropdownList = dropdown.locator('div[class="dropdown-list lg down label-outside open"]');
    expect(dropdownList).not.toBeNull();
  });

  test('filter clicking the dropdown opens the dropdown-list, then click an option 1', async ({
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

  test('filter clicking the dropdown opens the dropdown-list, then click an option 2 that is disabled should not close it', async ({
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

  test('filter clicking the dropdown opens the dropdown-list, then start typing "Option 1" to only show that option in the dropdown list', async ({
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
