import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const componentTestPath = 'src/components/accordion/test/basic/index.html';

test.describe.parallel('Accordion accessibility test', () => {
  test('Should render without detected accessibility issues', async ({ page }) => {
    await page.goto(componentTestPath);

    const { violations } = await new AxeBuilder({ page }).analyze();

    expect(violations).toEqual([]);
  });
});
