import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Method,
  Prop,
  State,
  Watch,
} from '@stencil/core';
import { InternalTdsTablePropChange } from '../table/table';
import generateUniqueId from '../../../utils/generateUniqueId';

const relevantTableProps: InternalTdsTablePropChange['changed'] = [
  'verticalDividers',
  'compactDesign',
  'noMinWidth',
  'modeVariant',
];

/**
 * @slot <default> - <b>Unnamed slot.</b> For the cells.
 * @slot expand-row - Slot for the expanded row.

 * @part row - Selector for the main row of the table.
 * @part expand-row - Selector for the expanded row of the table.
 * @part expand-row-cell - Selector for the cell in the expanded row of the table.
 */

@Component({
  tag: 'tds-table-body-row-expandable',
  styleUrl: 'table-body-row-expandable.scss',
  shadow: true,
})
export class TdsTableBodyRowExpandable {
  /** In case that automatic count of columns does not work, user can manually set this one.
   *  Take in mind that expandable control is column too */
  @Prop() colSpan: number = null;

  /** ID for the table row. Randomly generated if not specified. */
  @Prop({ reflect: true }) rowId: string = generateUniqueId();

  /** Sets isExpanded state to true or false externally */
  @Prop({ reflect: true }) expanded: boolean;

  /** Controls the overflow behavior of the expandable row content */
  @Prop({ reflect: true }) overflow: 'auto' | 'hidden' | 'visible' = 'auto';

  /** Sets isExpanded state to true or false internally */
  @State() isExpanded: boolean = false;

  @State() tableId: string = '';

  @State() columnsNumber: number = null;

  @State() verticalDividers: boolean = false;

  @State() compactDesign: boolean = false;

  @State() noMinWidth: boolean = false;

  @State() modeVariant: 'primary' | 'secondary' = null;

  @Element() host: HTMLElement;

  tableEl: HTMLTdsTableElement;

  /** @internal Sends out expanded status which is used by the Table header component */
  @Event({
    eventName: 'internalTdsRowExpanded',
    bubbles: true,
    cancelable: false,
    composed: true,
  })
  internalTdsRowExpanded: EventEmitter<any>;

  /** Sends unique table row identifier and isExpanded status when it is expanded/collapsed. */
  @Event({
    eventName: 'tdsChange',
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  tdsChange: EventEmitter<{
    rowId: string;
    isExpanded: boolean;
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

  @Watch('expanded')
  watchExpanded(newValue: boolean) {
    if (newValue !== this.isExpanded) {
      this.isExpanded = newValue;
      this.tdsChange.emit({ rowId: this.rowId, isExpanded: this.isExpanded });
    }
  }

  /** Method to expand table row */
  @Method()
  async expand() {
    this.isExpanded = true;
    this.tdsChange.emit({ rowId: this.rowId, isExpanded: this.isExpanded });
  }

  /** Method to collapse table row */
  @Method()
  async collapse() {
    this.isExpanded = false;
    this.tdsChange.emit({ rowId: this.rowId, isExpanded: this.isExpanded });
  }

  connectedCallback() {
    /* if user did set a prop we use that as default behaviour */
    if (this.expanded !== undefined) {
      this.isExpanded = this.expanded;
    }

    this.tableEl = this.host.closest('tds-table');
    this.tableId = this.tableEl.tableId;
  }

  componentWillLoad() {
    relevantTableProps.forEach((tablePropName) => {
      this[tablePropName] = this.tableEl[tablePropName];
    });
  }

  componentWillRender() {
    if (this.colSpan !== null) {
      this.columnsNumber = this.colSpan;
    } else {
      this.columnsNumber = this.tableEl.querySelector('tds-table-header').childElementCount + 1;
    }
  }

  sendValue() {
    this.internalTdsRowExpanded.emit([this.tableId, this.isExpanded]);
    this.tdsChange.emit({ rowId: this.rowId, isExpanded: this.isExpanded });
  }

  onChangeHandler(event) {
    this.isExpanded = event.currentTarget.checked === true;
    this.sendValue();
  }

  render() {
    return (
      <Host
        class={{
          'tds-table__row': true,
          'tds-table__row-expand--active': this.isExpanded,
          'tds-table__compact': this.compactDesign,
          'tds-table--divider': this.verticalDividers,
        }}
      >
        <tr
          class={{
            'tds-table__row': true,
            'tds-table__row--expanded': this.isExpanded,
          }}
          part="row"
        >
          <td class="tds-table__cell tds-table__cell--expand">
            <label class="tds-table__expand-control-container">
              <input
                class="tds-table__expand-input"
                type="checkbox"
                onChange={(event) => this.onChangeHandler(event)}
                checked={this.isExpanded}
              />
              <span class="tds-expendable-row-icon">
                <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M4.273 9.783a1 1 0 0 1 1.415 0l9.888 9.888a.6.6 0 0 0 .848 0l9.888-9.888a1 1 0 1 1 1.415 1.414l-9.889 9.889a2.6 2.6 0 0 1-3.677 0l-9.888-9.889a1 1 0 0 1 0-1.414Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
            </label>
          </td>
          <slot />
        </tr>

        <tr
          class={{
            'tds-table__row-expand': true,
            'tds-table__row-expand--expanded': this.isExpanded,
          }}
          part="expand-row"
        >
          <td class="tds-table__cell-expand" part="expand-row-cell" colSpan={this.columnsNumber}>
            <div
              style={{
                overflow: this.overflow,
              }}
            >
              <slot name="expand-row" />
            </div>
          </td>
        </tr>
      </Host>
    );
  }
}
