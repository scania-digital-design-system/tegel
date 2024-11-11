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
} from '@stencil/core';
import { InternalTdsTablePropChange } from '../table/table';
import { getPrefixedTagNames } from '../../../utils/tagName';
import { findClosestComponent } from '../../../utils/findClosestComponent';
import { getDirectChildHTMLElementOfKind } from '../../../utils/getDirectChildHTMLElementOfKind';

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
  /** @deprecated Deprecated, use selected instead. */
  @Prop({ reflect: true, mutable: true }) allSelected: boolean = false;

  /** Prop for controlling the checked/unchecked state of the "All selected"-checkbox. */
  @Prop({ reflect: true, mutable: true }) selected: boolean;

  /** Prop for controlling the enabled/disabled state of the "All selected"-checkbox. */
  @Prop({ reflect: true, mutable: true }) disabled?: boolean = false;

  /** Prop for controlling the indeterminate state of the "All selected"-checkbox. */
  @Prop() indeterminate: boolean = false;

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

  /** Event emitted when the status of the select all checkbox changes. */
  @Event({
    eventName: 'tdsSelectAll',
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  tdsSelectAll: EventEmitter<{
    tableId: string;
    checked: boolean;
    selectedRows: any[];
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
    this.tableEl = findClosestComponent(this.host, 'tdsTable') as HTMLTdsTableElement;
    this.tableId = this.tableEl.tableId;
  }

  componentWillLoad() {
    relevantTableProps.forEach((tablePropName) => {
      this[tablePropName] = this.tableEl[tablePropName];
    });
  }

  componentWillRender() {
    const tdsTableElement = findClosestComponent(this.host, 'tdsTable') as HTMLTdsTableElement;

    this.enableToolbarDesign =
      getDirectChildHTMLElementOfKind(tdsTableElement, 'tds-table-toolbar').length >= 1;
  }

  async handleCheckboxChange(event) {
    this.allSelected = event.detail.checked;
    this.tdsSelectAll.emit({
      tableId: this.tableId,
      checked: event.detail.checked,
      selectedRows: await this.tableEl.getSelectedRows(),
    });
  }

  render() {
    const prefixedTagNames = getPrefixedTagNames(this.host);
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
                <prefixedTagNames.tdsCheckbox
                  checked={this.allSelected || this.selected}
                  disabled={this.disabled}
                  indeterminate={this.indeterminate}
                  onTdsChange={(event) => this.handleCheckboxChange(event)}
                />
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
