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
describe('sdds-table filtering', () => {
  it('should render cells from enable-dummy-data prop', async () => {
    const mismatchingCellSpy = jest.fn();
    const matchingCellSpy = jest.fn();
    const page = await newSpecPage({
      components: [Table, TableToolbar, TableHeaderRow, TableHeaderCell, TableBody],
      template: () => (
        <sdds-table table-id="unique-test-id">
          <sdds-table-toolbar table-title="Filter me" enableFiltering />
          <sdds-table-header>
            <sdds-header-cell column-key={columnKeys[0]} />
            <sdds-header-cell column-key={columnKeys[1]} />
            <sdds-header-cell column-key={columnKeys[2]} />
            <sdds-header-cell column-key={columnKeys[3]} />
          </sdds-table-header>
          <sdds-table-body>
            <sdds-table-body-row>
              <sdds-body-cell cell-key="truck" cell-value="L-series"></sdds-body-cell>
              <sdds-body-cell
                cell-key="driver"
                cell-value="Sonya Bruce"
                onClick={(e) => matchingCellSpy(e)}
              ></sdds-body-cell>
              <sdds-body-cell cell-key="country" cell-value="Brazil"></sdds-body-cell>
              <sdds-body-cell cell-key="mileage" cell-value="123987"></sdds-body-cell>
            </sdds-table-body-row>
            <sdds-table-body-row>
              <sdds-body-cell cell-key="truck" cell-value="P-series"></sdds-body-cell>
              <sdds-body-cell cell-key="driver" cell-value="Guerra Bowman"></sdds-body-cell>
              <sdds-body-cell cell-key="country" cell-value="Sweden"></sdds-body-cell>
              <sdds-body-cell cell-key="mileage" cell-value="2000852"></sdds-body-cell>
            </sdds-table-body-row>
            <sdds-table-body-row>
              <sdds-body-cell cell-key="truck" cell-value="G-series"></sdds-body-cell>
              <sdds-body-cell
                cell-key="driver"
                cell-value="Ferrell Wallace"
                onClick={(e) => mismatchingCellSpy(e)}
              ></sdds-body-cell>
              <sdds-body-cell cell-key="country" cell-value="Germany"></sdds-body-cell>
              <sdds-body-cell cell-key="mileage" cell-value="564"></sdds-body-cell>
            </sdds-table-body-row>
            <sdds-table-body-row>
              <sdds-body-cell cell-key="truck" cell-value="R-series"></sdds-body-cell>
              <sdds-body-cell cell-key="driver" cell-value="Cox Burris"></sdds-body-cell>
              <sdds-body-cell cell-key="country" cell-value="Spain"></sdds-body-cell>
              <sdds-body-cell cell-key="mileage" cell-value="1789357"></sdds-body-cell>
            </sdds-table-body-row>
            <sdds-table-body-row>
              <sdds-body-cell cell-key="truck" cell-value="S-series"></sdds-body-cell>
              <sdds-body-cell cell-key="driver" cell-value="Montgomery Cervantes"></sdds-body-cell>
              <sdds-body-cell cell-key="country" cell-value="Croatia"></sdds-body-cell>
              <sdds-body-cell cell-key="mileage" cell-value="65"></sdds-body-cell>
            </sdds-table-body-row>
            <sdds-table-body-row>
              <sdds-body-cell cell-key="truck" cell-value="L-series"></sdds-body-cell>
              <sdds-body-cell cell-key="driver" cell-value="Sheryl Nielsen"></sdds-body-cell>
              <sdds-body-cell cell-key="country" cell-value="Greece"></sdds-body-cell>
              <sdds-body-cell cell-key="mileage" cell-value="365784"></sdds-body-cell>
            </sdds-table-body-row>
            <sdds-table-body-row>
              <sdds-body-cell cell-key="truck" cell-value="G-series"></sdds-body-cell>
              <sdds-body-cell cell-key="driver" cell-value="Benton Gomez"></sdds-body-cell>
              <sdds-body-cell cell-key="country" cell-value="France"></sdds-body-cell>
              <sdds-body-cell cell-key="mileage" cell-value="80957"></sdds-body-cell>
            </sdds-table-body-row>
          </sdds-table-body>
        </sdds-table>
      ),
    });

    const toolbarEl = await page.doc.querySelector('sdds-table-toolbar');

    const inputEl = toolbarEl.shadowRoot.querySelector('input');
    inputEl.value = 'sonya';
    inputEl.dispatchEvent(new Event('keydown'));
    inputEl.dispatchEvent(new Event('input'));
    inputEl.dispatchEvent(new Event('keyup'));

    // eslint-disable-next-line
    const mismatchingCellEl = (await page.doc.querySelector(
      'sdds-body-cell[cell-value^=Ferrell]',
    )) as HTMLElement;
    // TODO: assert that mismatchingCellEl is not visible, not sure how to do it..
  });
});
