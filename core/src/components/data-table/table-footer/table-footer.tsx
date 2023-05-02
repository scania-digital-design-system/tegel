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
import { InternalSddsTablePropChange } from '../table/table';

const relevantTableProps: InternalSddsTablePropChange['changed'] = ['compactDesign'];

function removeShakeAnimation(e: AnimationEvent & { target: HTMLElement }) {
  e.target.classList.remove('sdds-table__page-selector-input--shake');
}

@Component({
  tag: 'sdds-table-footer',
  styleUrl: 'table-footer.scss',
  shadow: true,
})
export class TableFooter {
  /** Enable pagination and show pagination controls  */
  @Prop({ reflect: true }) pagination: boolean = false;

  /** Sets how many rows to display when pagination is enabled. */
  @Prop({ reflect: true }) rowsPerPage: number = 5;

  /** Sets the pagination number. */
  @Prop({ reflect: true }) paginationValue: number = 1;

  /** Prop for client to set max number of pages. */
  @Prop({ reflect: true }) maxPages: number;

  /** In case that automatic count of columns does not work, user can manually set this one. Take in mind that expandable control is column too */
  @Prop() clientSetColumnsNumber: number = null;

  /** State that memorize number of columns to display colSpan correctly - set from parent level */
  @State() columnsNumber: number = 0;

  /** Total number of pages, number of the rows divided with number of rows per page */
  @State() numberOfPages: number = 0;

  /** Temporarily disable pagination - due to search - set from parent level */
  @State() tempPaginationDisable: boolean = false;

  /* Sets the footer to use compact design. */
  @State() compactDesign: boolean = false;

  @State() tableId: string = '';

  @Element() host: HTMLElement;

  /* A reference for the input element used for pagination in the footer. */
  private inputElement: HTMLInputElement;

  /* The footers parent table. */
  private tableEl: HTMLSddsTableElement;

  /** Event to send current page value to sdds-table-body component, can also be listened to in order to implement custom pagination logic. */
  @Event({
    eventName: 'sddsPageChange',
    composed: true,
    cancelable: true,
    bubbles: true,
  })
  sddsPageChange: EventEmitter<{
    tableId: string;
    paginationValue: number;
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

    const numberOfRows = this.host.parentElement.querySelector('sdds-table-body').childElementCount;

    const numberOfColumns =
      this.host.parentElement.querySelector('sdds-table-header').childElementCount;

    this.numberOfPages = Math.ceil(numberOfRows / this.rowsPerPage);

    if (this.clientSetColumnsNumber !== null) {
      this.columnsNumber = this.clientSetColumnsNumber;
    } else {
      this.columnsNumber = numberOfColumns;
    }
  }

  private previousPage = () => {
    /* Emits pagination event. */
    const pageChangeEvent = this.sddsPageChange.emit({
      tableId: this.tableId,
      paginationValue: Number(this.inputElement.value) - 1,
    });
    /** If pages and greater or equal to 2, decrease pagination value.
     * This is to not get under 1 in pagination value.  */
    if (this.paginationValue >= 2) {
      this.paginationValue--;
    }
    /* If the change event is not prevented -> do pagination. */
    if (!pageChangeEvent.defaultPrevented) {
      /* Decrease the pagination until the first page. */
      this.runPagination();
    }
  };

  private nextPage = () => {
    /* Emits pagination event. */
    const pageChangeEvent = this.sddsPageChange.emit({
      tableId: this.tableId,
      paginationValue: Number(this.inputElement.value) + 1,
    });

    /** If pages and greater or equal to the amount of pages, increase pagination value.
     * This is to not get above the amount of pages in pagination value.  */
    if (this.paginationValue <= this.numberOfPages) {
      this.paginationValue++;
    }
    /* If the change event is not prevented -> do pagination. */
    if (!pageChangeEvent.defaultPrevented) {
      /* Increase the pagination until the last page. */
      this.runPagination();
    }
  };

  private paginationInputChange(event) {
    const insertedValue = event.target.value;

    if (insertedValue > this.numberOfPages || insertedValue < 1) {
      event.target.classList.add('sdds-table__page-selector-input--shake');
      this.paginationValue = event.target.max;
    } else {
      this.paginationValue = event.target.value;
    }
    const paginationEvent = this.sddsPageChange.emit({
      tableId: this.tableId,
      paginationValue: Number(this.inputElement.value) - 1,
    });
    if (!paginationEvent.defaultPrevented) {
      this.runPagination();
    }
  }

  @Listen('internalSddsPagination', { target: 'body' })
  sddsPaginationListener(event: CustomEvent<any>) {
    if (this.tableId === event.detail) {
      this.runPagination();
    }
  }

  runPagination = () => {
    // grab all rows in body
    const dataRowsPagination = this.host.parentNode
      .querySelector('sdds-table-body')
      .querySelectorAll('.sdds-table__row');

    dataRowsPagination.forEach((item, i) => {
      // for making logic easier 1st result, 2nd result...
      const index = i + 1;

      if (this.tempPaginationDisable) {
        this.paginationValue = 1;
      } else {
        const lastResult = this.rowsPerPage * this.paginationValue;
        const firstResult = lastResult - this.rowsPerPage;
        if (index > firstResult && index <= lastResult) {
          item.classList.remove('sdds-table__row--hidden');
        } else {
          item.classList.add('sdds-table__row--hidden');
        }
      }
    });
  };

  render() {
    return (
      <Host class={this.compactDesign ? 'sdds-table--compact' : ''}>
        <tr class="sdds-table__footer-row">
          <td class="sdds-table__footer-cell" colSpan={this.columnsNumber}>
            {this.pagination && (
              <div class="sdds-table__pagination">
                <div class="sdds-table__row-selector"></div>
                <div class="sdds-table__page-selector">
                  <input
                    ref={(element) => (this.inputElement = element)}
                    class="sdds-table__page-selector-input"
                    type="number"
                    min="1"
                    max={this.maxPages ?? this.numberOfPages}
                    value={this.paginationValue}
                    pattern="[0-9]+"
                    dir="rtl"
                    onChange={(event) => this.paginationInputChange(event)}
                    onFocusout={(event) => this.paginationInputChange(event)}
                    onAnimationEnd={removeShakeAnimation}
                    disabled={this.tempPaginationDisable}
                  />
                  <p class="sdds-table__footer-text">
                    of <span>{this.tempPaginationDisable ? 1 : this.numberOfPages}</span> pages
                  </p>
                  <button
                    type="button"
                    class="sdds-table__footer-btn"
                    disabled={this.paginationValue <= 1 || this.tempPaginationDisable}
                    onClick={() => this.previousPage()}
                  >
                    <sdds-icon name="chevron_left" size="20px"></sdds-icon>
                  </button>
                  <button
                    type="button"
                    class="sdds-table__footer-btn"
                    disabled={
                      this.paginationValue >= this.numberOfPages || this.tempPaginationDisable
                    }
                    onClick={() => this.nextPage()}
                  >
                    <sdds-icon name="chevron_right" size="20px"></sdds-icon>
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
