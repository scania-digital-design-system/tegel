import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';
import {
  testConfigurations,
  getTestDescribeText,
  setupPage,
} from '../../../../../utils/testConfiguration';

const componentTestPath = 'src/components/table/table/test/colspan-rowspan/index.html';
const componentName = 'tds-table';
const testDescription = 'tds-table-colspan-rowspan';

testConfigurations.withModeVariants.forEach((config) => {
  test.describe.parallel(getTestDescribeText(config, testDescription), () => {
    test.beforeEach(async ({ page }) => {
      await setupPage(page, config, componentTestPath, componentName);
    });

    test('renders table with colspan and rowspan correctly', async ({ page }) => {
      await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
    });
  });
});

test.describe.parallel(componentName, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
  });

  test('header cell with colSpan has colspan on shadow th', async ({ page }) => {
    const colSpan = await page.evaluate(() => {
      const cell = document.querySelector('tds-header-cell');
      return cell?.shadowRoot?.querySelector('th')?.getAttribute('colspan') ?? null;
    });
    expect(colSpan).toBe('2');
  });

  test('header cell without colSpan does not have colspan on shadow th', async ({ page }) => {
    const colSpan = await page.evaluate(() => {
      const cells = document.querySelectorAll('tds-header-cell');
      return cells[1]?.shadowRoot?.querySelector('th')?.getAttribute('colspan') ?? null;
    });
    expect(colSpan).toBeNull();
  });

  test('body cell with colSpan has colspan on shadow td', async ({ page }) => {
    const colSpan = await page.evaluate(() => {
      const cell = document.querySelector('tds-body-cell');
      return cell?.shadowRoot?.querySelector('td')?.getAttribute('colspan') ?? null;
    });
    expect(colSpan).toBe('2');
  });

  test('body cell with rowSpan has rowspan on shadow td', async ({ page }) => {
    const rowSpan = await page.evaluate(() => {
      const cells = document.querySelectorAll('tds-body-cell');
      return cells[2]?.shadowRoot?.querySelector('td')?.getAttribute('rowspan') ?? null;
    });
    expect(rowSpan).toBe('2');
  });

  test('body cell without spans does not have colspan or rowspan on shadow td', async ({
    page,
  }) => {
    const attrs = await page.evaluate(() => {
      const cells = document.querySelectorAll('tds-body-cell');
      const td = cells[1]?.shadowRoot?.querySelector('td');
      return {
        colspan: td?.getAttribute('colspan') ?? null,
        rowspan: td?.getAttribute('rowspan') ?? null,
      };
    });
    expect(attrs.colspan).toBeNull();
    expect(attrs.rowspan).toBeNull();
  });
});
