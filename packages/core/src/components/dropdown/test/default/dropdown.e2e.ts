import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/dropdown/test/default/index.html';

test.describe.parallel('tds-dropdown-default', () => {
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
    const dropdownButton = page.getByRole('button', { name: 'Placeholder' });
    await expect(dropdownButton).toBeVisible();
  });

  test('clicking the dropdown button opens the dropdown-list', async ({ page }) => {
    await page.goto(componentTestPath);
    const dropdownButton = page.getByRole('button', { name: 'Placeholder' });
    const dropdownListElementOne = page
      .locator('tds-dropdown-option')
      .filter({ hasText: 'Option 1' });
    await expect(dropdownListElementOne).toBeHidden();
    await dropdownButton.click();

    /* before clicking dropdownlist should not be visible, the button should be */
    await expect(dropdownButton).toBeVisible();
    await expect(dropdownListElementOne).toBeVisible();

    /* checks diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('clicking the dropdown opens the dropdown-list, then click Option 1', async ({ page }) => {
    await page.goto(componentTestPath);

    /* click the dropdown button */
    const dropdownButton = page.getByRole('button', { name: 'Placeholder' });
    await dropdownButton.click();

    /* Click the Option 1 button */
    const dropdownListElementOneButton = page
      .locator('tds-dropdown-option')
      .filter({ hasText: /Option 1/ })
      .getByRole('button');
    await dropdownListElementOneButton.click();

    await expect(dropdownListElementOneButton).toBeHidden();
    const dropdownButtonWithOption1 = page.getByRole('button', { name: 'Option 1' });
    await expect(dropdownButtonWithOption1.first()).toBeVisible();

    /* also check screenshot diff to make sure it says Option 1 */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('clicking the dropdown opens the dropdown-list, then click an option 2 that is disabled should not close it', async ({
    page,
  }) => {
    await page.goto(componentTestPath);
    const dropdownListElementTwoButton = page
      .locator('tds-dropdown-option')
      .filter({ hasText: /Option 2/ });
    const dropdownButtonElement = page.getByRole('button', { name: 'Placeholder' });

    /* before clicking dropdownlist should not be visible, the button should be */
    await expect(dropdownButtonElement).toBeVisible();
    await expect(dropdownListElementTwoButton).toBeHidden();

    /* after clicking dropdownlist should be visible, the button should also be */
    await dropdownButtonElement.click();
    await expect(dropdownButtonElement).toBeVisible();
    await expect(dropdownListElementTwoButton).toBeVisible();

    /* after clicking option 2 that is disabled list should be visible and also button should be */
    await dropdownListElementTwoButton.click();
    await expect(dropdownButtonElement).toBeVisible();
    await expect(dropdownListElementTwoButton).toBeVisible();
  });
});
