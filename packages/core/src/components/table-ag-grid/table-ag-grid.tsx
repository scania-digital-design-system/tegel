import { Component, h, Element } from '@stencil/core';

import {
  AllCommunityModule,
  GridApi,
  GridOptions,
  ModuleRegistry,
  createGrid,
  themeQuartz,
} from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);
// Row Data Interface
interface IRow {
  truckType: string;
  driverName: string;
  country: string;
  mileage: string;
}

// to use myTheme in an application, pass it to the theme grid option
const myTheme = themeQuartz.withParams({
  backgroundColor: '#F9FAFB',
  browserColorScheme: 'light',
  cellTextColor: '#0D0F13',
  fontFamily: 'inherit',
  headerBackgroundColor: '#DBDFE6',
  headerFontSize: 14,
  headerFontWeight: 700,
  headerTextColor: '#0D0F13',
  oddRowBackgroundColor: '#F9FAFB',
  rowVerticalPaddingScale: 1.25,
});

@Component({
  tag: 'tds-table-ag-grid',
  styleUrl: 'table-ag-grid.scss',
  shadow: true,
})
export class TdsTableAgGrid {
  @Element() host: HTMLElement;

  private gridApi: GridApi;

  // Grid Options: Contains all of the grid configurations
  gridOptions: GridOptions<IRow> = {
    // Data to be displayed
    rowData: [
      {
        truckType: 'Test value 1',
        driverName: 'Test value 2',
        country: 'Test value 3',
        mileage: 'Test value 4',
      },
      {
        truckType: 'Test value 5',
        driverName: 'Test value 6',
        country: 'Test value 7',
        mileage: 'Test value 8',
      },
      {
        truckType: 'Test value 1',
        driverName: 'Test value 2',
        country: 'Test value 3',
        mileage: 'Test value 4',
      },
      {
        truckType: 'Test value 5',
        driverName: 'Test value 6',
        country: 'Test value 7',
        mileage: 'Test value 8',
      },
      {
        truckType: 'Test value 1',
        driverName: 'Test value 2',
        country: 'Test value 3',
        mileage: 'Test value 4',
      },
      {
        truckType: 'Test value 5',
        driverName: 'Test value 6',
        country: 'Test value 7',
        mileage: 'Test value 8',
      },
    ],
    // Columns to be displayed (Should match rowData properties)
    columnDefs: [
      { field: 'truckType' },
      { field: 'driverName' },
      { field: 'country' },
      { field: 'mileage' },
    ],
    defaultColDef: {
      flex: 1,
    },
    theme: myTheme,
  };

  componentDidLoad() {
    const gridElement = this.host.shadowRoot.querySelector<HTMLElement>('#myGrid');
    if (gridElement) {
      this.gridApi = createGrid(gridElement, this.gridOptions);
    } else {
      console.error('Could not find #myGrid');
    }

    console.log(this.gridApi);
  }

  render() {
    console.log('HEJ 3: ', this.host.querySelector('#myGrid'));

    return (
      <div>
        <div id="myGrid" style={{ width: '90vw', height: '500px' }}></div>
      </div>
    );
  }
}
