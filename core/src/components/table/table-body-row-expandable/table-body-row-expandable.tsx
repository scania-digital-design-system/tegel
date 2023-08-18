import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Prop,
  State,
} from '@stencil/core';
import { InternalTdsTablePropChange } from '../table/table';

const relevantTableProps: InternalTdsTablePropChange['changed'] = [
  'verticalDividers',
  'compactDesign',
  'noMinWidth',
  'modeVariant',
];

/**
 * @slot <default> - <b>Unnamed slot.</b> For the cells.
 * @slot expand-row - Slot for the expanded row.
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

  /** @internal Event that triggers pagination function. Needed as first rows have to be rendered in order for pagination to run */
  @Event({
    eventName: 'internalTdsPagination',
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  internalTdsPagination: EventEmitter<string>;

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

  componentDidLoad() {
    this.internalTdsPagination.emit(this.tableId);
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
        <tr class="tds-table__row">
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

        <tr class="tds-table__row-expand">
          <td class="tds-table__cell-expand" colSpan={this.columnsNumber}>
            <slot name="expand-row" />
          </td>
        </tr>
      </Host>
    );
  }
}
