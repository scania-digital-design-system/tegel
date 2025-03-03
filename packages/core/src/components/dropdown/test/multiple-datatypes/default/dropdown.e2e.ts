import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/dropdown/test/multiple-datatypes/default/index.html';

test.describe('tds-dropdown-multiple-datatypes', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('handles both text and numeric values as strings', async ({ page }) => {
    // Open dropdown
    await page.locator('tds-dropdown').click();

    // Test text value option
    const textOption = page.locator('tds-dropdown-option').filter({ hasText: 'Text value option' });
    const textSelectPromise = page.waitForEvent('console', (msg) =>
      msg.text().includes('Selected value:'),
    );
    const textChangePromise = page.waitForEvent('console', (msg) =>
      msg.text().includes('Changed value:'),
    );

    await textOption.click();

    const textSelectMessage = await textSelectPromise;
    const textChangeMessage = await textChangePromise;

    expect(textSelectMessage.text()).toBe('Selected value: text-value type: string');
    expect(textChangeMessage.text()).toBe('Changed value: text-value type: string');

    // Open dropdown again
    await page.locator('tds-dropdown').click();

    // Test numeric value option
    const numericOption = page
      .locator('tds-dropdown-option')
      .filter({ hasText: 'Numeric value option' });
    const numericSelectPromise = page.waitForEvent('console', (msg) =>
      msg.text().includes('Selected value:'),
    );
    const numericChangePromise = page.waitForEvent('console', (msg) =>
      msg.text().includes('Changed value:'),
    );

    await numericOption.click();

    const numericSelectMessage = await numericSelectPromise;
    const numericChangeMessage = await numericChangePromise;

    expect(numericSelectMessage.text()).toBe('Selected value: 123 type: string');
    expect(numericChangeMessage.text()).toBe('Changed value: 123 type: string');
  });
});
