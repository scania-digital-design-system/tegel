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
];

@Component({
  tag: 'tds-table-toolbar',
  styleUrl: 'table-toolbar.scss',
  shadow: true,
})
export class TdsTableToolbar {
  /** Adds title to the Table */
  @Prop({ reflect: true }) tableTitle: string = '';

  /** Enables preview of searchbar */
  @Prop({ reflect: true }) enableFiltering: boolean = false;

  @State() verticalDividers: boolean = false;

  @State() compactDesign: boolean = false;

  @State() noMinWidth: boolean = false;

  @State() whiteBackground: boolean = false;

  @State() tableId: string = '';

  @Element() host: HTMLElement;

  tableEl: HTMLTdsTableElement;

  /** Used for sending users' input to the main parent tds-table the component,
   * can also be listened to in order to implement custom sorting logic. */
  @Event({
    eventName: 'tdsFilterChange',
    composed: true,
    cancelable: true,
    bubbles: true,
  })
  tdsFilterChange: EventEmitter<{
    tableId: string;
    query: string;
  }>;

  /** @internal Internal event to notify tds-table-body that a filter/search has been made. */
  @Event({
    eventName: 'internalTdsFilter',
    composed: true,
    cancelable: true,
    bubbles: true,
  })
  internalTdsFilter: EventEmitter<{
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
  }

  componentWillLoad() {
    relevantTableProps.forEach((tablePropName) => {
      this[tablePropName] = this.tableEl[tablePropName];
    });
  }

  searchFunction(event) {
    const searchTerm = event.currentTarget.value.toLowerCase();
    const tdsTableSearchBar = event.currentTarget.parentElement;

    const tdsFilterEvent = this.tdsFilterChange.emit({
      tableId: this.tableId,
      query: searchTerm,
    });

    if (!tdsFilterEvent.defaultPrevented) {
      this.internalTdsFilter.emit({
        tableId: this.tableId,
        query: searchTerm,
      });
    }

    if (searchTerm.length > 0) {
      tdsTableSearchBar.classList.add('tds-table__searchbar--active');
    } else {
      tdsTableSearchBar.classList.remove('tds-table__searchbar--active');
    }
  }

  render() {
    return (
      <Host class={this.compactDesign ? 'tds-table--compact' : ''}>
        <div class="tds-table__upper-bar-flex">
          <caption class="tds-table__title">{this.tableTitle}</caption>
          <div class="tds-table__actionbar">
            {this.enableFiltering && (
              <div class="tds-table__searchbar">
                <input
                  class="tds-table__searchbar-input"
                  type="text"
                  onKeyUp={(event) => this.searchFunction(event)}
                />
                <span class="tds-table__searchbar-icon">
                  <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12.942 1.985c-6.051 0-10.957 4.905-10.957 10.957 0 6.051 4.906 10.957 10.957 10.957 2.666 0 5.109-.952 7.008-2.534l8.332 8.331a1 1 0 1 0 1.414-1.414l-8.331-8.331a10.912 10.912 0 0 0 2.534-7.01c0-6.05-4.905-10.956-10.957-10.956ZM3.985 12.942a8.957 8.957 0 1 1 17.914 0 8.957 8.957 0 0 1-17.914 0Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
              </div>
            )}
            <slot name="tds-table__actionbar" />
          </div>
        </div>
      </Host>
    );
  }
}
