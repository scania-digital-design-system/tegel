import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import { tegelAnalyze } from '../../../../utils/axeHelpers';

const componentTestPath = 'src/components/button/test/ghost/index.html';

test.describe.parallel('Button ghost accessibility test', () => {
  test('Should render ghost behavior without detected accessibility issues', async ({ page }) => {
    await page.goto(componentTestPath);
    const { violations } = await tegelAnalyze(page);

    expect(violations).toEqual([]);
  });
});
