import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/_form-test/index.html';
let mostRecentConsoleLog;

const inputToForm = async (page) => {
  // checkbox
  await page.locator('tds-checkbox').first().click();

  // chip radio
  await page.locator('tds-chip[type="radio"]').first().click();

  // chip checkbox
  await page.locator('tds-chip[type="checkbox"]').first().click();

  // set value for datetime
  await page.locator('tds-datetime').first().locator('input').first().fill('2025-01-01');

  // select dropdown element
  await page.evaluate(() => {
    document
      .getElementsByTagName('tds-dropdown-option')[0]
      .shadowRoot.querySelectorAll('button')[0]
      .click();
  });

  // select radio button
  await page.locator('tds-radio-button').first().locator('input').first().click();

  // modify slider
  await page.evaluate(() => {
    document.getElementsByTagName('tds-slider')[0].value = '75';
  });

  // fill in text-field
  await page.locator('tds-text-field').first().locator('input').first().fill('Text in text-field');

  // fill in textarea
  await page.locator('tds-textarea').first().locator('textarea').first().fill('Text in textarea');

  // switch toggle
  await page.locator('tds-toggle').first().locator('input').first().check();
};

test.describe.parallel('form-test', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);

    page.on('console', (msg) => {
      mostRecentConsoleLog = msg.text();
    });
  });

  test('submit-form', async ({ page }) => {
    const buttons = await page.locator('tds-button').all();
    const submitButton = buttons[0];
    const resetButton = buttons[1];

    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });

    await submitButton.click();
    expect(mostRecentConsoleLog).toBe(
      `tds-datetime: 
tds-dropdown: 
tds-slider: 50
tds-text-field: 
tds-textarea: 
`,
    );

    await inputToForm(page);

    await submitButton.click();
    expect(mostRecentConsoleLog).toBe(
      `tds-checkbox: checkbox-1
tds-chip-radio: chip-radio-1
tds-chip-checkbox: chip-checkbox-1
tds-datetime: 2025-01-01
tds-dropdown: dropdown-1
tds-radio-button: radio-button-1
tds-slider: 75
tds-text-field: Text in text-field
tds-textarea: Text in textarea
tds-toggle: on
`,
    );

    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });

    await resetButton.click();
    await submitButton.click();
    expect(mostRecentConsoleLog).toBe(
      `tds-datetime: 
tds-dropdown: dropdown-1
tds-slider: 50
tds-text-field: 
tds-textarea: 
`,
    );

    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });
});
