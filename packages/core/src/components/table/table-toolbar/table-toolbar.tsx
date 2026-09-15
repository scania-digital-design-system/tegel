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
  @Prop({ reflect: true }) tdsSearchAriaLabel: string = '';

  @State() verticalDividers: boolean = false;

  @State() compactDesign: boolean = false;

  @State() noMinWidth: boolean = false;

  @State() whiteBackground: boolean = false;

  @State() tableId: string | undefined = '';

  @State() horizontalScrollWidth: string | null = null;

  @Element() host!: HTMLElement;

  @State() showSearchBarInput = false;

  tableEl!: HTMLTdsTableElement | null;

  textFieldEl!: HTMLTdsTextFieldElement | null;

  /** Used for sending users' input to the main parent tds-table the component,
   * can also be listened to in order to implement custom sorting logic. */
  @Event({
    eventName: 'tdsFilter',
    composed: true,
    cancelable: true,
    bubbles: true,
  })
  tdsFilter!: EventEmitter<{
    tableId: string | undefined;
    query: string;
  }>;

  private shouldFocusSearch = false;

  private openSearch = () => {
    this.shouldFocusSearch = true;
    this.showSearchBarInput = true;
  };

  componentDidRender() {
    if (this.shouldFocusSearch && this.showSearchBarInput) {
      this.shouldFocusSearch = false;

      requestAnimationFrame(() => {
        this.textFieldEl?.focusElement();
      });
    }
  }

  @Listen('click', { target: 'document' })
  @Listen('keydown', { target: 'body' })
  handleDocumentClick(event: MouseEvent | KeyboardEvent) {
    if (!this.showSearchBarInput) return;

    const value = this.textFieldEl?.value ?? '';

    if (!value.trim()) {
      if (
        (event.type === 'keydown' && (event as KeyboardEvent).key === 'Tab') ||
        (event.type === 'click' && !event.composedPath().includes(this.host))
      ) {
        requestAnimationFrame(() => {
          this.showSearchBarInput = false;
        });
      }
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
    this.tableId = this.tableEl?.tableId;
  }

  componentWillLoad() {
    relevantTableProps.forEach((tablePropName) => {
      this[tablePropName] = this.tableEl?.[tablePropName];
    });

    // Only a rendered search input needs an accessible name; render() gates it on `filter`.
    if (this.filter && !this.tdsSearchAriaLabel) {
      console.warn('tds-table-toolbar: tdsSearchAriaLabel is highly recommended for accessibility');
    }
  }

  handleSearch(event) {
    const searchTerm = event.currentTarget.value.toLowerCase();
    this.tdsFilter.emit({
      tableId: this.tableId,
      query: searchTerm,
    });
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
              <div
                class={`tds-table__searchbar ${
                  this.showSearchBarInput ? 'tds-table__searchbar--active' : ''
                }`}
              >
                <tds-text-field
                  ref={(el: HTMLTdsTextFieldElement | undefined) => {
                    if (el) {
                      this.textFieldEl = el;
                    }
                  }}
                  id="search"
                  size="sm"
                  autoFocus={true}
                  placeholder="Search..."
                  class={`tds-table__searchbar-input ${
                    this.showSearchBarInput ? 'tds-table__searchbar-input-show' : ''
                  }`}
                  type="text"
                  onKeyUp={(event) => this.handleSearch(event)}
                  aria-label={this.tdsSearchAriaLabel}
                >
                  <tds-icon slot="suffix" name="search" size="16px"></tds-icon>
                </tds-text-field>
                <tds-button
                  class={`tds-table__searchbar-icon ${
                    this.showSearchBarInput ? 'tds-table__searchbar-icon-hide' : ''
                  }`}
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={this.openSearch}
                >
                  <tds-icon slot="icon" name="search" size="20px"></tds-icon>
                </tds-button>
              </div>
            )}
            <slot name="end" />
          </div>
        </div>
      </Host>
    );
  }
}
