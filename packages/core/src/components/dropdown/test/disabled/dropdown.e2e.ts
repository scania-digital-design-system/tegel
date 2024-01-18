import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/dropdown/test/disabled/index.html';

test.describe('tds-dropdown-disabled', () => {
  

  test('clicking the dropdown icon does not opens the dropdown-list', async ({ page }) => {
    await page.goto(componentTestPath);
    const dropdownButtonIcon = page.locator('tds-icon')

    /* check that the icon is inside of a disabled element */
    await expect(dropdownButtonIcon).toBeDisabled()
    const dropdownListElementOne = page
      .locator('tds-dropdown-option')
      .filter({ hasText: 'Option 1' });
    await expect(dropdownListElementOne).toBeHidden();
    /* force a click on the icon. Since the icon is inside of a disabled button playwright will error if it is not forced */    
    await dropdownButtonIcon.click({
        force: true
    });

    /* no child elements should be visible. */
    await expect(dropdownListElementOne).toBeHidden();

    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });
});
