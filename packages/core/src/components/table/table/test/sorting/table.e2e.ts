import { test } from 'stencil-playwright';
import { expect } from '@playwright/test';

const componentTestPath = 'src/components/table/table/test/sorting/index.html';

test.describe.parallel('tds-table-sorting', () => {
  let tableComponent;

  test.beforeEach(async ({ page }) => {
    await page.goto(componentTestPath);
    tableComponent = page.getByRole('table');
    await tableComponent.waitFor({ state: 'visible' });
  });

  test('renders sorting table correctly', async ({ page }) => {
    await expect(tableComponent).toHaveCount(1);

    /* Check for diffs in screenshot */
    await expect(page).toHaveScreenshot({ maxDiffPixels: 0.05 });
  });

  test('table has header "Sorting"', async ({ page }) => {
    /* Search for header by text and see if it exists */
    const tdsTableToolbarCaption = page.getByText('Sorting');
    await expect(tdsTableToolbarCaption).toHaveCount(1);
    await expect(tdsTableToolbarCaption).toBeVisible();
  });

  test('column headers are clickable', async ({ page }) => {
    const myEventSpy = await page.spyOnEvent('tdsSort');
    const truckTypeHeader = page.getByText('Truck type');
    await truckTypeHeader.click();
    expect(myEventSpy).toHaveReceivedEventTimes(1);
    const driverNameHeader = page.getByText('Driver name');
    await driverNameHeader.click();
    expect(myEventSpy).toHaveReceivedEventTimes(2);
    const countryHeader = page.getByText('Country');
    await countryHeader.click();
    expect(myEventSpy).toHaveReceivedEventTimes(3);
    const mileageHeader = page.getByText('Mileage');
    await mileageHeader.click();
    expect(myEventSpy).toHaveReceivedEventTimes(4);

    await mileageHeader.waitFor({ state: 'visible' });
    await page.waitForTimeout(250);

    await expect(page).toHaveScreenshot({ maxDiffPixels: 0.05 });
  });
});
