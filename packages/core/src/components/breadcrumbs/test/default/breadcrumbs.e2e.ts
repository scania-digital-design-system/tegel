import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/breadcrumbs/test/default/index.html';

test.describe('tds-breadcrumbs-default', () => {
  test('renders default breadcrumbs correctly', async ({ page }) => {
    await page.goto(componentTestPath);

    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });

  test('items Page 1, Page 2, Page 3 exist on the page', async ({ page }) => {
    await page.goto(componentTestPath);
    const navigation = page.getByRole('navigation');
    await expect(navigation).toHaveCount(1);
    const listItems = page.getByRole('listitem');
    await expect(listItems).toHaveCount(3);
    const pageOne = page.getByRole('link').filter({ hasText: 'Page 1' });
    const pageTwo = page.getByRole('link').filter({ hasText: 'Page 2' });
    const pageThree = page.getByRole('link').filter({ hasText: 'Page 3' });

    await expect(pageOne).toHaveCount(1);
    await expect(pageOne).toBeVisible();

    await expect(pageTwo).toHaveCount(1);
    await expect(pageTwo).toBeVisible();

    await expect(pageThree).toHaveCount(1);
    await expect(pageThree).toBeVisible();
  });

  test('page 3 item should be able to become focused', async ({ page }) => {
    await page.goto(componentTestPath);

    const pageThree = page.getByText(/Page 3/);
    await pageThree.focus();

    /* Check diff on screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
  });
});
