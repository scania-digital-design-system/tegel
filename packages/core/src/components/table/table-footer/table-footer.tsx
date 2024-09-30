import {
  Component,
  h,
  Host,
  Listen,
  State,
  Event,
  EventEmitter,
  Prop,
  Element,
} from '@stencil/core';
import { InternalTdsTablePropChange } from '../table/table';

const relevantTableProps: InternalTdsTablePropChange['changed'] = [
  'compactDesign',
  'horizontalScrollWidth',
];

function removeShakeAnimation(e: AnimationEvent & { target: HTMLElement }) {
  e.target.classList.remove('tds-table__page-selector-input--shake');
}

@Component({
  tag: 'tds-table-footer',
  styleUrl: 'table-footer.scss',
  shadow: true,
})
export class TdsTableFooter {
  /** Enable pagination and show pagination controls  */
  @Prop({ reflect: true }) pagination: boolean = false;

  /** Sets the pagination number. */
  @Prop({ reflect: true, mutable: true }) paginationValue: number = 1;

  @Prop({ reflect: true }) rowsperpage: boolean = true;

  @Prop({ reflect: true }) rowsPerPageValues: number[] = [10, 25, 50];

  /** Sets the number of pages. */
  @Prop({ reflect: true }) pages: number = null;

  /** <b>Client override</b> Used to set the column span of the footer. Use as fallback if the automatic count of columns fails. */
  @Prop() cols: number = null;

  /** State that memorize number of columns to display colSpan correctly - set from parent level */
  @State() columnsNumber: number = 0;

  /* Sets the footer to use compact design. */
  @State() compactDesign: boolean = false;

  @State() lastCorrectValue: number;

  @State() tableId: string = '';

  @State() horizontalScrollWidth: string = null;

  @State() rowsPerPageValue: number = 10;

  @Element() host: HTMLElement;

  /* A reference for the input element used for pagination in the footer. */
  private inputElement: HTMLInputElement;

  /* The footer parent Table. */
  private tableEl: HTMLTdsTableElement;

  /** Event to send current page value to tds-table-body component, can also be listened to in order to implement custom pagination logic. */
  @Event({
    eventName: 'tdsPagination',
    composed: true,
    cancelable: true,
    bubbles: true,
  })
  tdsPagination: EventEmitter<{
    tableId: string;
    paginationValue: number;
    rowsPerPage?: number;
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

    this.storeLastCorrectValue(this.paginationValue);

    /** Get the number of columns. */
    const numberOfColumns =
      this.host.parentElement.querySelector('tds-table-header').childElementCount;
    if (this.cols) {
      this.columnsNumber = this.cols;
    } else {
      this.columnsNumber = numberOfColumns;
    }
  }

  private emitTdsPagination = () => {
    if (this.rowsperpage) {
      this.tdsPagination.emit({
        tableId: this.tableId,
        paginationValue: Number(this.paginationValue),
        rowsPerPage: this.rowsPerPageValue,
      });
    } else {
      this.tdsPagination.emit({
        tableId: this.tableId,
        paginationValue: Number(this.paginationValue),
      });
    }
  };

  /* Function to store last valid input */
  private storeLastCorrectValue(value) {
    this.lastCorrectValue = value;
  }

  private previousPage = () => {
    /** If pages and greater or equal to 2, decrease pagination value.
     * This is to not get under 1 in pagination value.  */
    if (this.paginationValue >= 2) {
      this.paginationValue--;
    }

    this.emitTdsPagination();

    this.storeLastCorrectValue(this.paginationValue);
  };

  private nextPage = () => {
    /** If pages and greater or equal to the number of pages, increase pagination value.
     * This is to not get above the number of pages in pagination value.  */
    if (this.paginationValue <= this.pages) {
      this.paginationValue++;
    }
    this.emitTdsPagination();
    this.storeLastCorrectValue(this.paginationValue);
  };

  private lastPage = () => {
    this.paginationValue = this.pages;
    this.emitTdsPagination();
    this.storeLastCorrectValue(this.paginationValue);
  };

  private firstPage = () => {
    this.paginationValue = 1;
    this.emitTdsPagination();
    this.storeLastCorrectValue(this.paginationValue);
  };

  private paginationInputChange(event) {
    const insertedValue = Number(event.target.value);

    if (insertedValue > event.target.max || insertedValue < event.target.min) {
      event.target.classList.add('tds-table__page-selector-input--shake');
      this.inputElement.value = String(this.lastCorrectValue);
      this.paginationValue = Number(this.inputElement.value);
    } else {
      this.paginationValue = insertedValue;
    }

    this.emitTdsPagination();
    this.storeLastCorrectValue(this.paginationValue);
  }

  private rowsPerPageChange(event) {
    this.rowsPerPageValue = parseInt(event.detail.value);
    this.emitTdsPagination();
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
          'footer__horizontal-scroll': !!this.horizontalScrollWidth,
        }}
        style={this.getStyles()}
      >
        <tr class="tds-table__footer-row">
          <td class="tds-table__footer-cell" colSpan={this.columnsNumber}>
            {this.pagination && (
              <div class="tds-table__pagination">
                <div class="tds-table__row-selector"></div>
                <div class="tds-table__page-selector">
                  {this.rowsperpage && (
                    <div class="rows-per-page">
                      <p>Rows per page</p>
                      <tds-dropdown
                        modeVariant="secondary"
                        id="rows-dropdown"
                        class="page-dropdown"
                        size="xs"
                        defaultValue={`${this.rowsPerPageValues[0]}`}
                        onTdsChange={(event) => this.rowsPerPageChange(event)}
                      >
                        {this.rowsPerPageValues.map((value) => {
                          return (
                            <tds-dropdown-option value={`${value}`}>{value}</tds-dropdown-option>
                          );
                        })}
                      </tds-dropdown>
                    </div>
                  )}
                  <input
                    ref={(element) => (this.inputElement = element)}
                    class="tds-table__page-selector-input"
                    type="number"
                    min="1"
                    max={this.pages}
                    value={this.paginationValue}
                    pattern="[0-9]+"
                    dir="ltr"
                    onChange={(event) => this.paginationInputChange(event)}
                    onAnimationEnd={removeShakeAnimation}
                  />
                  <p class="tds-table__footer-text">
                    of <span>{this.pages}</span> pages
                  </p>
                  <button
                    type="button"
                    class="tds-table__footer-btn"
                    disabled={this.paginationValue <= 1}
                    onClick={() => this.firstPage()}
                  >
                    <tds-icon name="skip_backwards" size="20px"></tds-icon>
                  </button>
                  <button
                    type="button"
                    class="tds-table__footer-btn"
                    disabled={this.paginationValue <= 1}
                    onClick={() => this.previousPage()}
                  >
                    <tds-icon name="chevron_left" size="20px"></tds-icon>
                  </button>
                  <button
                    type="button"
                    class="tds-table__footer-btn"
                    disabled={this.paginationValue >= this.pages}
                    onClick={() => this.nextPage()}
                  >
                    <tds-icon name="chevron_right" size="20px"></tds-icon>
                  </button>
                  <button
                    type="button"
                    class="tds-table__footer-btn"
                    disabled={this.paginationValue >= this.pages}
                    onClick={() => this.lastPage()}
                  >
                    <tds-icon name="skip_forward" size="20px"></tds-icon>
                  </button>
                </div>
              </div>
            )}
          </td>
        </tr>
      </Host>
    );
  }
}
