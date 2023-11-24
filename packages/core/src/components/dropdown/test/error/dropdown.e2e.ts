import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/dropdown/test/error/index.html';

test.describe('tds-dropdown-error', () => {
  test('renders error dropdown correctly', async ({ page }) => {
    await page.goto(componentTestPath);
    const dropdown = page.locator('tds-dropdown');
    expect(dropdown).toBeTruthy();
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('label outside', async ({ page }) => {
    await page.goto(componentTestPath);
    const dropdown = page.locator('tds-dropdown');
    const labelOutside = dropdown.locator('div[class="label-outside"]');
    expect(labelOutside).toBeTruthy();
  });

  test('helper text with error icon', async ({ page }) => {
    await page.goto(componentTestPath);
    const dropdown = page.locator('tds-dropdown');
    const helperText = dropdown.locator('div[class="helper error"]');
    expect(helperText).toBeTruthy();
    const helperErrorIcon = helperText.locator('tds-icon[name="error"]');
    expect(helperErrorIcon).toBeTruthy();
  });

  test('the placeholder="Placeholder" text', async ({ page }) => {
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

  test('clicking the dropdown opens the dropdown-list, then click an option 1', async ({
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

  test('clicking the dropdown opens the dropdown-list, then click an option 2 that is disabled should not close it', async ({
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
