import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/card/test/default/index.html';

test.describe.parallel('tds-card-default', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('renders default card correctly', async ({ page }) => {
    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('header text exists', async ({ page }) => {
    const cardHeaderText = page.getByText('Header text', { exact: true });
    await expect(cardHeaderText).toHaveCount(1);
    await expect(cardHeaderText).toBeVisible();
  });

  test('subheader text exists', async ({ page }) => {
    const cardSubheaderText = page.getByText('Subheader text', { exact: true });
    await expect(cardSubheaderText).toHaveCount(1);
    await expect(cardSubheaderText).toBeVisible();
  });

  test('arrow icon exists', async ({ page }) => {
    const cardTdsIcon = page.getByRole('img');
    await expect(cardTdsIcon).toHaveCount(1);
    await expect(cardTdsIcon).toBeVisible();
  });

  test('card should not contain a button that is clickable', async ({ page }) => {
    const cardButton = page.getByRole('button');
    await expect(cardButton).toHaveCount(0);
  });
});
