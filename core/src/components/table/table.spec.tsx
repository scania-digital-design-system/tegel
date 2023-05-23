import { newSpecPage } from '@stencil/core/testing';

import { h } from '@stencil/core';

import { TableBody } from './table-body/table-body';
import { TableHeaderRow } from './table-header/table-header';
import { Table } from './table/table';
import dummyData from './table-body/dummy-data.json';
import { TableHeaderCell } from './table-header-cell/table-header-cell';

const columnKeys = Object.keys(dummyData[0]);

const bodyData = JSON.stringify(dummyData);

const crypto = require('crypto');

Object.defineProperty(globalThis, 'crypto', {
  value: {
    randomUUID: () => crypto.randomBytes(10),
  },
});

describe('tds-table', () => {
  it('should render cells from enable-dummy-data prop', async () => {
    const page = await newSpecPage({
      components: [Table, TableHeaderRow, TableHeaderCell, TableBody],
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
      components: [Table, TableHeaderRow, TableHeaderCell, TableBody],
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
