import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/dropdown/test/multiselect/index.html';

test.describe.parallel('tds-dropdown-multiselect-filter', () => {
  test('When focusing on the input it should clear itself', async ({ page }) => {
    await page.goto(componentTestPath);

    // Click the dropdown button
    const dropdownButton = page.getByRole('button', { name: 'Placeholder' });
    await dropdownButton.click();

    const dropdownListElementOneButton = page
      .getByText(/Option 1/)
      .filter({ has: page.getByRole('checkbox') });

    await expect(dropdownListElementOneButton).toHaveCount(1);

    await dropdownListElementOneButton.click();
    await expect(dropdownListElementOneButton).toHaveAttribute('aria-selected');

    const inputText = page.getByRole('button', { name: /Option 1/ });
    await expect(inputText).toHaveCount(1);

    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });
});
