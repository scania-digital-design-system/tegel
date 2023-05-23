import { newSpecPage } from '@stencil/core/testing';

import { h } from '@stencil/core';

import { TableBody } from './table-body/table-body';
import { TableHeaderRow } from './table-header/table-header';
import { Table } from './table/table';
import dummyData from './table-body/dummy-data.json';
import { TableHeaderCell } from './table-header-cell/table-header-cell';
import { TableToolbar } from './table-toolbar/table-toolbar';

const columnKeys = Object.keys(dummyData[0]);
const crypto = require('crypto');

Object.defineProperty(globalThis, 'crypto', {
  value: {
    randomUUID: () => crypto.randomBytes(10),
  },
});
describe('tds-table filtering', () => {
  it('should render cells from enable-dummy-data prop', async () => {
    const mismatchingCellSpy = jest.fn();
    const matchingCellSpy = jest.fn();
    const page = await newSpecPage({
      components: [Table, TableToolbar, TableHeaderRow, TableHeaderCell, TableBody],
      template: () => (
        <tds-table table-id="unique-test-id">
          <tds-table-toolbar table-title="Filter me" enableFiltering />
          <tds-table-header>
            <tds-header-cell column-key={columnKeys[0]} />
            <tds-header-cell column-key={columnKeys[1]} />
            <tds-header-cell column-key={columnKeys[2]} />
            <tds-header-cell column-key={columnKeys[3]} />
          </tds-table-header>
          <tds-table-body>
            <tds-table-body-row>
              <tds-body-cell cell-key="truck" cell-value="L-series"></tds-body-cell>
              <tds-body-cell
                cell-key="driver"
                cell-value="Sonya Bruce"
                onClick={(e) => matchingCellSpy(e)}
              ></tds-body-cell>
              <tds-body-cell cell-key="country" cell-value="Brazil"></tds-body-cell>
              <tds-body-cell cell-key="mileage" cell-value="123987"></tds-body-cell>
            </tds-table-body-row>
            <tds-table-body-row>
              <tds-body-cell cell-key="truck" cell-value="P-series"></tds-body-cell>
              <tds-body-cell cell-key="driver" cell-value="Guerra Bowman"></tds-body-cell>
              <tds-body-cell cell-key="country" cell-value="Sweden"></tds-body-cell>
              <tds-body-cell cell-key="mileage" cell-value="2000852"></tds-body-cell>
            </tds-table-body-row>
            <tds-table-body-row>
              <tds-body-cell cell-key="truck" cell-value="G-series"></tds-body-cell>
              <tds-body-cell
                cell-key="driver"
                cell-value="Ferrell Wallace"
                onClick={(e) => mismatchingCellSpy(e)}
              ></tds-body-cell>
              <tds-body-cell cell-key="country" cell-value="Germany"></tds-body-cell>
              <tds-body-cell cell-key="mileage" cell-value="564"></tds-body-cell>
            </tds-table-body-row>
            <tds-table-body-row>
              <tds-body-cell cell-key="truck" cell-value="R-series"></tds-body-cell>
              <tds-body-cell cell-key="driver" cell-value="Cox Burris"></tds-body-cell>
              <tds-body-cell cell-key="country" cell-value="Spain"></tds-body-cell>
              <tds-body-cell cell-key="mileage" cell-value="1789357"></tds-body-cell>
            </tds-table-body-row>
            <tds-table-body-row>
              <tds-body-cell cell-key="truck" cell-value="S-series"></tds-body-cell>
              <tds-body-cell cell-key="driver" cell-value="Montgomery Cervantes"></tds-body-cell>
              <tds-body-cell cell-key="country" cell-value="Croatia"></tds-body-cell>
              <tds-body-cell cell-key="mileage" cell-value="65"></tds-body-cell>
            </tds-table-body-row>
            <tds-table-body-row>
              <tds-body-cell cell-key="truck" cell-value="L-series"></tds-body-cell>
              <tds-body-cell cell-key="driver" cell-value="Sheryl Nielsen"></tds-body-cell>
              <tds-body-cell cell-key="country" cell-value="Greece"></tds-body-cell>
              <tds-body-cell cell-key="mileage" cell-value="365784"></tds-body-cell>
            </tds-table-body-row>
            <tds-table-body-row>
              <tds-body-cell cell-key="truck" cell-value="G-series"></tds-body-cell>
              <tds-body-cell cell-key="driver" cell-value="Benton Gomez"></tds-body-cell>
              <tds-body-cell cell-key="country" cell-value="France"></tds-body-cell>
              <tds-body-cell cell-key="mileage" cell-value="80957"></tds-body-cell>
            </tds-table-body-row>
          </tds-table-body>
        </tds-table>
      ),
    });

    const toolbarEl = await page.doc.querySelector('tds-table-toolbar');

    const inputEl = toolbarEl.shadowRoot.querySelector('input');
    inputEl.value = 'sonya';
    inputEl.dispatchEvent(new Event('keydown'));
    inputEl.dispatchEvent(new Event('input'));
    inputEl.dispatchEvent(new Event('keyup'));

    // eslint-disable-next-line
    const mismatchingCellEl = (await page.doc.querySelector(
      'tds-body-cell[cell-value^=Ferrell]',
    )) as HTMLElement;
    // TODO: assert that mismatchingCellEl is not visible, not sure how to do it..
  });
});
