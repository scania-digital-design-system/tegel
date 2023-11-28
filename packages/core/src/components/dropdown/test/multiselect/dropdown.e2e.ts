import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/dropdown/test/multiselect/index.html';

test.describe('tds-dropdown-multiselect', () => {
  test('renders multiselect dropdown correctly', async ({ page }) => {
    await page.goto(componentTestPath);
    const dropdown = page.getByTestId('tds-dropdown-testid');
    await expect(dropdown).toHaveCount(1);

    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('clicking the dropdown opens the dropdown-list, then click Option 1, should not close it', async ({
    page,
  }) => {
    await page.goto(componentTestPath);

    /* click the button */
    const placeholderElement = page.getByText(/Placeholder/);
    await placeholderElement.click();

    /* make sure dropdown list is visible */
    const dropdownOptionOne = page.getByTestId(/tds-dropdown-option-1/);
    await expect(dropdownOptionOne).toBeVisible();

    /* check so only one "Option 1" text exists */
    const option1Element = page.getByText(/Option 1/);
    await expect(option1Element).toHaveCount(1);

    /* Click Option 1 element */
    await dropdownOptionOne.click();

    /* Check so its dropdown list is not visible anymore and there now 2 "Option 1" texts in the dom */
    await expect(dropdownOptionOne).toBeVisible();
    await expect(option1Element).toHaveCount(2);

    /* also check screenshot diff to make sure it says Option 1 */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('clicking the dropdown opens the dropdown-list, then click on all the options', async ({
    page,
  }) => {
    await page.goto(componentTestPath);

    /* click the button */
    const placeholderElement = page.getByText(/Placeholder/);
    await placeholderElement.click();

    /* get all checkboxes */
    const dropdownOptionOne = page.getByTestId(/tds-dropdown-option-1/).locator('tds-checkbox');
    const dropdownOptionTwo = page.getByTestId(/tds-dropdown-option-2/).locator('tds-checkbox');
    const dropdownOptionThree = page.getByTestId(/tds-dropdown-option-3/).locator('tds-checkbox');
    const dropdownOptionFour = page.getByTestId(/tds-dropdown-option-4/).locator('tds-checkbox');
    await expect(dropdownOptionOne).toHaveCount(1);
    await expect(dropdownOptionTwo).toHaveCount(1);
    await expect(dropdownOptionThree).toHaveCount(1);
    await expect(dropdownOptionFour).toHaveCount(1);

    /* check each one and see that it updates correctly */
    await dropdownOptionOne.click();
    await expect(dropdownOptionOne).toHaveAttribute('checked');
    await expect(dropdownOptionTwo).not.toHaveAttribute('checked');
    await expect(dropdownOptionThree).not.toHaveAttribute('checked');
    await expect(dropdownOptionFour).not.toHaveAttribute('checked');
    const inputText = page.getByText(/Option 1/);
    await expect(inputText).toHaveCount(2);

    await dropdownOptionTwo.click();
    await expect(dropdownOptionOne).toHaveAttribute('checked');
    await expect(dropdownOptionTwo).not.toHaveAttribute('checked');
    await expect(dropdownOptionThree).not.toHaveAttribute('checked');
    await expect(dropdownOptionFour).not.toHaveAttribute('checked');
    await expect(inputText).toHaveCount(2);

    await dropdownOptionThree.click();
    await expect(dropdownOptionOne).toHaveAttribute('checked');
    await expect(dropdownOptionTwo).not.toHaveAttribute('checked');
    await expect(dropdownOptionThree).toHaveAttribute('checked');
    await expect(dropdownOptionFour).not.toHaveAttribute('checked');
    const inputText2 = page.getByText(/Option 1,Option 3/, { exact: true });
    await expect(inputText2).toHaveCount(1);

    await dropdownOptionFour.click();
    await expect(dropdownOptionOne).toHaveAttribute('checked');
    await expect(dropdownOptionTwo).not.toHaveAttribute('checked');
    await expect(dropdownOptionThree).toHaveAttribute('checked');
    await expect(dropdownOptionFour).toHaveAttribute('checked');
    const inputText3 = page.getByText(/Option 1,Option 3,Option 4/, { exact: true });
    await expect(inputText3).toHaveCount(1);

    /* also check screenshot diff to make sure */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('clicking the dropdown opens the dropdown-list, then click an option 2 that is disabled should not close it', async ({
    page,
  }) => {
    await page.goto(componentTestPath);
    const dropdownOptionTwo = page.getByTestId(/tds-dropdown-option-2/);
    const placeholderElement = page.getByText(/Placeholder/);

    /* before clicking dropdownlist should not be visible, the button should be */
    await expect(placeholderElement).toBeVisible();
    await expect(dropdownOptionTwo).not.toBeVisible();

    /* after clicking dropdownlist should be visible, the button should also be */
    await placeholderElement.click();
    await expect(placeholderElement).toBeVisible();
    await expect(dropdownOptionTwo).toBeVisible();

    /* after clicking option 2 that is disabled list should be visible and also button should be */
    await dropdownOptionTwo.click();
    await expect(placeholderElement).toBeVisible();
    await expect(dropdownOptionTwo).toBeVisible();
  });
});
