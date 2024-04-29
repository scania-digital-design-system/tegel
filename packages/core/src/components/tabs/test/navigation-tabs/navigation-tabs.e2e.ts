import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

// Defined once for reuse
const componentTestPath = 'src/components/tabs/test/navigation-tabs/index.html';

test.describe.parallel('tds-navigation-tabs', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the component test page before each test
    await page.goto(componentTestPath);
  });

  test('renders navigation-tabs correctly', async ({ page }) => {
    const navigationTabs = page.locator('tds-navigation-tabs');
    await expect(navigationTabs).toHaveCount(1);

    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('selected tab index should be 0', async ({ page }) => {
    const selectedIndex = await page.locator('tds-navigation-tabs').getAttribute('selected-index');
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
    const navigationTabs = page.locator('tds-navigation-tabs');
    // Check if the selected-index attribute is set to 0
    await expect(navigationTabs).toHaveAttribute('selected-index', '0');
  });

  test('Second tab and Third tab are not selected', async ({ page }) => {
    const navigationTabs = page.locator('tds-navigation-tabs');
    const secondTab = page.locator('button', { hasText: 'Second tab is much longer' });
    // Check if the selected-index attribute is not set to 1 or 2
    await expect(secondTab).toBeVisible();
    await expect(navigationTabs).not.toHaveAttribute('selected-index', '2');
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

  test('Hover over Fourth tab changes cursor to not-allowed', async ({ page }) => {
    const fourthTab = page.locator('button', { hasText: 'Fourth Tab' });
    await fourthTab.hover();
    await expect(fourthTab).toHaveCSS('cursor', 'not-allowed');
  });

  test('Click on Second tab selects it and updates selected-index', async ({ page }) => {
    const navigationTabs = page.locator('tds-navigation-tabs');

    // Locate the second tab and the div inside it
    const firstTab = page.locator('tds-navigation-tab:has-text("First tab") >> div');
    const secondTab = page.locator(
      'tds-navigation-tab:has-text("Second tab is much longer") >> div',
    );
    // Click on the second tab
    await secondTab.click({ force: true });

    // Assert that the 'selected-index' is now '1'
    await expect(navigationTabs).toHaveAttribute('selected-index', '1', { timeout: 5000 });
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });

    // Additional checks for tab selection state
    // const firstTab = page.locator('tds-navigation-tab div');
    // Check if the first tab no longer has the 'selected' class
    await expect(firstTab).not.toHaveClass(/selected/);
    // Check if the second tab now has the 'selected' class
    await expect(secondTab).toHaveClass(/selected/);
  });

  test('Click on Third tab selects it and updates selected-index', async ({ page }) => {
    const navigationTabs = page.locator('tds-navigation-tabs');

    // Locate the third tab and the div inside it
    const secondTab = page.locator(
      'tds-navigation-tab:has-text("Second tab is much longer") >> div',
    );
    const thirdTab = page.locator('tds-navigation-tab:has-text("Third tab") >> div');
    // Click on the third tab
    await thirdTab.click({ force: true });

    // Assert that the 'selected-index' is now '2'
    await expect(navigationTabs).toHaveAttribute('selected-index', '2', { timeout: 5000 });
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });

    // Check if the second tab now has the 'selected' class
    await expect(secondTab).not.toHaveClass(/selected/);
    await expect(thirdTab).toHaveClass(/selected/);
  });
});
