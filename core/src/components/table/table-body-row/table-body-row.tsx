import { Component, Element, h, Host, State, Event, EventEmitter, Listen } from '@stencil/core';
import { InternalTdsTablePropChange } from '../table/table';

const relevantTableProps: InternalTdsTablePropChange['changed'] = [
  'enableMultiselect',
  'verticalDividers',
  'compactDesign',
  'modeVariant',
];

@Component({
  tag: 'tds-table-body-row',
  styleUrl: 'table-body-row.scss',
  shadow: true,
})
export class TdsTableBodyRow {
  @State() enableMultiselect: boolean = false;

  @State() bodyCheckBoxStatus: boolean = false;

  @State() mainCheckBoxStatus: boolean = false;

  @State() verticalDividers: boolean = false;

  @State() compactDesign: boolean = false;

  @State() noMinWidth: boolean = false;

  @State() modeVariant: 'primary' | 'secondary' = null;

  @State() tableId: string = '';

  @Element() host: HTMLElement;

  tableEl: HTMLTdsTableElement;

  bodyCheckBoxClicked(event) {
    const row = this.host;
    this.bodyCheckBoxStatus = event.currentTarget.checked;
    if (this.bodyCheckBoxStatus === true) {
      row.classList.add('tds-table__row--selected');
    } else {
      row.classList.remove('tds-table__row--selected');
    }
    this.internalTdsRowChange.emit(this.bodyCheckBoxStatus);
  }

  bodyCheckBoxStatusUpdater(status) {
    this.mainCheckBoxStatus = status;
    this.bodyCheckBoxStatus = this.mainCheckBoxStatus;
    const row = this.host;
    if (this.bodyCheckBoxStatus === true) {
      row.classList.add('tds-table__row--selected');
    } else {
      row.classList.remove('tds-table__row--selected');
    }
    this.internalTdsRowChange.emit(this.bodyCheckBoxStatus);
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

  /** @internal Send status of single row to the parent, tds-table component that hold logic for data export and main checkbox control */
  @Event({
    eventName: 'internalTdsRowChange',
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  internalTdsRowChange: EventEmitter<boolean>;

  /** @internal Event that triggers pagination function. Needed as first rows have to be rendered in order for pagination to run */
  @Event({
    eventName: 'internalTdsPagination',
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  internalTdsPagination: EventEmitter<string>;

  @Listen('internalTdsMainCheckboxSelect', { target: 'body' })
  headCheckboxListener(event: CustomEvent<any>) {
    if (this.tableId === event.detail[0]) {
      this.bodyCheckBoxStatusUpdater(event.detail[1]);
    }
  }

  @Listen('internalTdsCheckboxChange', { target: 'body' })
  internalTdsCheckboxChangeListener(event: CustomEvent<any>) {
    const [receivedID, receivedBodyCheckboxStatus] = event.detail;
    if (this.tableId === receivedID) {
      this.bodyCheckBoxStatusUpdater(receivedBodyCheckboxStatus);
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

  componentDidLoad() {
    this.internalTdsPagination.emit(this.tableId);
  }

  render() {
    return (
      <Host
        class={{
          'tds-table__row': true,
          'tds-table__compact': this.compactDesign,
          'tds-table--divider': this.verticalDividers,
          'tds-mode-variant-primary': this.modeVariant === 'primary',
          'tds-mode-variant-secondary': this.modeVariant === 'secondary',
        }}
      >
        {this.enableMultiselect && (
          <td class="tds-table__body-cell tds-table__body-cell--checkbox tds-form-label tds-form-label--table">
            <tds-checkbox
              onTdsChange={(event) => this.bodyCheckBoxClicked(event)}
              checked={this.bodyCheckBoxStatus}
            ></tds-checkbox>
          </td>
        )}
        <slot></slot>
      </Host>
    );
  }
}
