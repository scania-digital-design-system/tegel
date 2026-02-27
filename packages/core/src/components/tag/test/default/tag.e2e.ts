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
      const tag = page.getByTestId('tds-tag-testid-default');
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
    const tag = page.getByTestId('tds-tag-testid-default');
    await expect(tag).toHaveCount(1);
  });

  test('Text is displayed correctly', async ({ page }) => {
    const tagText = page.getByText('Default', { exact: true });
    await expect(tagText).toBeVisible();
  });

  test('Check that tag has correct default classes', async ({ page }) => {
    const tag = page.getByTestId('tds-tag-testid-default');
    await expect(tag).toHaveClass(/lg/);
    await expect(tag).toHaveClass(/neutral/);
  });

  test('Check that lowercase variant input produces correct lowercase CSS classes', async ({
    page,
  }) => {
    // Given - tags with lowercase variant values in a dedicated fixture
    await page.goto('src/components/tag/test/lowercase/index.html');

    // When (rendering happens on page load)

    // Then - each lowercase variant should produce its corresponding lowercase CSS class
    await expect(page.getByTestId('tds-tag-testid-lowercase-neutral')).toHaveClass(/neutral/);
    await expect(page.getByTestId('tds-tag-testid-lowercase-success')).toHaveClass(/success/);
    await expect(page.getByTestId('tds-tag-testid-lowercase-warning')).toHaveClass(/warning/);
    await expect(page.getByTestId('tds-tag-testid-lowercase-new')).toHaveClass(/new/);
    await expect(page.getByTestId('tds-tag-testid-lowercase-information')).toHaveClass(
      /information/,
    );
    await expect(page.getByTestId('tds-tag-testid-lowercase-error')).toHaveClass(/error/);
  });

  test('Check that tag content structure is correct', async ({ page }) => {
    const tag = page.getByTestId('tds-tag-testid-default');
    const tagContent = tag.locator('.tds-tag__content');
    await expect(tagContent).toHaveCount(1);

    const tagTitle = tag.locator('span');
    await expect(tagTitle).toHaveCount(1);
    await expect(tagTitle).toHaveText('Default');
  });
});
