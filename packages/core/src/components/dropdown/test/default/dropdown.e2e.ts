import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/dropdown/test/default/index.html';

test.describe('tds-dropdown-default', () => {
  test('renders default dropdown correctly', async ({ page }) => {
    await page.goto(componentTestPath);
    const dropdown = page.getByTestId('tds-dropdown-testid');
    await expect(dropdown).toHaveCount(1);

    /* check diff in screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('should find label and be visible', async ({ page }) => {
    await page.goto(componentTestPath);
    const labelText = page.getByText(/Label text/);
    await expect(labelText).toBeVisible();
  });

  test('find helper text and check if visible', async ({ page }) => {
    await page.goto(componentTestPath);
    const helperText = page.getByText(/Helper text/);
    await expect(helperText).toBeVisible();
  });

  test('have the placeholder="Placeholder" text', async ({ page }) => {
    await page.goto(componentTestPath);
    const placeholderElement = page.getByText(/Placeholder/);
    await expect(placeholderElement).toBeVisible();
  });

  test('clicking the dropdown opens the dropdown-list', async ({ page }) => {
    await page.goto(componentTestPath);
    const dropdownOptionOne = page.getByTestId(/tds-dropdown-option-1/);
    const placeholderElement = page.getByText(/Placeholder/);

    /* before clicking dropdownlist should not be visible, the button should be */
    await expect(placeholderElement).toBeVisible();
    await expect(dropdownOptionOne).not.toBeVisible();
    await placeholderElement.click();

    /* after clicking dropdownlist should be visible, the button should also be */
    await expect(placeholderElement).toBeVisible();
    await expect(dropdownOptionOne).toBeVisible();
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('clicking the dropdown opens the dropdown-list, then click Option 1', async ({ page }) => {
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
    await expect(dropdownOptionOne).not.toBeVisible();
    await expect(option1Element).toHaveCount(2);

    /* also check screenshot diff to make sure it says Option 1 */
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
