import { Component, Element, forceUpdate, h, Host, Listen, Prop, State } from '@stencil/core';

import { InternalTdsTablePropChange } from '../table/table';

const relevantTableProps: InternalTdsTablePropChange['changed'] = [
  'multiselect',
  'expandableRows',
  'zebraMode',
];

/**
 * @slot <default> - <b>Unnamed slot.</b> For table rows.
 * @slot no-data - Content shown when the unfiltered data source is empty.
 * @slot no-filtered-data - Content shown when filters match no rows.
 */
@Component({
  tag: 'tds-table-body',
  styleUrl: 'table-body.scss',
  shadow: false,
})
export class TdsTableBody {
  @Element() host!: HTMLElement;

  /** Selects a custom empty layout, or shows the normal rows when set to `none`. */
  @Prop({ reflect: true }) emptyState: 'no-data' | 'no-filtered-data' | 'none' = 'none';

  @State() multiselect: boolean = false;

  @State() enablePaginationTableBody: boolean = false;

  @State() expandableRows: boolean = false;

  @State() multiselectArray = [];

  @State() multiselectArrayJSON: string = '';

  @State() mainCheckboxStatus: boolean = false;

  @State() totalColSpan: number = 0;

  @State() zebraMode: 'rows-odd' | 'rows-even' | 'columns-odd' | 'columns-even' | 'none' = 'none';

  @State() tableId: string | undefined = '';

  tableEl!: HTMLTdsTableElement | null;

  // This observer tracks late-added empty-state content and triggers a rerender so Stencil can relocate it.
  // In light DOM, Stencil may not relocate newly added slot content without a rerender.
  private emptySlotObserver?: MutationObserver;

  connectedCallback() {
    this.emptySlotObserver ??= new MutationObserver((records) => {
      const hasNewEmptyContent = records.some((record) =>
        Array.from(record.addedNodes).some(
          (node) =>
            node instanceof HTMLElement &&
            node.parentElement === this.host &&
            (node.slot === 'no-data' || node.slot === 'no-filtered-data'),
        ),
      );
      if (hasNewEmptyContent) {
        forceUpdate(this.host);
      }
    });
    this.emptySlotObserver.observe(this.host, { childList: true });
  }

  disconnectedCallback() {
    this.emptySlotObserver?.disconnect();
  }

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

  componentWillLoad() {
    this.tableEl = this.host.closest('tds-table');
    this.tableId = this.tableEl?.tableId;

    relevantTableProps.forEach((tablePropName) => {
      this[tablePropName] = this.tableEl?.[tablePropName];
    });
  }

  componentWillRender() {
    // Sum the header cell spans, then add one column per enabled row control.
    const headerCells = this.host.parentElement
      ?.querySelector('tds-table-header')
      ?.querySelectorAll<HTMLTdsHeaderCellElement>(':scope > tds-header-cell');
    const headerColSpan = Array.from(headerCells ?? []).reduce(
      (total, cell) =>
        total + Math.max(1, Number(cell.colSpan ?? cell.getAttribute('col-span')) || 1),
      0,
    );
    this.totalColSpan = Math.max(
      1,
      headerColSpan + Number(!!this.multiselect) + Number(!!this.expandableRows),
    );
  }

  render() {
    return (
      <Host
        data-selected-rows={this.multiselectArrayJSON}
        class={{
          'tds-table--zebra-mode-rows-odd': this.zebraMode === 'rows-odd',
          'tds-table--zebra-mode-rows-even': this.zebraMode === 'rows-even',
          'tds-table--zebra-mode-columns-odd': this.zebraMode === 'columns-odd',
          'tds-table--zebra-mode-columns-even': this.zebraMode === 'columns-even',
        }}
      >
        <slot />

        {/* Empty state row */}
        <tr class="tds-table__empty-state-row">
          <td class="tds-table__empty-state" colSpan={this.totalColSpan}>
            <slot name="no-data" />
            <slot name="no-filtered-data" />
          </td>
        </tr>
      </Host>
    );
  }
}
