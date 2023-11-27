import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/dropdown/test/default/index.html';

test.describe('tds-dropdown-default', () => {
  test('renders default dropdown correctly', async ({ page }) => {
    await page.goto(componentTestPath);
    const dropdown = page.locator('tds-dropdown');
    expect(dropdown).toBeTruthy();
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('default dropdown should have a label outside with text', async ({ page }) => {
    await page.goto(componentTestPath);
    const labelOutside = page.locator('tds-dropdown > div[class="label-outside"]');
    await expect(labelOutside).toHaveText(/Label text/);
  });

  test('default dropdown to have helper text with correct text', async ({ page }) => {
    await page.goto(componentTestPath);
    const helperText = page.locator('tds-dropdown > div[class="helper"]');
    await expect(helperText).toHaveText(/Helper text/);
  });

  test('default dropdown have the placeholder="Placeholder" text', async ({ page }) => {
    await page.goto(componentTestPath);
    const dropdown = page.locator('tds-dropdown');
    const button = dropdown.locator('button');
    const placeholder = button.locator('div[class="placeholder lg"]');
    const textAttribute = await placeholder.textContent();
    expect(textAttribute).toBe('Placeholder');
  });

  test('default dropdown has lg size', async ({ page }) => {
    await page.goto(componentTestPath);
    const dropdown = page.locator('tds-dropdown');
    const dropdownSelect = dropdown.locator('div[class="dropdown-select lg"]');
    expect(dropdownSelect).toBeTruthy();
  });

  test('default clicking the dropdown opens the dropdown-list', async ({ page }) => {
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

  test('default clicking the dropdown opens the dropdown-list, then click an option 1', async ({
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

  test('default clicking the dropdown opens the dropdown-list, then click an option 2 that is disabled should not close it', async ({
    page,
  }) => {
    await page.goto(componentTestPath);
    const dropdown = page.locator('tds-dropdown');
    const dropdownSelect = dropdown.locator('div[class="dropdown-select lg"]');
    const button = dropdownSelect.locator('button');
    await button.click();
    const dropdownOptionOne = dropdown.locator('tds-dropdown-option[value="option-2"]');
    const myEventSpy = await page.spyOnEvent('click');
    await dropdownOptionOne.click();
    expect(myEventSpy).not.toHaveReceivedEvent();
  });
});
