import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/dropdown/test/error/index.html';

test.describe('tds-dropdown-error', () => {
  test('renders error dropdown correctly', async ({ page }) => {
    await page.goto(componentTestPath);
    const dropdown = page.getByTestId('tds-dropdown-testid');
    await expect(dropdown).toHaveCount(1);

    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('find helper text and check if visible and have icon', async ({ page }) => {
    await page.goto(componentTestPath);
    const helperText = page.getByText(/Helper text/);
    await expect(helperText).toBeVisible();
    const helperTextIcon = helperText.locator('tds-icon');
    await expect(helperTextIcon).toHaveCount(1);
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
});
