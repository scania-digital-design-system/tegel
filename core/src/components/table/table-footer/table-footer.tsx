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

const relevantTableProps: InternalTdsTablePropChange['changed'] = ['compactDesign'];

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

  /** Sets the number of pages. */
  @Prop({ reflect: true }) pages: number = null;

  /** @deprecated Used to set rows per page, this also enabled automatic pagination of the table. */
  @Prop({ reflect: true }) rowsPerPage: number;

  /** <b>Client override</b> Used to set the number of columns, use as fallback if the automatic count of columns fails. */
  @Prop() cols: number = null;

  /** State that memorize number of columns to display colSpan correctly - set from parent level */
  @State() columnsNumber: number = 0;

  /** Total number of pages, number of the rows divided with number of rows per page */
  @State() numberOfPages: number = 0;

  /* Sets the footer to use compact design. */
  @State() compactDesign: boolean = false;

  @State() lastCorrectValue: number;

  @State() tableId: string = '';

  @Element() host: HTMLElement;

  /* A reference for the input element used for pagination in the footer. */
  private inputElement: HTMLInputElement;

  /* The footer parent Table. */
  private tableEl: HTMLTdsTableElement;

  /** Event to send current page value to tds-table-body component, can also be listened to in order to implement custom pagination logic. */
  @Event({
    eventName: 'tdsPageChange',
    composed: true,
    cancelable: true,
    bubbles: true,
  })
  tdsPageChange: EventEmitter<{
    tableId: string;
    paginationValue: number;
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

    if (this.rowsPerPage) {
      /* Number of children which are <tds-table-body-row> */
      const numberOfRows = Array.from(
        this.host.parentElement.querySelector('tds-table-body').children,
      ).filter((element) => element.tagName === 'TDS-TABLE-BODY-ROW').length;
      this.numberOfPages = Math.ceil(numberOfRows / this.rowsPerPage);
    }
    /** Get the number of columns. */
    const numberOfColumns =
      this.host.parentElement.querySelector('tds-table-header').childElementCount;
    if (this.cols) {
      this.columnsNumber = this.cols;
    } else {
      this.columnsNumber = numberOfColumns;
    }
  }

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

    /* Emits pagination event. */
    this.tdsPageChange.emit({
      tableId: this.tableId,
      paginationValue: Number(this.paginationValue),
    });

    this.storeLastCorrectValue(this.paginationValue);

    /* If the change event is not prevented -> do pagination. */
    if (!this.pages) {
      /* Decrease the pagination until the first page. */
      this.runPagination();
    }
  };

  private nextPage = () => {
    /** If pages and greater or equal to the number of pages, increase pagination value.
     * This is to not get above the number of pages in pagination value.  */
    if (this.paginationValue <= (this.pages ?? this.numberOfPages)) {
      this.paginationValue++;
    }

    this.tdsPageChange.emit({
      tableId: this.tableId,
      paginationValue: Number(this.paginationValue),
    });

    this.storeLastCorrectValue(this.paginationValue);

    /* If the change event is not prevented -> do pagination. */
    if (!this.pages) {
      /* Increase the pagination until the last page. */
      this.runPagination();
    }
  };

  private paginationInputChange(event) {
    /* TODO: Inform colleagues, seems like the event.target.value is always considered a string */
    const insertedValue = Number(event.target.value);

    if (insertedValue > event.target.max || insertedValue < event.target.min) {
      event.target.classList.add('tds-table__page-selector-input--shake');
      this.inputElement.value = String(this.lastCorrectValue);
      this.paginationValue = Number(this.inputElement.value);
    } else {
      this.paginationValue = insertedValue;
    }
    const paginationEvent = this.tdsPageChange.emit({
      tableId: this.tableId,
      paginationValue: Number(this.paginationValue),
    });

    this.storeLastCorrectValue(this.paginationValue);

    if (!paginationEvent.defaultPrevented || !this.pages) {
      this.runPagination();
    }
  }

  @Listen('internalTdsPagination', { target: 'body' })
  tdsPaginationListener(event: CustomEvent<any>) {
    if (this.tableId === event.detail) {
      this.runPagination();
    }
  }

  runPagination = () => {
    /** Check the rows per page is used - if so, we need to do all the pagination. */
    if (this.rowsPerPage) {
      // grab all rows in body
      const dataRowsPagination = this.host.parentNode
        .querySelector('tds-table-body')
        .querySelectorAll('.tds-table__row');

      dataRowsPagination.forEach((item, i) => {
        // for making logic easier 1st result, 2nd result...
        const index = i + 1;

        const lastResult = this.rowsPerPage * this.paginationValue;
        const firstResult = lastResult - this.rowsPerPage;
        if (index > firstResult && index <= lastResult) {
          item.classList.remove('tds-table__row--hidden');
        } else {
          item.classList.add('tds-table__row--hidden');
        }
      });
    }
  };

  render() {
    return (
      <Host class={this.compactDesign ? 'tds-table--compact' : ''}>
        <tr class="tds-table__footer-row">
          <td class="tds-table__footer-cell" colSpan={this.columnsNumber}>
            {this.pagination && (
              <div class="tds-table__pagination">
                <div class="tds-table__row-selector"></div>
                <div class="tds-table__page-selector">
                  <input
                    ref={(element) => (this.inputElement = element)}
                    class="tds-table__page-selector-input"
                    type="number"
                    min="1"
                    max={this.pages ?? this.numberOfPages}
                    value={this.paginationValue}
                    pattern="[0-9]+"
                    dir="ltr"
                    onChange={(event) => this.paginationInputChange(event)}
                    onAnimationEnd={removeShakeAnimation}
                  />
                  <p class="tds-table__footer-text">
                    of <span>{this.pages ?? this.numberOfPages}</span> pages
                  </p>
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
                    disabled={this.paginationValue >= (this.pages ?? this.numberOfPages)}
                    onClick={() => this.nextPage()}
                  >
                    <tds-icon name="chevron_right" size="20px"></tds-icon>
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
