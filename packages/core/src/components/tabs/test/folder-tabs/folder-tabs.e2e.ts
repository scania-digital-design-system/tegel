import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

// Defined once for reuse
const componentTestPath = 'src/components/tabs/test/folder-tabs/index.html';

test.describe.parallel('tds-folder-tabs', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the component test page before each test
    await page.goto(componentTestPath);
  });

  test('renders folder-tabs correctly', async ({ page }) => {
    const folderTabs = page.locator('tds-folder-tabs');
    await expect(folderTabs).toHaveCount(1);

    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('selected tab index should be 0', async ({ page }) => {
    const selectedIndex = await page.locator('tds-folder-tabs').getAttribute('selected-index');
    expect(selectedIndex).toBe('0');
  });

  test('renders the correct tabs with expected labels', async ({ page }) => {
    // Check for the first tab
    const firstTab = page.locator('button', { hasText: 'First tab' });
    const secondTab = page.locator('button', { hasText: 'Second tab is much longer' });
    const thirdTab = page.locator('button', { hasText: 'Third Tab' });
    const fourthTab = page.locator('button', { hasText: 'Fourth tab' });

    await expect(firstTab).toBeVisible();
    await expect(secondTab).toBeVisible();
    await expect(thirdTab).toBeVisible();
    await expect(fourthTab).toBeVisible();
  });

  test('First tab is selected by default', async ({ page }) => {
    const folderTabs = page.locator('tds-folder-tabs');
    // Check if the selected-index attribute is set to 0
    await expect(folderTabs).toHaveAttribute('selected-index', '0');
  });

  test('Second tab and Third tab are not selected', async ({ page }) => {
    const folderTabs = page.locator('tds-folder-tabs');
    const secondTab = page.locator('button', { hasText: 'Second tab is much longer' });
    // Check if the selected-index attribute is not set to 1 or 2
    await expect(secondTab).toBeVisible();
    await expect(folderTabs).not.toHaveAttribute('selected-index', '2');
  });

  test('Hover over Second tab changes cursor to pointer', async ({ page }) => {
    const secondTab = page.locator('button', { hasText: 'Second tab is much longer' });
    await secondTab.hover();
    await expect(secondTab).toHaveCSS('cursor', 'pointer');
  });

  test('Hover over Third tab changes cursor to pointer', async ({ page }) => {
    const thirdTab = page.locator('button', { hasText: 'Third Tab' });
    await thirdTab.hover();
    await expect(thirdTab).toHaveCSS('cursor', 'pointer');
  });

  test('Hover over Fourth tab changes cursor to pointer', async ({ page }) => {
    const fourthTab = page.locator('button', { hasText: 'Fourth Tab' });
    await fourthTab.hover();
    await expect(fourthTab).toHaveCSS('cursor', 'not-allowed');
  });

  test('Click on Second tab selects it and updates selected-index', async ({ page }) => {
    const folderTabs = page.locator('tds-folder-tabs');

    // Locate the second tab and the div inside it
    const firstTab = page.locator('tds-folder-tab:has-text("First tab") >> div');
    const secondTab = page.locator('tds-folder-tab:has-text("Second tab is much longer") >> div');
    // Click on the second tab
    await secondTab.click({ force: true });

    // Assert that the 'selected-index' is now '1'
    await expect(folderTabs).toHaveAttribute('selected-index', '1', { timeout: 5000 });
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });

    // Additional checks for tab selection state
    // const firstTab = page.locator('tds-folder-tab div');
    // Check if the first tab no longer has the 'selected' class
    await expect(firstTab).not.toHaveClass(/selected/);
    // Check if the second tab now has the 'selected' class
    await expect(secondTab).toHaveClass(/selected/);
  });

  test('Click on Third tab selects it and updates selected-index', async ({ page }) => {
    const folderTabs = page.locator('tds-folder-tabs');

    // Locate the second tab and the div inside it
    const secondTab = page.locator('tds-folder-tab:has-text("Second tab is much longer") >> div');
    const thirdTab = page.locator('tds-folder-tab:has-text("Third tab") >> div');
    // Click on the second tab
    await thirdTab.click({ force: true });

    // Assert that the 'selected-index' is now '2'
    await expect(folderTabs).toHaveAttribute('selected-index', '2', { timeout: 5000 });
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });

    // Check if the third tab now has the 'selected' class
    await expect(secondTab).not.toHaveClass(/selected/);
    await expect(thirdTab).toHaveClass(/selected/);
  });
});
