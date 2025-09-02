import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../utils/testConfiguration';

const componentTestPath = 'src/components/tag/test/default/index.html';
const componentName = 'tds-tag';
const testDescription = 'tds-tag-default';

testConfigurations.withModeVariants.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('renders default tag correctly', async ({ page }) => {
      const tag = page.getByTestId('tds-tag-testid');
      await expect(tag).toHaveCount(1);

      /* Check diff on screenshot */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });
  });
});

test.describe.parallel(componentName, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('component renders with correct text', async ({ page }) => {
    const tag = page.getByTestId('tds-tag-testid');
    await expect(tag).toHaveCount(1);
  });

  test('Text is displayed correctly', async ({ page }) => {
    const tagText = page.getByText('Tag Label', { exact: true });
    await expect(tagText).toBeVisible();
  });

  test('Check that tag has correct default classes', async ({ page }) => {
    const tag = page.getByTestId('tds-tag-testid');
    await expect(tag).toHaveClass(/--lg/);
    await expect(tag).toHaveClass(/--neutral/);
  });

  test('Check that tag content structure is correct', async ({ page }) => {
    const tagContent = page.locator('tds-tag .tds-tag__content');
    await expect(tagContent).toHaveCount(1);

    const tagTitle = page.locator('tds-tag span');
    await expect(tagTitle).toHaveCount(1);
    await expect(tagTitle).toHaveText('Tag Label');
  });
});
