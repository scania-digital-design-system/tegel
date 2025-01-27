import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import { getTestDescribeText, setupPage } from '../../../../utils/testConfiguration';

const componentTestPath = 'src/components/spinner/test/inverted/index.html';
const componentName = 'tds-spinner';
const testDescription = 'tds-spinner-inverted';

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

    test('renders inverted spinner correctly', async ({ page }) => {
      /* Check diff on screenshot */
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });
  });
});
