import {
  Component,
  Prop,
  h,
  Host,
  Event,
  EventEmitter,
  State,
  Listen,
  Element,
} from '@stencil/core';
import { InternalTdsTablePropChange } from '../table/table';

const relevantTableProps: InternalTdsTablePropChange['changed'] = [
  'multiselect',
  'expandableRows',
  'compactDesign',
  'noMinWidth',
  'verticalDividers',
];

/**
 * @slot <default> - <b>Unnamed slot.</b> For the cell contents.
 */

@Component({
  tag: 'tds-header-cell',
  styleUrl: 'table-header-cell.scss',
  shadow: true,
})
export class TdsTableHeaderCell {
  /** The value of column key, usually comes from JSON, needed for sorting */
  @Prop({ reflect: true }) cellKey?: string;

  /** Text that displays in column cell */
  @Prop({ reflect: true }) cellValue?: string;

  /** In case noMinWidth is set, the user has to specify the width value for each column. */
  @Prop({ reflect: true }) customWidth?: string;

  /** Enables sorting on that column */
  @Prop() sortable: boolean = false;

  /** Setting for text align, default is "left". Other accepted values are "left", "start", "right" or "end". */
  @Prop({ reflect: true }) textAlign: 'left' | 'start' | 'right' | 'end' | 'center' = 'left';

  /** Disables internal padding. Useful when passing other components to cell. */
  @Prop({ reflect: true }) disablePadding: boolean = false;

  /** Aria label for the sort button, providing an accessible description */
  @Prop({ reflect: true }) tdsAriaLabelSortButton?: string = '';

  @State() textAlignState: string;

  @State() sortingDirection: 'asc' | 'desc' | undefined;

  @State() sortedByMyKey: boolean = false;

  @State() verticalDividers: boolean = false;

  @State() compactDesign: boolean = false;

  @State() noMinWidth: boolean = false;

  @State() multiselect: boolean = false;

  @State() enableToolbarDesign: boolean = false;

  @State() tableId: string | undefined = '';

  @State() expandableRows: boolean = false;

  @Element() host: HTMLElement;

  tableEl: HTMLTdsTableElement | null;

  /** Sends unique Table identifier, column key and sorting direction to the tds-table-body component,
   * can also be listened to implement custom-sorting logic. */
  @Event({
    eventName: 'tdsSort',
    composed: true,
    cancelable: true,
    bubbles: true,
  })
  tdsSort: EventEmitter<{
    tableId: string | undefined;
    columnKey: string | undefined;
    sortingDirection: 'asc' | 'desc';
  }>;

  /**  @internal Sends unique Table identifier, column key and sorting direction to the tds-table-body component,
   * can also be listened to implement custom-sorting logic. */
  @Event({
    eventName: 'internalSortButtonClicked',
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  internalSortButtonClicked: EventEmitter<{
    tableId: string | undefined;
    key: string | undefined;
  }>;

  /** @internal Sends unique Table identifier,
   * column key and text align value so the body cells with a same key take the same text alignment as header cell */
  @Event({
    eventName: 'internalTdsTextAlign',
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  internalTdsTextAlign: EventEmitter<object>;

  /** @internal Sends unique Table identifier, column key so the body cells with the same key change background when user hovers over header cell */
  @Event({
    eventName: 'internalTdsHover',
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  internalTdsHover: EventEmitter<{
    tableId: string | undefined;
    key: string;
  }>;

  @Listen('internalTdsPropChange', { target: 'body' })
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

  @Listen('internalSortButtonClicked', { target: 'body' })
  updateOptionsContent(
    event: CustomEvent<{
      tableId: string;
      key: string;
    }>,
  ) {
    const { tableId, key } = event.detail;
    if (this.tableId === tableId) {
      if (this.cellKey !== key) {
        this.sortedByMyKey = false;
        // To sync with CSS transition timing
        setTimeout(() => {
          this.sortingDirection = undefined;
        }, 200);
      }
    }
  }

  connectedCallback() {
    this.tableEl = this.host.closest('tds-table');
    this.tableId = this.tableEl?.tableId;
  }

  componentWillLoad() {
    relevantTableProps.forEach((tablePropName) => {
      this[tablePropName] = this.tableEl?.[tablePropName];
    });
  }

  componentWillRender() {
    // if text alignment matches any of the acceptable values, use it. Otherwise, set "left" as default
    this.textAlignState = ['left', 'start', 'right', 'end', 'center'].includes(this.textAlign)
      ? this.textAlign
      : 'left';

    // To enable body cells text align per rules set in head cell
    this.internalTdsTextAlign.emit([this.tableId, this.cellKey, this.textAlignState]);

    const closesetTable = this.host.closest('tds-table');
    if (closesetTable) {
      this.enableToolbarDesign =
        closesetTable.getElementsByTagName('tds-table-toolbar').length >= 1;
    }
  }

  sortButtonClick = () => {
    if (this.sortingDirection !== 'asc' && this.sortingDirection !== 'desc') {
      this.sortingDirection = 'asc';
    } else {
      this.sortingDirection = this.sortingDirection === 'asc' ? 'desc' : 'asc';
    }
    this.sortedByMyKey = true;

    this.tdsSort.emit({
      tableId: this.tableId,
      columnKey: this.cellKey,
      sortingDirection: this.sortingDirection,
    });

    this.internalSortButtonClicked.emit({
      tableId: this.tableId,
      key: this.cellKey,
    });
  };

  headerCellContent = () => {
    if (this.sortable) {
      return (
        <button
          class="tds-table__header-button"
          onClick={() => this.sortButtonClick()}
          style={{ justifyContent: this.textAlignState }}
          aria-label={this.tdsAriaLabelSortButton}
        >
          <span class="tds-table__header-button-text">
            {this.cellValue}
            <slot />
          </span>

          {this.sortingDirection === undefined && (
            <tds-icon
              svgTitle="sorting"
              class="tds-table__header-button-icon"
              name="sorting"
              size="16px"
            ></tds-icon>
          )}
          {this.sortingDirection && ['asc', 'desc'].includes(this.sortingDirection) && (
            <tds-icon
              svgTitle="arrow down"
              class={`tds-table__header-button-icon ${
                this.sortingDirection === 'asc' ? 'tds-table__header-button-icon--rotate' : ''
              }`}
              name="arrow_down"
              size="16px"
            ></tds-icon>
          )}
        </button>
      );
    }
    return (
      <p
        class={{
          'tds-table__header-text': true,
          'tds-table__header-text-no-padding': this.disablePadding,
        }}
        style={{ textAlign: this.textAlignState }}
      >
        {this.cellValue}
        <slot />
      </p>
    );
  };

  onHeadCellHover = (key) => {
    this.internalTdsHover.emit({
      tableId: this.tableId,
      key,
    });
  };

  private getAriaSort(): 'ascending' | 'descending' | 'none' {
    if (this.sortingDirection === 'asc') return 'ascending';
    if (this.sortingDirection === 'desc') return 'descending';
    return 'none';
  }

  render() {
    return (
      <Host
        class={{
          'tds-table__header-cell': true,
          'tds-table__header-cell--sortable': this.sortable,
          'tds-table__header-cell--is-sorted': this.sortedByMyKey,
          'tds-table__header-cell--custom-width': this.customWidth !== '',
          'tds-table--compact': this.compactDesign,
          'tds-table--divider': this.verticalDividers,
          'tds-table--no-min-width': this.noMinWidth,
          'tds-table--extra-column': this.multiselect || this.expandableRows,
          'tds-table--toolbar-available': this.enableToolbarDesign,
          'tds-table--no-padding': this.disablePadding,
        }}
        style={{ minWidth: this.customWidth }}
        onMouseOver={() => this.onHeadCellHover(this.cellKey)}
        onMouseLeave={() => this.onHeadCellHover('')}
        role="columnheader"
        aria-sort={this.getAriaSort()}
      >
        {this.headerCellContent()}
      </Host>
    );
  }
}
