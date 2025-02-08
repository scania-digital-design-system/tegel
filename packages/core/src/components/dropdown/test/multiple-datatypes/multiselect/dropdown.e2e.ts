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
    /* set expected console log message, based on what is defined in index.html */
    page.on('console', (msg) =>
      expect(msg.text()).toBe('tdsChange - event.detail.value: [1] (1: string)'),
    );

    await dropdownListElementOneButton.click();
  });

  test('click dropdown option with number data type value', async ({ page }) => {
    /* set expected console log message, based on what is defined in index.html */
    page.on('console', (msg) =>
      expect(msg.text()).toBe('tdsChange - event.detail.value: [2] (2: number)'),
    );

    await dropdownListElementTwoButton.click();
  });

  test('click dropdown options with mixed data type values', async ({ page }) => {
    /* click all buttons except the last one, without looking for a console log message */
    await dropdownListElementOneButton.click();
    await dropdownListElementTwoButton.click();
    await dropdownListElementThreeButton.click();

    /* set expected console log message, based on what is defined in index.html */
    page.on('console', (msg) =>
      expect(msg.text()).toBe(
        'tdsChange - event.detail.value: [1, 2, 3, 4] (1: string, 2: number, 3: string, 4: number)',
      ),
    );

    await dropdownListElementFourButton.click();
  });
});
