import { expect, type Page } from '@playwright/test';
import { test } from 'stencil-playwright';

const componentTestPath = 'src/components/table/table/test/sorting-initial/index.html';
const componentName = 'tds-table';

const getHeaderCellAriaSort = (page: Page, cellKey: string) =>
  page.locator(`tds-header-cell[cell-key="${cellKey}"]`).evaluate((cell: HTMLElement) => {
    return cell.shadowRoot?.querySelector('th')?.getAttribute('aria-sort');
  });

const getHeaderCellIconName = (page: Page, cellKey: string) =>
  page.locator(`tds-header-cell[cell-key="${cellKey}"]`).evaluate((cell: HTMLElement) => {
    return cell.shadowRoot?.querySelector('tds-icon')?.getAttribute('name');
  });

test.describe.parallel(`${componentName} initial sorting`, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
    await page.getByRole('table').waitFor({ state: 'visible' });
  });

  test('shows configured sort direction before click', async ({ page }) => {
    expect(await getHeaderCellAriaSort(page, 'driver')).toBe('descending');
    expect(await getHeaderCellIconName(page, 'driver')).toBe('arrow_down');
    expect(await getHeaderCellAriaSort(page, 'truck')).toBe('none');
  });

  test('toggles configured sort direction on click', async ({ page }) => {
    await page.getByText('Driver name').click();

    await expect.poll(() => getHeaderCellAriaSort(page, 'driver')).toBe('ascending');
  });

  test('updates displayed sort state when table sort props change', async ({ page }) => {
    await page.locator('tds-table').evaluate((table: HTMLTdsTableElement) => {
      table.sortColumnKey = 'country';
      table.sortDirection = 'asc';
    });

    await expect.poll(() => getHeaderCellAriaSort(page, 'country')).toBe('ascending');
    await expect.poll(() => getHeaderCellAriaSort(page, 'driver')).toBe('none');
  });
});
