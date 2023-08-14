import { Component, h, Host, State, Event, EventEmitter, Listen, Element } from '@stencil/core';
import { InternalTdsTablePropChange } from '../table/table';

const relevantTableProps: InternalTdsTablePropChange['changed'] = [
  'multiselect',
  'expandableRows',
  'verticalDividers',
  'compactDesign',
  'noMinWidth',
];

/**
 * @slot <default> - <b>Unnamed slot.</b> For the header cells.
 */
@Component({
  tag: 'tds-table-header',
  styleUrl: 'table-header.scss',
  shadow: true,
})
export class TdsTableHeaderRow {
  @State() multiselect: boolean = false;

  @State() expandableRows: boolean = false;

  @State() mainCheckboxSelected: boolean = false;

  @State() mainExpendSelected: boolean = false;

  @State() verticalDividers: boolean = false;

  @State() compactDesign: boolean = false;

  @State() noMinWidth: boolean = false;

  @State() whiteBackground: boolean = false;

  @State() enableToolbarDesign: boolean = false;

  @State() tableId: string = '';

  @Element() host: HTMLElement;

  tableEl: HTMLTdsTableElement;

  /** @internal Send status of the main checkbox in header to the parent, tds-table component */
  @Event({
    eventName: 'internalTdsMainCheckboxSelect',
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  internalTdsMainCheckboxSelect: EventEmitter<any>;

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

  @Listen('internalTdsMainCheckboxChange', { target: 'body' })
  internalTdsMainCheckboxChangeListener(event: CustomEvent<any>) {
    const [receivedID, receivedMainCheckboxStatus] = event.detail;
    if (this.tableId === receivedID) {
      this.mainCheckboxSelected = receivedMainCheckboxStatus;
    }
  }

  @Listen('internalTdsRowExpanded', { target: 'body' })
  internalTdsRowExpandedListener(event: CustomEvent<any>) {
    if (this.tableId === event.detail[0]) {
      // TODO: Improve this logic. Why we get late repose in DOM?
      setTimeout(() => {
        this.bodyExpandClicked();
      }, 100);
    }
  }

  bodyExpandClicked() {
    const numberOfExtendRowsActive = this.host.parentElement
      .querySelector('tds-table-body')
      .getElementsByClassName('tds-table__row-extend--active').length;
    const numberOfExtendRows = this.host.parentElement
      .querySelector('tds-table-body')
      .getElementsByTagName('tds-table-body-row-expendable').length;

    if (numberOfExtendRows === numberOfExtendRowsActive) {
      this.mainExpendSelected = true;
    } else {
      this.mainExpendSelected = false;
    }
  }

  connectedCallback() {
    this.tableEl = this.host.closest('tds-table');
    this.tableId = this.tableEl.tableId;
  }

  componentWillLoad() {
    relevantTableProps.forEach((tablePropName) => {
      this[tablePropName] = this.tableEl[tablePropName];
    });
  }

  componentWillRender() {
    this.enableToolbarDesign =
      this.host.closest('tds-table').getElementsByTagName('tds-table-toolbar').length >= 1;
  }

  headCheckBoxClicked(event) {
    this.mainCheckboxSelected = event.currentTarget.checked;
    this.internalTdsMainCheckboxSelect.emit([this.tableId, this.mainCheckboxSelected]);
  }

  render() {
    return (
      <Host
        class={{
          'tds-table--compact': this.compactDesign,
          'tds-table--divider': this.verticalDividers,
          'tds-table--toolbar-available': this.enableToolbarDesign,
        }}
      >
        <tr>
          {this.multiselect && (
            <th class="tds-table__header-cell tds-table__header-cell--checkbox">
              <div class="tds-form-label tds-form-label--table">
                <tds-checkbox
                  checked={this.mainCheckboxSelected}
                  onTdsChange={(event) => this.headCheckBoxClicked(event)}
                ></tds-checkbox>
              </div>
            </th>
          )}
          {this.expandableRows && (
            <th class="tds-table__header-cell tds-table__header-cell--checkbox"></th>
          )}
          <slot></slot>
        </tr>
      </Host>
    );
  }
}
