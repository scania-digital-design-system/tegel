import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import type { Page } from '@playwright/test';

const componentTestPath = 'src/tests/form-test/index.html';

const defaultFormValues = {
  'tds-datetime': '',
  'tds-dropdown': '',
  'tds-slider': '0',
  'tds-text-field': '',
  'tds-textarea': '',
};

const newFormValues = {
  'tds-checkbox': 'checkbox-1',
  'tds-chip-radio': 'chip-radio-1',
  'tds-chip-checkbox': 'chip-checkbox-1',
  'tds-datetime': '2025-01-01',
  'tds-dropdown': 'dropdown-1',
  'tds-radio-button': 'radio-button-1',
  'tds-slider': '50',
  'tds-text-field': 'Text in text-field',
  'tds-textarea': 'Text in textarea',
  'tds-toggle': 'on',
};

const getFormData = async (page: Page) =>
  page.evaluate(() => {
    const form = document.querySelector('form');
    const newFormData = new FormData(form);
    const data = {};
    newFormData.forEach((value, key) => {
      data[key] = value;
    });
    return data;
  });

const inputToForm = async (page: Page) => {
  await page.locator('tds-checkbox').first().click();
  await page.locator('tds-chip[type="checkbox"]').first().click();
  await page.locator('tds-radio-button').first().locator('input').first().click();
  await page.locator('tds-chip[type="radio"]').first().click();

  await page
    .locator('tds-text-field')
    .first()
    .locator('input')
    .first()
    .fill(newFormValues['tds-text-field']);

  await page
    .locator('tds-textarea')
    .first()
    .locator('textarea')
    .first()
    .fill(newFormValues['tds-textarea']);

  await page
    .locator('tds-datetime')
    .first()
    .locator('input')
    .first()
    .fill(newFormValues['tds-datetime']);

  await page.locator('tds-toggle').first().locator('input').first().check();

  await page.evaluate(() => {
    document
      .getElementsByTagName('tds-dropdown')[0]
      .shadowRoot.querySelectorAll('button')[0]
      .click();
  });

  await page.evaluate(() => {
    document
      .getElementsByTagName('tds-dropdown-option')[0]
      .shadowRoot.querySelectorAll('button')[0]
      .click();
  });

  await page.evaluate(() => {
    document.getElementsByTagName('tds-slider')[0].value = '50';
  });
};

const valueMissing = (el: HTMLInputElement) => el.validity.valueMissing;

test.describe.parallel('form-test', () => {
  test('fill-form-and-reset', async ({ page }) => {
    await page.goto(componentTestPath);

    const submitButton = page.locator('tds-button[type="submit"]');
    const resetButton = page.locator('tds-button[type="reset"]');

    // input values to the form
    await inputToForm(page);
    await submitButton.click();
    const formData = await getFormData(page);

    // expect values to have changed
    expect(formData).toEqual(newFormValues);
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });

    // reset form
    await resetButton.click();
    await page.waitForTimeout(500);
    const resetFormData = await getFormData(page);

    // expect form to be reset to default values
    expect(resetFormData).toEqual(defaultFormValues);
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('click-submit-with-missing-required-inputs', async ({ page }) => {
    await page.goto(componentTestPath);
    const submitButton = page.locator('tds-button[type="submit"]');
    await submitButton.click();

    // Test value missing on required checkbox:
    const checkbox = page.locator('tds-checkbox').first();
    const checkboxInput = checkbox.locator('input').first();
    let valueIsMissing = await checkboxInput.evaluate(valueMissing);
    expect(valueIsMissing).toBe(true);
    await checkbox.click();
    await submitButton.click();
    valueIsMissing = await checkboxInput.evaluate(valueMissing);
    expect(valueIsMissing).toBe(false);

    // Test value missing on required radio-button:
    const radioButton = page.locator('tds-radio-button').first().locator('input').first();
    valueIsMissing = await radioButton.evaluate(valueMissing);
    expect(valueIsMissing).toBe(true);
    await radioButton.click();
    await submitButton.click();
    valueIsMissing = await radioButton.evaluate(valueMissing);
    expect(valueIsMissing).toBe(false);

    // Test value missing on required text-field:
    const textField = page.locator('tds-text-field').first().locator('input').first();
    valueIsMissing = await textField.evaluate(valueMissing);
    expect(valueIsMissing).toBe(true);
    await textField.fill(newFormValues['tds-text-field']);
    await submitButton.click();
    valueIsMissing = await textField.evaluate(valueMissing);
    expect(valueIsMissing).toBe(false);

    // Test value missing on required toggle:
    const toggle = page.locator('tds-toggle').first().locator('input').first();
    valueIsMissing = await toggle.evaluate(valueMissing);
    expect(valueIsMissing).toBe(true);
    await toggle.check();
    await submitButton.click();
    valueIsMissing = await toggle.evaluate(valueMissing);
    expect(valueIsMissing).toBe(false);
  });
});
