import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/dropdown/test/multiple-datatypes/multiselect/index.html';

let dropdownListElementOneButton;
let dropdownListElementTwoButton;
let dropdownListElementThreeButton;
let dropdownListElementFourButton;

test.describe.parallel('tds-dropdown-multiple-datatypes-multiselect', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);

    /* click the dropdown button */
    const dropdownButton = page.getByRole('button', { name: 'Placeholder' });
    await dropdownButton.click();

    /* get all dropdown options */
    dropdownListElementOneButton = page
      .getByText(/Option 1 - string/)
      .filter({ has: page.getByRole('checkbox') });
    dropdownListElementTwoButton = page
      .getByText(/Option 2 - number/)
      .filter({ has: page.getByRole('checkbox') });
    dropdownListElementThreeButton = page
      .getByText(/Option 3 - string/)
      .filter({ has: page.getByRole('checkbox') });
    dropdownListElementFourButton = page
      .getByText(/Option 4 - number/)
      .filter({ has: page.getByRole('checkbox') });

    await expect(dropdownListElementOneButton).toHaveCount(1);
    await expect(dropdownListElementTwoButton).toHaveCount(1);
    await expect(dropdownListElementThreeButton).toHaveCount(1);
    await expect(dropdownListElementFourButton).toHaveCount(1);

    /* change the values to numbers for relevant dropdown options */
    await page.evaluate(() => {
      const twoButtonInEvaluate = document.getElementsByTagName('tds-dropdown-option')[1];
      twoButtonInEvaluate.value = 2;
      const fourButtonInEvaluate = document.getElementsByTagName('tds-dropdown-option')[3];
      fourButtonInEvaluate.value = 4;
    });
  });

  test('click dropdown option with string data type value', async ({ page }) => {
    /* set objects for console logs for tdsSelect and tdsChange */
    const firstMessage = page.waitForEvent('console', (msg) => msg.text().includes('tdsSelect'));
    const secondMessage = page.waitForEvent('console', (msg) => msg.text().includes('tdsChange'));

    /* click a string dropdown option button */
    await dropdownListElementOneButton.click();

    /* expect specific tdsSelect and tdsChange messages, based on code in index.html */
    expect((await firstMessage).text()).toBe('tdsSelect - event.detail.value: 1 (string)');
    expect((await secondMessage).text()).toBe('tdsChange - event.detail.value: [1] (1: string)');
  });

  test('click dropdown option with number data type value', async ({ page }) => {
    /* set objects for console logs for tdsSelect and tdsChange */
    const firstMessage = page.waitForEvent('console', (msg) => msg.text().includes('tdsSelect'));
    const secondMessage = page.waitForEvent('console', (msg) => msg.text().includes('tdsChange'));

    /* click a number dropdown option button */
    await dropdownListElementTwoButton.click();

    /* expect specific tdsSelect and tdsChange messages, based on code in index.html */
    expect((await firstMessage).text()).toBe('tdsSelect - event.detail.value: 2 (number)');
    expect((await secondMessage).text()).toBe('tdsChange - event.detail.value: [2] (2: number)');
  });

  test('click dropdown options with mixed data type values', async ({ page }) => {
    /* click all buttons except the last one, without looking for a console log message */
    await dropdownListElementOneButton.click();
    await dropdownListElementTwoButton.click();
    await dropdownListElementThreeButton.click();

    /* set objects for console logs for tdsSelect and tdsChange */
    const firstMessage = page.waitForEvent('console', (msg) => msg.text().includes('tdsSelect'));
    const secondMessage = page.waitForEvent('console', (msg) => msg.text().includes('tdsChange'));

    /* click the fourth dropdown option button after clicking the other ones */
    await dropdownListElementFourButton.click();

    /* expect specific tdsSelect and tdsChange messages, based on code in index.html */
    expect((await firstMessage).text()).toBe('tdsSelect - event.detail.value: 4 (number)');
    expect((await secondMessage).text()).toBe(
      'tdsChange - event.detail.value: [1, 2, 3, 4] (1: string, 2: number, 3: string, 4: number)',
    );
  });
});
