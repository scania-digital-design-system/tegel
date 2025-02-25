import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import { getTestDescribeText, setupPage } from '../../../../utils/testConfiguration';

const componentTestPath = 'src/components/spinner/test/standard/index.html';
const componentName = 'tds-spinner';
const testDescription = 'tds-spinner-standard';

const spinnerTestConfiguration = [
  {
    theme: 'lightmode',
    backgroundColor: 'var(--tds-grey-50)',
  },
  {
    theme: 'darkmode',
    backgroundColor: 'var(--tds-grey-958)',
  },
];

spinnerTestConfiguration.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('renders basic spinner correctly', async ({ page }) => {
      /* Check diff on screenshot */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });
  });
});

test.describe.parallel('tds-spinner-standard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('Check if animation is present', async ({ page }) => {
    const spinner = page.locator('tds-spinner:first-child circle');
    const spinnerStyle = await spinner.evaluate((style) => getComputedStyle(style).animationName);
    expect(spinnerStyle).toBe('dash');
  });
});
