import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/dropdown/test/multiple-datatypes/default/index.html';

let dropdownListElementOneButton;
let dropdownListElementTwoButton;

let firstMessage;
let secondMessage;

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

    /* set objects for console logs for tdsSelect and tdsChange */
    firstMessage = page.waitForEvent('console', (msg) => msg.text().includes('tdsSelect'));
    secondMessage = page.waitForEvent('console', (msg) => msg.text().includes('tdsChange'));
  });

  test('click dropdown option with string data type value', async () => {
    /* click a string dropdown option button */
    await dropdownListElementOneButton.click();

    /* expect specific tdsSelect and tdsChange messages, based on code in index.html */
    expect((await firstMessage).text()).toBe('tdsSelect - event.detail.value: 1 (string)');
    expect((await secondMessage).text()).toBe('tdsChange - event.detail.value: [1] (string)');
  });

  test('click dropdown option with number data type value', async () => {
    /* click a string dropdown option button */
    await dropdownListElementTwoButton.click();

    /* expect specific tdsSelect and tdsChange messages, based on code in index.html */
    expect((await firstMessage).text()).toBe('tdsSelect - event.detail.value: 2 (number)');
    expect((await secondMessage).text()).toBe('tdsChange - event.detail.value: [2] (number)');
  });
});
