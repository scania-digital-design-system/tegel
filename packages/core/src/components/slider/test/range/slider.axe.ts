import { test } from '@stencil/playwright';
import { expect } from '@playwright/test';
import { tegelAnalyze } from '../../../../utils/axeHelpers';

const componentTestPath = 'src/components/slider/test/range/index.html';

test.describe.parallel('Slider reverse accessibility test', () => {
  test('Should render range behavior without detected accessibility issues', async ({ page }) => {
    await page.goto(componentTestPath);
    const { violations } = await tegelAnalyze(page);

    expect(violations).toEqual([]);
  });
});
