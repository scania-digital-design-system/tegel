import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { TdsTableBody } from './table-body/table-body';
import { TdsTableHeaderRow } from './table-header/table-header';
import { TdsTable } from './table/table';
import { TdsTableHeaderCell } from './table-header-cell/table-header-cell';

describe('tds-table', () => {
  it('should render cells from body-data prop', async () => {
    const page = await newSpecPage({
      components: [TdsTable, TdsTableHeaderRow, TdsTableHeaderCell, TdsTableBody],
      template: () => (
        <tds-table table-id="unique-test-id">
          <tds-table-header>
            <tds-header-cell column-key="truck" />
            <tds-header-cell column-key="driver" />
            <tds-header-cell column-key="country" />
            <tds-header-cell column-key="mileage" />
          </tds-table-header>
          <tds-table-body>
            <tds-table-body-row>
              <tds-body-cell cell-key="truck" cell-value="L-series"></tds-body-cell>
              <tds-body-cell cell-key="driver" cell-value="Sonya Bruce"></tds-body-cell>
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
              <tds-body-cell cell-key="driver" cell-value="Ferrell Wallace"></tds-body-cell>
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

    const cells = await page.doc.querySelectorAll('tds-body-cell');
    expect(cells.length).toBe(4 * 7);
  });
});
