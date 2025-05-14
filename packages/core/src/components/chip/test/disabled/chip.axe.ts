import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import { tegelAnalyze } from '../../../../utils/axeHelpers';

const componentTestPath = 'src/components/chip/test/disabled/index.html';

test.describe.parallel('Chip disabled accessibility test', () => {
  test('Should render disabled behavior without detected accessibility issues', async ({ page }) => {
    await page.goto(componentTestPath);
    const { violations } = await tegelAnalyze(page);

    expect(violations).toEqual([]);
  });
});
