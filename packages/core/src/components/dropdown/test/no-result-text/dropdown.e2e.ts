import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

// Work in progress
test.describe.skip('tds-dropdown', () => {
  test('renders dropdown with no-result-text attribute correctly', async ({ page }) => {
    await page.goto('src/components/dropdown/test/no-result-text/index.html');

    const dropdown1 = page.locator(
      'tds-dropdown[data-testid="dropdown-empty-no-result-text-no-options"]',
    );
    await dropdown1.click();
    await dropdown1.fill('No match');
    await expect(page.locator('.dropdown-content')).toBeVisible();
    await expect(page.locator('.dropdown-content')).toContainText('No results');

    const dropdown2 = page.locator(
      'tds-dropdown[data-testid="dropdown-non-empty-no-result-text-no-options"]',
    );
    await dropdown2.click();
    await dropdown2.fill('No match');
    await expect(page.locator('.dropdown-content')).toBeVisible();
    await expect(page.locator('.dropdown-content')).toContainText('No results found');

    const dropdown3 = page.locator(
      'tds-dropdown[data-testid="dropdown-empty-no-result-text-with-options"]',
    );
    await dropdown3.click();
    await dropdown3.fill('No match');
    await expect(page.locator('.dropdown-content')).toBeVisible();
    await expect(page.locator('.dropdown-content')).toContainText('No results');

    const dropdown4 = page.locator(
      'tds-dropdown[data-testid="dropdown-non-empty-no-result-text-with-options"]',
    );
    await dropdown4.click();
    await dropdown4.fill('No match');
    await expect(page.locator('.dropdown-content')).toBeVisible();
    await expect(page.locator('.dropdown-content')).toContainText('No results found');
  });

  test('renders dropdown with noResultsText property correctly', async ({ page }) => {
    await page.goto('src/components/dropdown/test/no-result-text/index.html');

    const dropdown1 = await page.evaluateHandle(() =>
      document.querySelector('tds-dropdown:nth-child(5)').getAttribute('no-result-text'),
    );
    await page.locator('tds-dropdown:nth-child(5)').click();
    await page.locator('tds-dropdown:nth-child(5)').fill('No match');
    await expect(page.locator('.dropdown-content')).toBeVisible();
    await expect(page.locator('.dropdown-content')).toContainText(await dropdown1.jsonValue());

    const dropdown2 = await page.evaluateHandle(() =>
      document.querySelector('tds-dropdown:nth-child(6)').getAttribute('no-result-text'),
    );
    await page.locator('tds-dropdown:nth-child(6)').click();
    await page.locator('tds-dropdown:nth-child(6)').fill('No match');
    await expect(page.locator('.dropdown-content')).toBeVisible();
    await expect(page.locator('.dropdown-content')).toContainText(await dropdown2.jsonValue());

    const dropdown3 = await page.evaluateHandle(() =>
      document.querySelector('tds-dropdown:nth-child(7)').getAttribute('no-result-text'),
    );
    await page.locator('tds-dropdown:nth-child(7)').click();
    await page.locator('tds-dropdown:nth-child(7)').fill('No match');
    await expect(page.locator('.dropdown-content')).toBeVisible();
    await expect(page.locator('.dropdown-content')).toContainText(await dropdown3.jsonValue());

    const dropdown4 = await page.evaluateHandle(() =>
      document.querySelector('tds-dropdown:nth-child(8)').getAttribute('no-result-text'),
    );
    await page.locator('tds-dropdown:nth-child(8)').click();
    await page.locator('tds-dropdown:nth-child(8)').fill('No match');
    await expect(page.locator('.dropdown-content')).toBeVisible();
    await expect(page.locator('.dropdown-content')).toContainText(await dropdown4.jsonValue());
  });
});
