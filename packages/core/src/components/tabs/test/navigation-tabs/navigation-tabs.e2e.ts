import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

// Defined once for reuse
const componentTestPath = 'src/components/tabs/test/navigation-tabs/index.html';

test.describe.parallel('tds-navigation-tabs', () => {
  let navigationTabs;
  let firstTab;
  let firstTabDiv;
  let secondTab;
  let secondTabDiv;
  let thirdTab;
  let thirdTabDiv;
  let fourthTab;

  test.beforeEach(async ({ page }) => {
    // Navigate to the component test page before each test
    await page.goto(componentTestPath);
    // Define common locators
    navigationTabs = page.locator('tds-navigation-tabs');
    firstTab = page.locator('button', { hasText: 'First tab' });
    secondTab = page.locator('button', { hasText: 'Second tab is much longer' });
    thirdTab = page.locator('button', { hasText: 'Third Tab' });
    fourthTab = page.locator('button', { hasText: 'Fourth Tab' });
    // Divs inside tabs specifically for click interactions
    firstTabDiv = page.locator('tds-navigation-tab:has-text("First tab") >> div');
    secondTabDiv = page.locator('tds-navigation-tab:has-text("Second tab is much longer") >> div');
    thirdTabDiv = page.locator('tds-navigation-tab:has-text("Third Tab") >> div');
  });

  test('renders navigation-tabs correctly', async () => {
    await expect(navigationTabs).toHaveCount(1);
    await expect(navigationTabs.page()).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('selected tab index should be 0', async ({ page }) => {
    await page.waitForChanges();

    const selectedIndex = await navigationTabs.getAttribute('selected-index');
    expect(selectedIndex).toBe('0');
  });

  test('renders the correct tabs with expected labels', async () => {
    await expect(firstTab).toBeVisible();
    await expect(secondTab).toBeVisible();
    await expect(thirdTab).toBeVisible();
    await expect(fourthTab).toBeVisible();
  });

  test('First tab is selected by default', async () => {
    await expect(navigationTabs).toHaveAttribute('selected-index', '0');
  });

  test('Second tab and Third tab are not selected', async () => {
    await expect(secondTab).toBeVisible();
    await expect(navigationTabs).not.toHaveAttribute('selected-index', '2');
  });

  test('Hover over tabs changes cursor', async () => {
    await secondTab.hover();
    await expect(secondTab).toHaveCSS('cursor', 'pointer');
    await thirdTab.hover();
    await expect(thirdTab).toHaveCSS('cursor', 'pointer');
    await fourthTab.hover();
    await expect(fourthTab).toHaveCSS('cursor', 'not-allowed');
  });

  test('Click on Second tab selects it and updates selected-index', async () => {
    await secondTabDiv.click({ force: true });
    await expect(navigationTabs).toHaveAttribute('selected-index', '1', { timeout: 5000 });
    await expect(navigationTabs.page()).toHaveScreenshot({ maxDiffPixels: 0 });
    await expect(firstTabDiv).not.toHaveClass(/selected/);
    await expect(secondTabDiv).toHaveClass(/selected/);
  });

  test('Click on Third tab selects it and updates selected-index', async () => {
    await thirdTabDiv.click({ force: true });
    await expect(navigationTabs).toHaveAttribute('selected-index', '2', { timeout: 5000 });
    await expect(secondTabDiv).not.toHaveClass(/selected/);
    await expect(thirdTabDiv).toHaveClass(/selected/);
  });
});
