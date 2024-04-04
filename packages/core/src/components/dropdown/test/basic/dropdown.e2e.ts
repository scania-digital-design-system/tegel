import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/dropdown/test/basic/index.html';

test.describe.parallel('tds-dropdown-basic', () => {
  test('renders basic dropdown correctly', async ({ page }) => {
    await page.goto(componentTestPath);
    const dropdown = page.getByTestId('tds-dropdown-testid');
    await expect(dropdown).toHaveCount(1);

    /* check diff in screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('should find label and not exist', async ({ page }) => {
    await page.goto(componentTestPath);
    const labelText = page.getByText(/Label text/);
    await expect(labelText).toHaveCount(0);
  });

  test('find helper text and check not exist', async ({ page }) => {
    await page.goto(componentTestPath);
    const helperText = page.getByText(/Helper text/);
    await expect(helperText).toHaveCount(0);
  });

  test('have the button to be visible', async ({ page }) => {
    await page.goto(componentTestPath);
    const dropdownButton = page.getByRole('button').first();
    await expect(dropdownButton).toBeVisible();
  });

  test('clicking the dropdown button opens the dropdown-list', async ({ page }) => {
    await page.goto(componentTestPath);
    const dropdownButton = page.getByRole('button').first();
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
});
