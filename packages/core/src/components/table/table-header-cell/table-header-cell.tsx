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

  @State() textAlignState: string;

  @State() sortingDirection: 'asc' | 'desc' = 'asc';

  @State() sortedByMyKey: boolean = false;

  @State() verticalDividers: boolean = false;

  @State() compactDesign: boolean = false;

  @State() noMinWidth: boolean = false;

  @State() multiselect: boolean = false;

  @State() enableToolbarDesign: boolean = false;

  @State() tableId: string = '';

  @State() expandableRows: boolean = false;

  @Element() host: HTMLElement;

  tableEl: HTMLTdsTableElement;

  /** Sends unique Table identifier, column key and sorting direction to the tds-table-body component,
   * can also be listened to implement custom-sorting logic. */
  @Event({
    eventName: 'tdsSort',
    composed: true,
    cancelable: true,
    bubbles: true,
  })
  tdsSort: EventEmitter<{
    tableId: string;
    columnKey: string;
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
    tableId: string;
    key: string;
  }>;

  /** @internal Sends unique Table identifier,
   * column key and text align value so the body cells with a same key take the same text alignment as header cell */
  @Event({
    eventName: 'internalTdsTextAlign',
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  internalTdsTextAlign: EventEmitter<any>;

  /** @internal Sends unique Table identifier, column key so the body cells with the same key change background when user hovers over header cell */
  @Event({
    eventName: 'internalTdsHover',
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  internalTdsHover: EventEmitter<{
    tableId: string;
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
          this.sortingDirection = null;
        }, 200);
      }
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

  componentWillRender() {
    // if text alignment matches any of the acceptable values, use it. Otherwise, set "left" as default
    this.textAlignState = ['left', 'start', 'right', 'end', 'center'].includes(this.textAlign)
      ? this.textAlign
      : 'left';

    // To enable body cells text align per rules set in head cell
    this.internalTdsTextAlign.emit([this.tableId, this.cellKey, this.textAlignState]);

    this.enableToolbarDesign =
      this.host.closest('tds-table').getElementsByTagName('tds-table-toolbar').length >= 1;
  }

  sortButtonClick = () => {
    // Toggling direction of sorting as we only use one button for sorting
    if (this.sortingDirection !== 'asc') {
      this.sortingDirection = 'asc';
    } else {
      this.sortingDirection = 'desc';
    }
    // Settings to true we can set enable CSS class for "active" state of column
    this.sortedByMyKey = true;

    /* Emit sort event */
    this.tdsSort.emit({
      tableId: this.tableId,
      columnKey: this.cellKey,
      sortingDirection: this.sortingDirection,
    });

    /**
     * Emits sortButtonClicked event which is listened to by all the header-cells.
     * This resets the sorting button in the header-cell that was not clicked.
     */
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
        >
          <span class="tds-table__header-button-text">
            {this.cellValue}
            <slot />
          </span>

          {this.sortingDirection === null && (
            <svg
              class="tds-table__header-button-icon"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 12 15"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8.45 13.67V4.62a.5.5 0 0 1 1 0v9.05h-1Z"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6.07 10.28a.5.5 0 0 1 .7.08l2.1 2.66a.1.1 0 0 0 .15 0l2.09-2.66a.5.5 0 1 1 .78.62l-2.08 2.66a1.1 1.1 0 0 1-1.73 0l-2.1-2.66a.5.5 0 0 1 .1-.7ZM3.55.4v9.04a.5.5 0 1 1-1 0V.39h1Z"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.93 3.78a.5.5 0 0 1-.7-.08l-2.1-2.66a.1.1 0 0 0-.15 0L.89 3.7a.5.5 0 0 1-.78-.62L2.19.42a1.1 1.1 0 0 1 1.73 0l2.1 2.66a.5.5 0 0 1-.1.7Z"
              />
            </svg>
          )}
          {/* The First icon is arrow down as the first-set direction is ascending, clicking it again rotates the icon as we set descending order */}
          {this.sortingDirection && (
            <svg
              class={`tds-table__header-button-icon ${
                this.sortingDirection === 'desc' ? 'tds-table__header-button-icon--rotate' : ''
              }`}
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M17 2.974a1 1 0 0 0-2 0v24.3l-9.312-9.312a1 1 0 0 0-1.414 1.414l9.887 9.888a2.6 2.6 0 0 0 3.677 0l9.888-9.888a1 1 0 0 0-1.414-1.414L17 27.274v-24.3Z"
              />
            </svg>
          )}
        </button>
      );
    }
    return (
      <p class="tds-table__header-text" style={{ textAlign: this.textAlignState }}>
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
        }}
        style={{ minWidth: this.customWidth }}
        // Calling actions from here to enable hover functionality for both sortable and unsortable Tables
        onMouseOver={() => this.onHeadCellHover(this.cellKey)}
        onMouseLeave={() => this.onHeadCellHover('')}
      >
        {this.headerCellContent()}
      </Host>
    );
  }
}
