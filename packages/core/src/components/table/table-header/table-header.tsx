import {
  Component,
  h,
  Host,
  State,
  Event,
  EventEmitter,
  Listen,
  Element,
  Prop,
  Watch,
} from '@stencil/core';

import { InternalTdsTablePropChange } from '../table/table';
import { InternalTdsRowExpandedProps } from '../table-body-row-expandable/table-body-row-expandable';
import generateUniqueId from '../../../utils/generateUniqueId';

const relevantTableProps: InternalTdsTablePropChange['changed'] = [
  'multiselect',
  'expandableRows',
  'verticalDividers',
  'compactDesign',
  'noMinWidth',
  'stickyHeader',
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
  /** @deprecated Deprecated, use selected instead. */
  @Prop({ reflect: true, mutable: true }) allSelected: boolean = false;

  /** Prop for controlling the checked/unchecked state of the "All selected"-checkbox. */
  @Prop({ reflect: true, mutable: true }) selected?: boolean;

  /** Prop for controlling the enabled/disabled state of the "All selected"-checkbox. */
  @Prop({ reflect: true, mutable: true }) disabled?: boolean = false;

  /** Prop for controlling the indeterminate state of the "All selected"-checkbox. */
  @Prop({ reflect: true }) indeterminate: boolean = false;

  @State() stickyHeader: boolean = false;

  @State() multiselect: boolean = false;

  @State() expandableRows: boolean = false;

  @State() mainCheckboxSelected: boolean = false;

  @State() mainExpendSelected: boolean = false;

  @State() verticalDividers: boolean = false;

  @State() compactDesign: boolean = false;

  @State() noMinWidth: boolean = false;

  @State() whiteBackground: boolean = false;

  @State() enableToolbarDesign: boolean = false;

  @State() tableId: string | undefined = '';

  @State() id: string = generateUniqueId();

  @Element() host!: HTMLElement;

  tableEl!: HTMLTdsTableElement | null;

  /** Event emitted when the status of the select all checkbox changes. */
  @Event({
    eventName: 'tdsSelectAll',
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  tdsSelectAll!: EventEmitter<{
    tableId: string | undefined;
    checked: boolean;
    selectedRows: object[] | undefined;
  }>;

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

  @Listen('internalTdsRowExpanded', { target: 'body' })
  internalTdsRowExpandedListener(event: CustomEvent<InternalTdsRowExpandedProps>) {
    if (this.tableId === event.detail.tableId) {
      // TODO: Improve this logic. Why we get late repose in DOM?
      setTimeout(() => {
        this.bodyExpandClicked();
      }, 100);
    }
  }

  bodyExpandClicked() {
    const parentBody = this.host.parentElement?.querySelector('tds-table-body');
    if (parentBody) {
      const numberOfExtendRowsActive = parentBody.getElementsByClassName(
        'tds-table__row-extend--active',
      ).length;
      const numberOfExtendRows = parentBody.getElementsByTagName(
        'tds-table-body-row-expendable',
      ).length;

      if (numberOfExtendRows === numberOfExtendRowsActive) {
        this.mainExpendSelected = true;
      } else {
        this.mainExpendSelected = false;
      }
    }
  }

  componentWillLoad() {
    this.tableEl = this.host.closest('tds-table');
    this.tableId = this.tableEl?.tableId;
    this.host.id = this.id;

    relevantTableProps.forEach((tablePropName) => {
      this[tablePropName] = this.tableEl?.[tablePropName];
    });
    this.onSelectedChange(this.selected);
  }

  componentWillRender() {
    const closestTable = this.host.closest('tds-table');
    if (closestTable) {
      this.enableToolbarDesign =
        closestTable?.getElementsByTagName('tds-table-toolbar').length >= 1;
    }
    if (!this.stickyHeader) return;

    const headers = closestTable?.getElementsByTagName('tds-table-header');

    if (!headers) return;

    const index = Array.from(headers).findIndex((header) => header.id === this.id);

    if (index < 0) return;

    const toolbarHeight = this.compactDesign ? 56 : 64;
    const topDistance = this.compactDesign ? 32 * index : 48 * index;
    (headers[index] as HTMLElement).style.top = this.enableToolbarDesign
      ? `${toolbarHeight + topDistance}px`
      : `${topDistance}px`;
  }

  @Watch('selected')
  onSelectedChange(newValue?: boolean) {
    if (newValue === undefined) return;
    this.allSelected = newValue;
  }

  async handleCheckboxChange(event) {
    this.selected = event.detail.checked;
    this.tdsSelectAll.emit({
      tableId: this.tableId,
      checked: event.detail.checked,
      selectedRows: await this.tableEl?.getSelectedRows(),
    });
  }

  render() {
    return (
      <Host
        class={{
          'tds-table--header-sticky': this.stickyHeader,
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
                  checked={this.allSelected || this.selected}
                  disabled={this.disabled}
                  indeterminate={this.indeterminate}
                  onTdsChange={(event) => this.handleCheckboxChange(event)}
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
