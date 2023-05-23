import { Component, Element, h, Host, State, Event, EventEmitter, Listen } from '@stencil/core';
import { InternalSddsTablePropChange } from '../table/table';

const relevantTableProps: InternalSddsTablePropChange['changed'] = [
  'enableMultiselect',
  'verticalDividers',
  'compactDesign',
  'modeVariant',
];

@Component({
  tag: 'sdds-table-body-row',
  styleUrl: 'table-body-row.scss',
  shadow: true,
})
export class TableBodyRow {
  @State() enableMultiselect: boolean = false;

  @State() bodyCheckBoxStatus: boolean = false;

  @State() mainCheckBoxStatus: boolean = false;

  @State() verticalDividers: boolean = false;

  @State() compactDesign: boolean = false;

  @State() noMinWidth: boolean = false;

  @State() modeVariant: 'primary' | 'secondary' = null;

  @State() tableId: string = '';

  @Element() host: HTMLElement;

  tableEl: HTMLSddsTableElement;

  bodyCheckBoxClicked(event) {
    const row = this.host;
    this.bodyCheckBoxStatus = event.currentTarget.checked;
    if (this.bodyCheckBoxStatus === true) {
      row.classList.add('sdds-table__row--selected');
    } else {
      row.classList.remove('sdds-table__row--selected');
    }
    this.internalSddsRowChange.emit(this.bodyCheckBoxStatus);
  }

  bodyCheckBoxStatusUpdater(status) {
    this.mainCheckBoxStatus = status;
    this.bodyCheckBoxStatus = this.mainCheckBoxStatus;
    const row = this.host;
    if (this.bodyCheckBoxStatus === true) {
      row.classList.add('sdds-table__row--selected');
    } else {
      row.classList.remove('sdds-table__row--selected');
    }
    this.internalSddsRowChange.emit(this.bodyCheckBoxStatus);
  }

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

  /** @internal Send status of single row to the parent, sdds-table component that hold logic for data export and main checkbox control */
  @Event({
    eventName: 'internalSddsRowChange',
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  internalSddsRowChange: EventEmitter<boolean>;

  /** @internal Event that triggers pagination function. Needed as first rows have to be rendered in order for pagination to run */
  @Event({
    eventName: 'internalSddsPagination',
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  internalSddsPagination: EventEmitter<string>;

  @Listen('internalSddsMainCheckboxSelect', { target: 'body' })
  headCheckboxListener(event: CustomEvent<any>) {
    if (this.tableId === event.detail[0]) {
      this.bodyCheckBoxStatusUpdater(event.detail[1]);
    }
  }

  @Listen('internalSddsCheckboxChange', { target: 'body' })
  internalSddsCheckboxChangeListener(event: CustomEvent<any>) {
    const [receivedID, receivedBodyCheckboxStatus] = event.detail;
    if (this.tableId === receivedID) {
      this.bodyCheckBoxStatusUpdater(receivedBodyCheckboxStatus);
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

  componentDidLoad() {
    this.internalSddsPagination.emit(this.tableId);
  }

  render() {
    return (
      <Host
        class={{
          'sdds-table__row': true,
          'sdds-table__compact': this.compactDesign,
          'sdds-table--divider': this.verticalDividers,
          'sdds-mode-variant-primary': this.modeVariant === 'primary',
          'sdds-mode-variant-secondary': this.modeVariant === 'secondary',
        }}
      >
        {this.enableMultiselect && (
          <td class="sdds-table__body-cell sdds-table__body-cell--checkbox sdds-form-label sdds-form-label--table">
            <sdds-checkbox
              onSddsChange={(event) => this.bodyCheckBoxClicked(event)}
              checked={this.bodyCheckBoxStatus}
            ></sdds-checkbox>
          </td>
        )}
        <slot></slot>
      </Host>
    );
  }
}
