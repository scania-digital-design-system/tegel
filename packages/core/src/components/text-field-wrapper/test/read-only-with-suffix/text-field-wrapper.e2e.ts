import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/text-field-wrapper/test/read-only-with-suffix/index.html';

test.describe('TdsTextFieldWrapper - readOnly prop effect', () => {
  test('should hide the suffix icon when readOnly is true', async ({ page }) => {
    await page.goto(componentTestPath);
    const suffixIcon = await page.locator('.text-field-slot-wrap-suffix');
    await expect(suffixIcon).toBeHidden();
  });
});
