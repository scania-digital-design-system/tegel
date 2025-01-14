import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../utils/testConfiguration';

const componentTestPath = 'src/components/tabs/test/folder-tabs/index.html';
const componentName = 'tds-folder-tabs';

testConfigurations.withModeVariants.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, componentName), () => {
    let folderTabs;
    let firstTabDiv;
    let secondTabDiv;

    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);

      // Define common locators
      folderTabs = page.locator('tds-folder-tabs');
      // Divs inside tabs specifically for click interactions
      firstTabDiv = page.locator('tds-folder-tab:has-text("First tab") >> div');
      secondTabDiv = page.locator('tds-folder-tab:has-text("Second tab is much longer") >> div');
    });

    test('renders folder-tabs correctly', async () => {
      await expect(folderTabs).toHaveCount(1);
      await expect(folderTabs.page()).toHaveScreenshot({ maxDiffPixels: 0 });
    });

    test('Click on Second tab selects it and updates selected-index', async () => {
      await secondTabDiv.click({ force: true });
      await expect(folderTabs).toHaveAttribute('selected-index', '1', { timeout: 5000 });
      await expect(folderTabs.page()).toHaveScreenshot({ maxDiffPixels: 0 });
      await expect(firstTabDiv).not.toHaveClass(/selected/);
      await expect(secondTabDiv).toHaveClass(/selected/);
    });
  });
});

test.describe.parallel(componentName, () => {
  let folderTabs;
  let firstTab;
  let secondTab;
  let secondTabDiv;
  let thirdTab;
  let thirdTabDiv;
  let fourthTab;

  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);

    // Define common locators
    folderTabs = page.locator('tds-folder-tabs');
    firstTab = page.locator('button', { hasText: 'First tab' });
    secondTab = page.locator('button', { hasText: 'Second tab is much longer' });
    thirdTab = page.locator('button', { hasText: 'Third Tab' });
    fourthTab = page.locator('button', { hasText: 'Fourth Tab' });
    // Divs inside tabs specifically for click interactions
    secondTabDiv = page.locator('tds-folder-tab:has-text("Second tab is much longer") >> div');
    thirdTabDiv = page.locator('tds-folder-tab:has-text("Third Tab") >> div');
  });

  test('selected tab index should be 0', async ({ page }) => {
    await page.waitForChanges();
    const selectedIndex = await folderTabs.getAttribute('selected-index');
    expect(selectedIndex).toBe('0');
  });

  test('renders the correct tabs with expected labels', async () => {
    await expect(firstTab).toBeVisible();
    await expect(secondTab).toBeVisible();
    await expect(thirdTab).toBeVisible();
    await expect(fourthTab).toBeVisible();
  });

  test('First tab is selected by default', async () => {
    await expect(folderTabs).toHaveAttribute('selected-index', '0');
  });

  test('Second tab and Third tab are not selected', async () => {
    await expect(secondTab).toBeVisible();
    await expect(folderTabs).not.toHaveAttribute('selected-index', '2');
  });

  test('Hover over tabs changes cursor', async () => {
    await secondTab.hover();
    await expect(secondTab).toHaveCSS('cursor', 'pointer');
    await thirdTab.hover();
    await expect(thirdTab).toHaveCSS('cursor', 'pointer');
    await fourthTab.hover();
    await expect(fourthTab).toHaveCSS('cursor', 'not-allowed');
  });

  test('Click on Third tab selects it and updates selected-index', async () => {
    await thirdTabDiv.click({ force: true });
    await expect(folderTabs).toHaveAttribute('selected-index', '2', { timeout: 5000 });
    await expect(secondTabDiv).not.toHaveClass(/selected/);
    await expect(thirdTabDiv).toHaveClass(/selected/);
  });
});
