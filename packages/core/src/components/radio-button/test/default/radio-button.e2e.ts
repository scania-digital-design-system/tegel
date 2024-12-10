import { expect } from '@playwright/test';
import { test } from 'stencil-playwright';

const componentTestPath = 'src/components/radio-button/test/default/index.html';

test.describe.parallel('TdsRadioButton component tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the index.html page where your component is rendered
    // Adjust the path to the index.html as necessary based on your project structure
    await page.goto(componentTestPath);
  });

  test('Radio buttons with Label text = "Label text 1" and "Label text 2" render on the page', async ({
    page,
  }) => {
    const radioButton1 = page.locator('tds-radio-button', { hasText: 'Label text 1' });
    const radioButton2 = page.locator('tds-radio-button', { hasText: 'Label text 2' });
    await expect(radioButton1).toBeVisible();
    await expect(radioButton2).toBeVisible();
    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0 });
  });

  test('"Label text 1" radio button is not disabled and can be clicked', async ({ page }) => {
    const labelText1 = page.locator('input[id="option-1"]');
    await labelText1.hover();
    await expect(labelText1).toBeEnabled();
  });

  test('"Label text 2" radio button is not disabled and can be clicked', async ({ page }) => {
    const labelText2 = page.locator('input[id="option-2"]');
    await labelText2.hover();
    await expect(labelText2).toBeEnabled();
  });

  test('1st radio button is button is checked', async ({ page }) => {
    const checkedLabel1RadioButton = page.locator('input[id="option-1"]');
    const isChecked = await checkedLabel1RadioButton.evaluate(
      (node: HTMLInputElement) => node.checked,
    );
    expect(isChecked).toBeTruthy();
  });

  test('Clicking "Label text 2" radio button changes checked state appropriately', async ({
    page,
  }) => {
    const labelText2 = page.locator('text=Label text 2');
    await labelText2.click();
    const radio1 = page.locator('input[id="option-1"]');
    const radio2 = page.locator('input[id="option-2"]');

    // "Label text 1" becomes unchecked
    const radio1checkedStatus = await radio1.evaluate((node: HTMLInputElement) => node.checked);
    expect(radio1checkedStatus).toBeFalsy();

    // "Label text 2" becomes checked
    const radio2checkedStatus = await radio2.evaluate((node: HTMLInputElement) => node.checked);
    expect(radio2checkedStatus).toBeTruthy();
  });
});
