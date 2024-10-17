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
  /** Marks the row as selected, used for multiselect table. */
  @Prop({ reflect: true }) selected: boolean = false;

  /** Marks the row as disabled, used for multiselect table. */
  @Prop({ reflect: true }) disabled?: boolean = false;

  /** Makes the row clickable and tabbable for accessibility purposes. */
  @Prop({ reflect: true }) clickable: boolean = false;

  @State() multiselect: boolean = false;

  @State() mainCheckBoxStatus: boolean = false;

  @State() verticalDividers: boolean = false;

  @State() compactDesign: boolean = false;

  @State() noMinWidth: boolean = false;

  @State() tableId: string = '';

  @Element() host: HTMLElement;

  tableEl: HTMLTdsTableElement;

  /** Event emitted when a row is selected/deselected. */
  @Event({
    eventName: 'tdsSelect',
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  tdsSelect: EventEmitter<{
    tableId: string;
    checked: boolean;
    selectedRows: any[];
  }>;

  /** Event emitted when a row is clicked. */
  @Event({
    eventName: 'tdsClick',
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  // return clickevent
  tdsClick: EventEmitter<{
    event: MouseEvent;
    tableId: string;
    rowIndex: number;
  }>;

  async handleCheckboxChange(event) {
    this.selected = event.detail.checked;
    this.tdsSelect.emit({
      tableId: this.tableId,
      checked: this.selected,
      selectedRows: await this.tableEl.getSelectedRows(),
    });
  }

  handleRowClick(e) {
    if (!this.clickable) return;
    let rowIndex = Array.from(this.host.parentElement.children).indexOf(this.host);

    this.tdsClick.emit({
      event: e,
      tableId: this.tableId,
      rowIndex: rowIndex,
    });
  }

  handleKeyDown(e) {
    if (this.clickable && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      this.handleRowClick(e);
    }
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

  connectedCallback() {
    this.tableEl = this.host.closest('tds-table');
    this.tableId = this.tableEl.tableId;
  }

  componentWillLoad() {
    relevantTableProps.forEach((tablePropName) => {
      this[tablePropName] = this.tableEl[tablePropName];
    });
  }

  render() {
    return (
      <Host
        tabindex={this.clickable ? '0' : null}
        class={{
          'tds-table__row': true,
          'tds-table__row--selected': this.selected,
          'tds-table__compact': this.compactDesign,
          'tds-table--divider': this.verticalDividers,
          'tds-table__row--clickable': this.clickable,
        }}
        onClick={(e) => this.handleRowClick(e)}
        onKeyDown={(e) => this.handleKeyDown(e)}
      >
        {this.multiselect && (
          <td class="tds-table__body-cell tds-table__body-cell--checkbox tds-form-label tds-form-label--table">
            <tds-checkbox
              onTdsChange={(event) => this.handleCheckboxChange(event)}
              checked={this.selected}
              disabled={this.disabled}
            ></tds-checkbox>
          </td>
        )}
        <slot></slot>
      </Host>
    );
  }
}
