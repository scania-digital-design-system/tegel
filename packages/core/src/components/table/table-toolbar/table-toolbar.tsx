import {
  Component,
  h,
  Host,
  Prop,
  Event,
  EventEmitter,
  Listen,
  State,
  Element,
} from '@stencil/core';
import { InternalTdsTablePropChange } from '../table/table';

const relevantTableProps: InternalTdsTablePropChange['changed'] = [
  'compactDesign',
  'noMinWidth',
  'verticalDividers',
  'horizontalScrollWidth',
];

/**
 * @slot start - Slot for the start (left side) of the Table Toolbar.
 * @slot end - Slot for the end (right side) of the Table Toolbar.
 */
@Component({
  tag: 'tds-table-toolbar',
  styleUrl: 'table-toolbar.scss',
  shadow: true,
})
export class TdsTableToolbar {
  /** Adds title to the Table */
  @Prop({ reflect: true }) tableTitle: string = '';

  /** Enables preview of searchbar */
  @Prop({ reflect: true }) filter: boolean = false;

  /** Aria label for the search input, providing an accessible description */
  @Prop() tdsSearchAriaLabel: string = '';

  @State() verticalDividers: boolean = false;

  @State() compactDesign: boolean = false;

  @State() noMinWidth: boolean = false;

  @State() whiteBackground: boolean = false;

  @State() tableId: string = '';

  @State() horizontalScrollWidth: string = null;

  @Element() host: HTMLElement;

  tableEl: HTMLTdsTableElement;

  /** Used for sending users' input to the main parent tds-table the component,
   * can also be listened to in order to implement custom sorting logic. */
  @Event({
    eventName: 'tdsFilter',
    composed: true,
    cancelable: true,
    bubbles: true,
  })
  tdsFilter: EventEmitter<{
    tableId: string;
    query: string;
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

  connectedCallback() {
    this.tableEl = this.host.closest('tds-table');
    this.tableId = this.tableEl.tableId;

    if (!this.tdsSearchAriaLabel) {
      console.warn('tds-table-toolbar: tdsSearchAriaLabel is highly recommended for accessibility');
    }
  }

  componentWillLoad() {
    relevantTableProps.forEach((tablePropName) => {
      this[tablePropName] = this.tableEl[tablePropName];
    });
  }

  handleSearch(event) {
    const searchTerm = event.currentTarget.value.toLowerCase();
    const tdsTableSearchBar = event.currentTarget.parentElement;

    this.tdsFilter.emit({
      tableId: this.tableId,
      query: searchTerm,
    });

    /** NOTE: Could these be handles in pure CSS? */
    if (searchTerm.length > 0) {
      tdsTableSearchBar.classList.add('tds-table__searchbar--active');
    } else {
      tdsTableSearchBar.classList.remove('tds-table__searchbar--active');
    }
  }

  private getStyles(): Record<string, string> {
    const styles: Record<string, string> = {};
    if (this.horizontalScrollWidth) {
      styles.width = `${this.horizontalScrollWidth}px`;
    }
    return styles;
  }

  render() {
    return (
      <Host
        class={{
          'tds-table--compact': this.compactDesign,
          'toolbar__horizontal-scroll': !!this.horizontalScrollWidth,
        }}
        style={this.getStyles()}
        aria-labelledby="table-toolbar-title"
      >
        <div class="tds-table__upper-bar-flex">
          <div class="tds-table__actionbar-left">
            {this.tableTitle && (
              <caption id="table-toolbar-title" class="tds-table__title">
                {this.tableTitle}
              </caption>
            )}
            <slot name="start" />
          </div>

          <div class="tds-table__actionbar">
            {this.filter && (
              <div class="tds-table__searchbar">
                <input
                  class="tds-table__searchbar-input"
                  type="text"
                  onKeyUp={(event) => this.handleSearch(event)}
                  aria-label={this.tdsSearchAriaLabel}
                />
                <span class="tds-table__searchbar-icon">
                  <tds-icon name="search" size="20px"></tds-icon>
                </span>
              </div>
            )}
            <slot name="end" />
          </div>
        </div>
      </Host>
    );
  }
}
