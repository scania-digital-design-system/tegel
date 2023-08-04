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
  Watch,
} from '@stencil/core';

import { InternalTdsTablePropChange } from '../table/table';

const relevantTableProps: InternalTdsTablePropChange['changed'] = [
  'enableMultiselect',
  'enableExpandableRows',
];

/**
 * @slot <default> - <b>Unnamed slot.</b> For table rows.
 * @slot no-result - Slot for no result message when using filtering.
 */
@Component({
  tag: 'tds-table-body',
  styleUrl: 'table-body.scss',
  shadow: false,
})
export class TdsTableBody {
  /** Prop to pass JSON string which enables automatic rendering of Table rows and cells  */
  @Prop({ mutable: true }) bodyData: any;

  /** Prop for no result message when using filtering */
  @Prop() noResultMessage: string;

  @Element() host: HTMLElement;

  @State() rowsPerPage: number = 1;

  @State() enableMultiselect: boolean = false;

  @State() enablePaginationTableBody: boolean = false;

  @State() enableExpandableRows: boolean = true;

  @State() innerBodyData = [];

  @State() bodyDataManipulated = [];

  @State() bodyDataOriginal = [];

  @State() multiselectArray = [];

  @State() multiselectArrayJSON: string;

  @State() mainCheckboxStatus: boolean = false;

  @State() columnsNumber: number = 0;

  @State() disableAllSorting: boolean = false;

  @State() numberOfPages: number = 0;

  @State() paginationValue: number = 1;

  @State() tempPaginationDisable: boolean = false;

  @State() showNoResultsMessage: boolean = false;

  @State() tableId: string = '';

  tableEl: HTMLTdsTableElement;

  @Watch('bodyData')
  arrayDataWatcher(newValue: string) {
    if (typeof newValue === 'string') {
      this.innerBodyData = JSON.parse(newValue);
    } else {
      this.innerBodyData = newValue;
    }
    this.bodyDataManipulated = [...this.innerBodyData];
    this.bodyDataOriginal = [...this.innerBodyData];
  }

  /** @internal Event that sends unique Table identifier and enable/disable status for sorting functionality */
  @Event({
    eventName: 'internalTdsSortingChange',
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  internalTdsSortingChange: EventEmitter<any>;

  /** @internal Sends unique Table identifier and mainCheckbox status to all rows when multiselect feature is enabled */
  @Event({
    eventName: 'internalTdsCheckboxChange',
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  internalTdsCheckboxChange: EventEmitter<any>;

  /** @internal Sends unique Table identifier and status
   * if mainCheckbox should change its state based on selection status of single rows
   * when multiselect feature is used */
  @Event({
    eventName: 'internalTdsMainCheckboxChange',
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  internalTdsMainCheckboxChange: EventEmitter<any>;

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

  static compareValues(key, order = 'asc') {
    return function innerSort(a, b) {
      // eslint-disable-next-line no-prototype-builtins
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }

      const varA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key];
      const varB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return order === 'desc' ? comparison * -1 : comparison;
    };
  }

  uncheckAll = () => {
    this.mainCheckboxStatus = false;
    this.internalTdsMainCheckboxChange.emit([this.tableId, this.mainCheckboxStatus]);
    this.internalTdsCheckboxChange.emit([this.tableId, this.mainCheckboxStatus]);
  };

  sortData(keyValue, sortingDirection) {
    if (this.enableMultiselect) {
      // Uncheck all checkboxes as the state of checkbox is lost on sorting. Do it only in case multiSelect is True.
      this.uncheckAll();
    }

    // use spread operator to make enable a sorting and modifying array, same as using .slice()
    this.bodyDataManipulated = [...this.bodyDataManipulated];
    this.bodyDataManipulated.sort(TdsTableBody.compareValues(keyValue, sortingDirection));
  }

  // Listen to sortColumnData from table-header-element - TODO
  @Listen('internalTdsSortChange', { target: 'body' })
  updateOptionsContent(event: CustomEvent<any>) {
    const { tableId, columnKey, sortingDirection } = event.detail;
    if (this.tableId === tableId) {
      this.sortData(columnKey, sortingDirection);
    }
  }

  selectedDataExporter = () => {
    const selectedRows = this.host.getElementsByClassName('tds-table__row--selected');

    this.multiselectArray = [];
    for (let j = 0; j < selectedRows.length; j++) {
      const rowCells = selectedRows[j].getElementsByTagName('tds-body-cell');
      const selectedObject = {};
      for (let i = 0; i < rowCells.length; i++) {
        const currentCellKey = rowCells[i].getAttribute('cell-key');
        const currentCellValue = rowCells[i].getAttribute('cell-value');
        selectedObject[currentCellKey] = currentCellValue;
      }
      this.multiselectArray.push(selectedObject);
    }
    this.multiselectArrayJSON = JSON.stringify(this.multiselectArray);
  };

  @Listen('internalTdsMainCheckboxChange', { target: 'body' }) // -
  headCheckboxListener(event: CustomEvent<any>) {
    if (this.tableId === event.detail[0]) {
      [, this.mainCheckboxStatus] = event.detail;
      this.selectedDataExporter();
    }
  }

  bodyCheckBoxClicked = () => {
    const numberOfRows = this.host.getElementsByClassName('tds-table__row').length;

    const numberOfRowsSelected = this.host.getElementsByClassName(
      'tds-table__row--selected',
    ).length;

    this.mainCheckboxStatus = numberOfRows === numberOfRowsSelected;

    this.internalTdsMainCheckboxChange.emit([this.tableId, this.mainCheckboxStatus]);

    this.selectedDataExporter();
  };

  // No need to read the value, event is here just to trigger another function
  @Listen('internalTdsRowChange', { target: 'body' })
  bodyCheckboxListener() {
    this.bodyCheckBoxClicked();
  }

  searchFunction(searchTerm) {
    // grab all rows in body
    const dataRowsFiltering = this.host.querySelectorAll('tds-table-body-row, tds-table-body-row-expandable', );

    if (searchTerm.length > 0) {
      if (this.enablePaginationTableBody) {
        this.tempPaginationDisable = true;
      }

      dataRowsFiltering.forEach((item) => {
        const cells = item.querySelectorAll('tds-body-cell');
        const cellValuesArray = [];

        // go through cells and save cell-values in an array
        cells.forEach((cellItem) => {
          const cellValue = cellItem.getAttribute('cell-value').toLowerCase();
          cellValuesArray.push(cellValue);
        });

        // iterate over an array of values and see if one matches search string
        const matchCounter = cellValuesArray.find((element) => element.includes(searchTerm));

        // if matches, show parent row, otherwise hide the row
        if (matchCounter) {
          item.classList.remove('tds-table__row--hidden');
        } else {
          item.classList.add('tds-table__row--hidden');
        }
      });

      this.disableAllSorting = true;
      this.internalTdsSortingChange.emit([this.tableId, this.disableAllSorting]);
      const dataRowsHidden = this.host.querySelectorAll('.tds-table__row--hidden');

      // If same, an info message will be shown
      this.showNoResultsMessage = dataRowsHidden.length === dataRowsFiltering.length;
    } else {
      if (this.enablePaginationTableBody) {
        this.tempPaginationDisable = false;
      }

      // If pagination is NOT enabled, we show all rows.
      if (!this.enablePaginationTableBody) {
        dataRowsFiltering.forEach((item) => {
          item.classList.remove('tds-table__row--hidden');
        });
      }

      this.showNoResultsMessage = false;
      this.disableAllSorting = false;
      this.internalTdsSortingChange.emit([this.tableId, this.disableAllSorting]);
    }
  }

  /** Listens to internalTdsFilter from tableToolbar component */
  @Listen('internalTdsFilter', { target: 'body' })
  tdsFilterListener(
    event: CustomEvent<{
      tableId: string;
      query: string;
    }>,
  ) {
    if (this.tableId === event.detail.tableId) {
      this.searchFunction(event.detail.query);
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

    if (this.bodyData) {
      this.arrayDataWatcher(this.bodyData);
    }
  }

  componentWillRender() {
    const headerColumnsNo =
      this.host.parentElement.querySelector('tds-table-header').children.length;

    // multiselect and expended features requires one extra column for controls...
    if (this.enableMultiselect || this.enableExpandableRows) {
      this.columnsNumber = headerColumnsNo + 1;
    } else {
      this.columnsNumber = headerColumnsNo;
    }
  }

  render() {
    return (
      <Host data-selected-rows={this.multiselectArrayJSON}>
        {this.bodyDataManipulated.map((row) => (
          <tds-table-body-row>
            {Object.keys(row).map((cellData) => (
              <tds-body-cell cell-key={cellData} cell-value={row[cellData]}></tds-body-cell>
            ))}
          </tds-table-body-row>
        ))}
        <tr hidden={!this.showNoResultsMessage}>
          <td class="tds-table__info-message" colSpan={this.columnsNumber}>
            <slot name="no-result" />
            {this.noResultMessage}
          </td>
        </tr>
        <slot></slot>
      </Host>
    );
  }
}
