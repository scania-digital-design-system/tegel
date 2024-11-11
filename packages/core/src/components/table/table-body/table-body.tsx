import { Component, Element, h, Host, Listen, State } from '@stencil/core';

import { InternalTdsTablePropChange } from '../table/table';
import { findClosestComponent } from '../../../utils/findClosestComponent';

const relevantTableProps: InternalTdsTablePropChange['changed'] = [
  'multiselect',
  'expandableRows',
  'zebraMode',
];

/**
 * @slot <default> - <b>Unnamed slot.</b> For table rows.
 */
@Component({
  tag: 'tds-table-body',
  styleUrl: 'table-body.scss',
  shadow: false,
})
export class TdsTableBody {
  @Element() host: HTMLElement;

  @State() multiselect: boolean = false;

  @State() enablePaginationTableBody: boolean = false;

  @State() expandableRows: boolean = false;

  @State() multiselectArray = [];

  @State() multiselectArrayJSON: string;

  @State() mainCheckboxStatus: boolean = false;

  @State() columnsNumber: number = 0;

  @State() zebraMode: 'rows-odd' | 'rows-even' | 'columns-odd' | 'columns-even' | 'none' = 'none';

  @State() tableId: string = '';

  tableEl: HTMLTdsTableElement;

  @Listen('internalTdsTablePropChange', { target: 'body' })
  internalTdsPropChangeListener(event: CustomEvent<InternalTdsTablePropChange>) {
    if (this.tableId === event.detail.tableId) {
      event.detail.changed
        .filter((changedProp) => relevantTableProps.includes(changedProp))
        .forEach((changedProp) => {
          if (typeof this[changedProp] === 'undefined') {
            throw new Error(`Table prop is not supported: ${changedProp}`);
          }
          this[changedProp] = event.detail[changedProp];
        });
    }
  }

  bodyCheckBoxClicked = () => {
    const numberOfRows = this.host.getElementsByClassName('tds-table__row').length;

    const numberOfRowsSelected = this.host.getElementsByClassName(
      'tds-table__row--selected',
    ).length;

    this.mainCheckboxStatus = numberOfRows === numberOfRowsSelected;
  };

  // No need to read the value, event is here just to trigger another function
  @Listen('internalTdsRowChange', { target: 'body' })
  bodyCheckboxListener() {
    this.bodyCheckBoxClicked();
  }

  connectedCallback() {
    this.tableEl = findClosestComponent(this.host, 'tdsTable') as HTMLTdsTableElement;
    this.tableId = this.tableEl.tableId;
  }

  componentWillLoad() {
    relevantTableProps.forEach((tablePropName) => {
      this[tablePropName] = this.tableEl[tablePropName];
    });
  }

  componentWillRender() {
    const headerColumnsNo =
      this.host.parentElement.querySelector('.tds-table__header').children.length;

    // multiselect and expended features requires one extra column for controls...
    if (this.multiselect || this.expandableRows) {
      this.columnsNumber = headerColumnsNo + 1;
    } else {
      this.columnsNumber = headerColumnsNo;
    }
  }

  render() {
    return (
      <Host
        data-selected-rows={this.multiselectArrayJSON}
        class={{
          'tds-table__body': true,
          'tds-table--zebra-mode-rows-odd': this.zebraMode === 'rows-odd',
          'tds-table--zebra-mode-rows-even': this.zebraMode === 'rows-even',
          'tds-table--zebra-mode-columns-odd': this.zebraMode === 'columns-odd',
          'tds-table--zebra-mode-columns-even': this.zebraMode === 'columns-even',
        }}
      >
        <slot></slot>
      </Host>
    );
  }
}
