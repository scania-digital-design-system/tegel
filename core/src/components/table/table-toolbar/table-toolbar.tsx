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
import { InternalSddsTablePropChange } from '../table/table';

const relevantTableProps: InternalSddsTablePropChange['changed'] = [
  'compactDesign',
  'noMinWidth',
  'verticalDividers',
];

@Component({
  tag: 'sdds-table-toolbar',
  styleUrl: 'table-toolbar.scss',
  shadow: true,
})
export class TableToolbar {
  /** Adds title to the data-table */
  @Prop({ reflect: true }) tableTitle: string = '';

  /** Enables preview of searchbar */
  @Prop({ reflect: true }) enableFiltering: boolean = false;

  @State() verticalDividers: boolean = false;

  @State() compactDesign: boolean = false;

  @State() noMinWidth: boolean = false;

  @State() whiteBackground: boolean = false;

  @State() tableId: string = '';

  @Element() host: HTMLElement;

  tableEl: HTMLSddsTableElement;

  /** Used for sending users input to main parent <sdds-table> component, can also be listened to in order to implement custom sorting logic. */
  @Event({
    eventName: 'sddsFilterChange',
    composed: true,
    cancelable: true,
    bubbles: true,
  })
  sddsFilterChange: EventEmitter<{
    tableId: string;
    query: string;
  }>;

  /** @internal Internal event to notify sdds-table-body that a filter/search has been made. */
  @Event({
    eventName: 'internalSddsFilter',
    composed: true,
    cancelable: true,
    bubbles: true,
  })
  internalSddsFilter: EventEmitter<{
    tableId: string;
    query: string;
  }>;

  @Listen('internalSddsTablePropChange', { target: 'body' })
  internalSddsPropChangeListener(event: CustomEvent<InternalSddsTablePropChange>) {
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
    this.tableEl = this.host.closest('sdds-table');
    this.tableId = this.tableEl.tableId;
  }

  componentWillLoad() {
    relevantTableProps.forEach((tablePropName) => {
      this[tablePropName] = this.tableEl[tablePropName];
    });
  }

  searchFunction(event) {
    const searchTerm = event.currentTarget.value.toLowerCase();
    const sddsTableSearchBar = event.currentTarget.parentElement;

    const sddsFilterEvent = this.sddsFilterChange.emit({
      tableId: this.tableId,
      query: searchTerm,
    });

    if (!sddsFilterEvent.defaultPrevented) {
      this.internalSddsFilter.emit({
        tableId: this.tableId,
        query: searchTerm,
      });
    }

    if (searchTerm.length > 0) {
      sddsTableSearchBar.classList.add('sdds-table__searchbar--active');
    } else {
      sddsTableSearchBar.classList.remove('sdds-table__searchbar--active');
    }
  }

  render() {
    return (
      <Host class={this.compactDesign ? 'sdds-table--compact' : ''}>
        <div class="sdds-table__upper-bar-flex">
          <caption class="sdds-table__title">{this.tableTitle}</caption>
          <div class="sdds-table__actionbar">
            {this.enableFiltering && (
              <div class="sdds-table__searchbar">
                <input
                  class="sdds-table__searchbar-input"
                  type="text"
                  onKeyUp={(event) => this.searchFunction(event)}
                />
                <span class="sdds-table__searchbar-icon">
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
            <slot name="sdds-table__actionbar" />
          </div>
        </div>
      </Host>
    );
  }
}
