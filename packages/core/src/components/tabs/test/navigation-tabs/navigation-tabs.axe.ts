import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import { tegelAnalyze } from '../../../../utils/axeHelpers';

const componentTestPath = 'src/components/tabs/test/navigation-tabs/index.html';

test.describe.parallel('Navigation-Tabs accessibility test', () => {
  test('Should render without detected accessibility issues', async ({ page }) => {
    await page.goto(componentTestPath);
    const { violations } = await tegelAnalyze(page);

    expect(violations).toEqual([]);
  });
});
