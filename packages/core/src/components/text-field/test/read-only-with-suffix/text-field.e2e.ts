import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/text-field/test/read-only-with-suffix/index.html';
const testDescription = 'TdsTextField - readOnly prop effect';

test.describe.parallel(testDescription, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('should hide the suffix icon when readOnly is true', async ({ page }) => {
    const suffixIcon = await page.locator('.text-field-slot-wrap-suffix');
    await expect(suffixIcon).toBeHidden();
  });
});
