import {
  Component,
  Element,
  h,
  Host,
  State,
  Event,
  EventEmitter,
  Listen,
  Prop,
} from '@stencil/core';
import { InternalTdsTablePropChange } from '../table/table';

const relevantTableProps: InternalTdsTablePropChange['changed'] = [
  'multiselect',
  'verticalDividers',
  'compactDesign',
];

/**
 * @slot <default> - <b>Unnamed slot.</b> For the cells.
 */
@Component({
  tag: 'tds-table-body-row',
  styleUrl: 'table-body-row.scss',
  shadow: true,
})
export class TdsTableBodyRow {
  /** Marks the row as selected, used for multiselect.s */
  @Prop({ reflect: true }) selected: boolean = false;

  @State() multiselect: boolean = false;

  @State() mainCheckBoxStatus: boolean = false;

  @State() verticalDividers: boolean = false;

  @State() compactDesign: boolean = false;

  @State() noMinWidth: boolean = false;

  @State() tableId: string = '';

  @Element() host: HTMLElement;

  tableEl: HTMLTdsTableElement;

  /**  Send status of single row to the parent, tds-table component that hold logic for data export and main checkbox control */
  @Event({
    eventName: 'tdsSelectChange',
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  tdsSelectChange: EventEmitter<{
    tableId: string;
    checked: boolean;
  }>;

  handleCheckboxChange(event) {
    this.selected = event.detail.checked;
    this.tdsSelectChange.emit({
      tableId: this.tableId,
      checked: this.selected,
    });

    const tableRows = Array.from(this.host.parentElement.querySelectorAll('tds-table-body-row'));
    const allSelected = tableRows.every((element) => {
      console.log(element.classList.contains('selected'));
      return element.selected;
    });
    this.tableEl.querySelector('tds-table-header').allSelected = allSelected;
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

  @Listen('tdsSelectAllChange', { target: 'body' })
  selectAllListener(
    event: CustomEvent<{
      id: string;
      checked: boolean;
    }>,
  ) {
    if (this.tableId === event.detail.id) {
      this.selected = event.detail.checked;
    }
  }

  /** @internal Event that triggers pagination function. Needed as first rows have to be rendered in order for pagination to run */
  @Event({
    eventName: 'internalTdsPagination',
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  internalTdsPagination: EventEmitter<string>;

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
          'selected': this.selected,
          'tds-table__compact': this.compactDesign,
          'tds-table--divider': this.verticalDividers,
        }}
      >
        {this.multiselect && (
          <td class="tds-table__body-cell tds-table__body-cell--checkbox tds-form-label tds-form-label--table">
            <tds-checkbox
              onTdsChange={(event) => this.handleCheckboxChange(event)}
              checked={this.selected}
            ></tds-checkbox>
          </td>
        )}
        <slot></slot>
      </Host>
    );
  }
}
