import { Component, h, Host, State, Event, EventEmitter, Listen, Element } from '@stencil/core';
import { InternalSddsTablePropChange } from '../table/table';

const relevantTableProps: InternalSddsTablePropChange['changed'] = [
  'enableMultiselect',
  'enableExpandableRows',
  'verticalDividers',
  'compactDesign',
  'noMinWidth',
];

@Component({
  tag: 'sdds-table-header',
  styleUrl: 'table-header.scss',
  shadow: true,
})
export class TableHeaderRow {
  @State() enableMultiselect: boolean = false;

  @State() enableExpandableRows: boolean = false;

  @State() mainCheckboxSelected: boolean = false;

  @State() mainExpendSelected: boolean = false;

  @State() verticalDividers: boolean = false;

  @State() compactDesign: boolean = false;

  @State() noMinWidth: boolean = false;

  @State() whiteBackground: boolean = false;

  @State() enableToolbarDesign: boolean = false;

  @State() tableId: string = '';

  @Element() host: HTMLElement;

  tableEl: HTMLSddsTableElement;

  /** @internal Send status of the main checkbox in header to the parent, sdds-table component */
  @Event({
    eventName: 'internalSddsMainCheckboxSelect',
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  internalSddsMainCheckboxSelect: EventEmitter<any>;

  @Listen('internalSddsTablePropChange', { target: 'body' })
  internalSddsPropChangeListener(event: CustomEvent<InternalSddsTablePropChange>) {
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

  @Listen('internalSddsMainCheckboxChange', { target: 'body' })
  internalSddsMainCheckboxChangeListener(event: CustomEvent<any>) {
    const [receivedID, receivedMainCheckboxStatus] = event.detail;
    if (this.tableId === receivedID) {
      this.mainCheckboxSelected = receivedMainCheckboxStatus;
    }
  }

  @Listen('internalSddsRowExpanded', { target: 'body' })
  internalSddsRowExpandedListener(event: CustomEvent<any>) {
    if (this.tableId === event.detail[0]) {
      // TODO: Improve this logic. Why we get late repose in DOM?
      setTimeout(() => {
        this.bodyExpandClicked();
      }, 100);
    }
  }

  bodyExpandClicked() {
    const numberOfExtendRowsActive = this.host.parentElement
      .querySelector('sdds-table-body')
      .getElementsByClassName('sdds-table__row-extend--active').length;
    const numberOfExtendRows = this.host.parentElement
      .querySelector('sdds-table-body')
      .getElementsByTagName('sdds-table-body-row-expendable').length;

    if (numberOfExtendRows === numberOfExtendRowsActive) {
      this.mainExpendSelected = true;
    } else {
      this.mainExpendSelected = false;
    }
  }

  connectedCallback() {
    this.tableEl = this.host.closest('sdds-table');
    this.tableId = this.tableEl.tableId;
  }

  componentWillLoad() {
    relevantTableProps.forEach((tablePropName) => {
      this[tablePropName] = this.tableEl[tablePropName];
    });
  }

  componentWillRender() {
    this.enableToolbarDesign =
      this.host.closest('sdds-table').getElementsByTagName('sdds-table-toolbar').length >= 1;
  }

  headCheckBoxClicked(event) {
    this.mainCheckboxSelected = event.currentTarget.checked;
    this.internalSddsMainCheckboxSelect.emit([this.tableId, this.mainCheckboxSelected]);
  }

  render() {
    return (
      <Host
        class={{
          'sdds-table--compact': this.compactDesign,
          'sdds-table--divider': this.verticalDividers,
          'sdds-table--toolbar-available': this.enableToolbarDesign,
        }}
      >
        <tr>
          {this.enableMultiselect && (
            <th class="sdds-table__header-cell sdds-table__header-cell--checkbox">
              <div class="sdds-form-label sdds-form-label--table">
                <sdds-checkbox
                  checked={this.mainCheckboxSelected}
                  onSddsChange={(event) => this.headCheckBoxClicked(event)}
                ></sdds-checkbox>
              </div>
            </th>
          )}
          {this.enableExpandableRows && (
            <th class="sdds-table__header-cell sdds-table__header-cell--checkbox"></th>
          )}
          <slot></slot>
        </tr>
      </Host>
    );
  }
}
