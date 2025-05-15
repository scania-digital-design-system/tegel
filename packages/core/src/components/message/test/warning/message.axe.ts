import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import { tegelAnalyze } from '../../../../utils/axeHelpers';

const componentTestPath = 'src/components/message/test/warning/index.html';

test.describe.parallel('Message warning accessibility test', () => {
  test('Should render warning behavior without detected accessibility issues', async ({ page }) => {
    await page.goto(componentTestPath);
    const { violations } = await tegelAnalyze(page);

    expect(violations).toEqual([]);
  });
});
