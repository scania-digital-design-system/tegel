import { newSpecPage } from '@stencil/core/testing';

import { h } from '@stencil/core';

import { TdsTableBody } from './table-body/table-body';
import { TdsTableHeaderRow } from './table-header/table-header';
import { TdsTable } from './table/table';
import dummyData from './table-body/dummy-data.json';
import { TdsTableHeaderCell } from './table-header-cell/table-header-cell';

const columnKeys = Object.keys(dummyData[0]);

const bodyData = JSON.stringify(dummyData);

describe('tds-table', () => {
  it('should render cells from enable-dummy-data prop', async () => {
    const page = await newSpecPage({
      components: [TdsTable, TdsTableHeaderRow, TdsTableHeaderCell, TdsTableBody],
      template: () => (
        <tds-table table-id="unique-test-id">
          <tds-table-header>
            <tds-header-cell column-key={columnKeys[0]} />
            <tds-header-cell column-key={columnKeys[1]} />
            <tds-header-cell column-key={columnKeys[2]} />
            <tds-header-cell column-key={columnKeys[3]} />
          </tds-table-header>
          <tds-table-body enable-dummy-data></tds-table-body>
        </tds-table>
      ),
    });

    const cells = await page.doc.querySelectorAll('tds-body-cell');
    expect(cells.length).toBe(4 * 7);
  });

  it('should render cells from body-data prop', async () => {
    const page = await newSpecPage({
      components: [TdsTable, TdsTableHeaderRow, TdsTableHeaderCell, TdsTableBody],
      template: () => (
        <tds-table table-id="unique-test-id">
          <tds-table-header>
            <tds-header-cell column-key={columnKeys[0]} />
            <tds-header-cell column-key={columnKeys[1]} />
            <tds-header-cell column-key={columnKeys[2]} />
            <tds-header-cell column-key={columnKeys[3]} />
          </tds-table-header>
          <tds-table-body body-data={bodyData}></tds-table-body>
        </tds-table>
      ),
    });

    expect(columnKeys).toMatchObject(['truck', 'driver', 'country', 'mileage']);
    expect(typeof bodyData === 'string').toBe(true);

    const cells = await page.doc.querySelectorAll('tds-body-cell');
    expect(cells.length).toBe(4 * 7);
  });
});
