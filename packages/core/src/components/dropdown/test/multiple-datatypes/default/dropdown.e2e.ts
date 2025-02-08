import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/dropdown/test/multiple-datatypes/default/index.html';

let dropdownListElementOneButton;
let dropdownListElementTwoButton;

test.describe.parallel('tds-dropdown-multiple-datatypes-default', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);

    /* click the dropdown button */
    const dropdownButton = page.getByRole('button', { name: 'Placeholder' });
    await dropdownButton.click();

    /* get all dropdown options */
    dropdownListElementOneButton = page
      .locator('tds-dropdown-option')
      .filter({ hasText: /Option 1 - string/ });

    dropdownListElementTwoButton = page
      .locator('tds-dropdown-option')
      .filter({ hasText: /Option 2 - number/ });

    await expect(dropdownListElementOneButton).toHaveCount(1);
    await expect(dropdownListElementTwoButton).toHaveCount(1);

    /* change the values to numbers for relevant dropdown option */
    await page.evaluate(() => {
      const twoButtonInEvaluate = document.getElementsByTagName('tds-dropdown-option')[1];
      twoButtonInEvaluate.value = 2;
    });
  });

  test('click dropdown option with string data type value', async ({ page }) => {
    /* set expected console log message, based on what is defined in index.html */
    page.on('console', (msg) =>
      expect(msg.text()).toBe('tdsChange - event.detail.value: [1] (string)'),
    );

    await dropdownListElementOneButton.click();
  });

  test('click dropdown option with number data type value', async ({ page }) => {
    /* set expected console log message, based on what is defined in index.html */
    page.on('console', (msg) =>
      expect(msg.text()).toBe('tdsChange - event.detail.value: [2] (number)'),
    );

    await dropdownListElementTwoButton.click();
  });
});
