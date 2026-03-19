import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import { getTestDescribeText, setupPage } from '../../../../utils/testConfiguration';

const componentTestPath = 'src/components/spinner/test/inverted/index.html';
const componentName = 'tds-spinner';
const testDescription = 'tds-spinner-inverted';

const brands = ['scania', 'traton'];

const spinnerTestConfiguration = brands.flatMap((brand) => [
  {
    theme: 'lightmode',
    backgroundColor: 'var(--tds-grey-50)',
    brand,
  },
  {
    theme: 'darkmode',
    backgroundColor: 'var(--tds-grey-958)',
    brand,
  },
]);

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
