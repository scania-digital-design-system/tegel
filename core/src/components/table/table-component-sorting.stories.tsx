import { formatHtmlPreview } from '../../utils/utils';
import tdsTable from './table/readme.md';
import tdsTableToolbar from './table-toolbar/readme.md';
import tdsHeader from './table-header/readme.md';
import tdsHeaderCell from './table-header-cell/readme.md';
import tdsTableBody from './table-body/readme.md';
import tdsBodyRow from './table-body-row/readme.md';
import tdsBodyRowExpandable from './table-body-row-expandable/readme.md';
import tdsBodyCell from './table-body-cell/readme.md';
import tdsTableFooter from './table-footer/readme.md';
import { ComponentsFolder } from '../../utils/constants';

export default {
  title: `${ComponentsFolder}/Table`,
  parameters: {
    notes: {
      'tds-table': tdsTable,
      'tds-table-toolbar': tdsTableToolbar,
      'tds-header': tdsHeader,
      'tds-header-cell': tdsHeaderCell,
      'tds-table-body': tdsTableBody,
      'tds-body-row': tdsBodyRow,
      'tds-body-row-expandable': tdsBodyRowExpandable,
      'tds-body-cell': tdsBodyCell,
      'tds-table-footer': tdsTableFooter,
    },
  },
  argTypes: {
    modeVariant: {
      name: 'Mode variant',
      description:
        'Mode variant adjusts component colors to have better visibility depending on global mode and background.',
      control: {
        type: 'radio',
      },
      options: ['Inherit from parent', 'Primary', 'Secondary'],
      table: {
        defaultValue: { summary: 'Inherit from parent' },
      },
    },
    compactDesign: {
      name: 'Compact Design',
      description: 'Enables compact design of the Table, rows with less height.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
    responsiveDesign: {
      name: 'Responsive design',
      description:
        'Enables Table to take 100% of available width. For column values less than 192px, "No minimum width" has to be enabled too.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
    column1sortable: {
      name: 'Column 1 is sortable',
      description: 'Enables column 1 to be sorted alphabetically.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
    column2sortable: {
      name: 'Column 2 is sortable',
      description: 'Enables column 2 to be sorted alphabetically.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
    column3sortable: {
      name: 'Column 3 is sortable',
      description: 'Enables column 3 to be sorted alphabetically.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
    column4sortable: {
      name: 'Column 4 is sortable',
      description: 'Enables column 4 to be sorted alphabetically.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
    verticalDivider: {
      name: 'Vertical dividers',
      description: 'Enables vertical dividers between Table columns.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
    noMinWidth: {
      name: 'No minimum width',
      description:
        'Resets min-width rule and enables setting column width value to less than 192px which is the default. When enabled, controls for column width will show here.',
      control: {
        type: 'boolean',
      },
    },
    column1Width: {
      name: 'Column 1 width',
      description:
        'Value of width for column 1. In order to work correctly "No minimum width" has to be enabled too. When editing please provide a unit next to the value, eg. 200px.',
      control: {
        type: 'text',
      },
      if: { arg: 'noMinWidth', eq: true },
    },
    column2Width: {
      name: 'Column 2 width',
      description:
        'Value of width for column 2. In order to work correctly "No minimum width" has to be enabled too. When editing please provide a unit next to the value, eg. 200px.',
      control: {
        type: 'text',
      },
      if: { arg: 'noMinWidth', eq: true },
    },
    column3Width: {
      name: 'Column 3 width',
      description:
        'Value of width for column 3. In order to work correctly "No minimum width" has to be enabled too. When editing please provide a unit next to the value, eg. 200px.',
      control: {
        type: 'text',
      },
      if: { arg: 'noMinWidth', eq: true },
    },
    column4Width: {
      name: 'Column 4 width',
      description:
        'Value of width for column 4. In order to work correctly "No minimum width" has to be enabled too. When editing please provide a unit next to the value, eg. 200px.',
      control: {
        type: 'text',
      },
      if: { arg: 'noMinWidth', eq: true },
    },
  },
  args: {
    modeVariant: 'Inherit from parent',
    compactDesign: false,
    responsiveDesign: false,
    column1sortable: true,
    column2sortable: true,
    column3sortable: true,
    column4sortable: true,
    verticalDivider: false,
    noMinWidth: false,
    column1Width: '',
    column2Width: '',
    column3Width: '',
    column4Width: '',
  },
};

const SortingTemplate = ({
  modeVariant,
  compactDesign,
  responsiveDesign,
  column1sortable,
  column2sortable,
  column3sortable,
  column4sortable,
  verticalDivider,
  noMinWidth,
  column1Width,
  column2Width,
  column3Width,
  column4Width,
}) =>
  formatHtmlPreview(`
    <tds-table
      table-id='tds-table-sorting-example'
      vertical-dividers="${verticalDivider}"
      compact-design="${compactDesign}"
      responsive="${responsiveDesign}"
      ${noMinWidth ? 'no-min-width' : ''}
      ${modeVariant !== 'Inherit from parent' ? `mode-variant="${modeVariant.toLowerCase()}"` : ''}
    >
      <tds-table-toolbar table-title="Sorting"></tds-table-toolbar>
          <tds-table-header>
              <tds-header-cell column-key='truck' column-title='Truck type' sortable="${column1sortable}" ${
    column1Width ? `custom-width="${column1Width}"` : ''
  }></tds-header-cell>
              <tds-header-cell column-key='driver' column-title='Driver name' sortable="${column2sortable}" ${
    column2Width ? `custom-width="${column2Width}"` : ''
  }></tds-header-cell>
              <tds-header-cell column-key='country' column-title='Country' sortable="${column3sortable}" ${
    column3Width ? `custom-width="${column3Width}"` : ''
  }></tds-header-cell>
              <tds-header-cell column-key='mileage' column-title='Mileage' sortable="${column4sortable}" text-align='right' ${
    column4Width ? `custom-width="${column4Width}"` : ''
  }></tds-header-cell>
          </tds-table-header>
          <tds-table-body>
          </tds-table-body>
  </tds-table>
  
  
  <script>    
    /* DEMO CODE ONLY WORKS IN THE CANVAS TAB. */
    
    // Get the table body
    tableBody = document.querySelector('tds-table-body');
    
    // Get ID of current table. Recommended in case of multiple tables in the same page
    currentTableId = tableBody.closest('tds-table').getAttribute('table-id');
    
    // Data example
    testData = [
      {
        "truck": "L-series",
        "driver": "Sonya Bruce",
        "country": "Brazil",
        "mileage": 123987
      },
      {
        "truck": "P-series",
        "driver": "Guerra Bowman",
        "country": "Sweden",
        "mileage": 2000852
      },
      {
        "truck": "G-series",
        "driver": "Ferrell Wallace",
        "country": "Germany",
        "mileage": 564
      },
      {
        "truck": "R-series",
        "driver": "Cox Burris",
        "country": "Spain",
        "mileage": 1789357
      },
      {
        "truck": "S-series",
        "driver": "Montgomery Cervantes",
        "country": "Croatia",
        "mileage": 65
      },
      {
        "truck": "L-series",
        "driver": "Sheryl Nielsen",
        "country": "Greece",
        "mileage": 365784
      },
      {
        "truck": "G-series",
        "driver": "Benton Gomez",
        "country": "France",
        "mileage": 80957
      }
    ]
    
    // Connect example fo data to bodyData prop
    tableBody.bodyData = testData;
    
    // Example of sorting function
    function sortData(data, key, sortOrder = 'asc') {
      if (!Array.isArray(data)) {
        console.error('Input data is not an array.');
        return [];
      }
    
      if (!data.length) {
        console.warn('Input data is empty.');
        return [];
      }
    
      if (typeof key !== 'string') {
        console.error('Key should be a valid string.');
        return data.slice(); // Return a copy of the original array
      }
    
      sortedData = data.slice(); // Create a copy of the original array
    
      sortedData.sort((a, b) => {
        const valueA = a[key];
        const valueB = b[key];
    
        if (typeof valueA === 'undefined' || typeof valueB === 'undefined') {
          console.warn(\`Key not found in some items. Sorting may be inconsistent.\`);
          return 0;
        }
    
        const comparison = valueA.toString().localeCompare(valueB.toString(), undefined, { numeric: true });
    
        return sortOrder === 'desc' ? -comparison : comparison;
      });
    
      return sortedData;
    }
    
    // Triggering sorting on custom event
    document.addEventListener('tdsSortChange', (event) => {
      emmitedID = event.detail.tableId;
      emmitedKey = event.detail.columnKey;
      emmitedDirection = event.detail.sortingDirection;      
      
      // Recommend check of table ID in case of multiple table components on the same page
      if (currentTableId === emmitedID) {
        tableBody.bodyData = sortData(testData, emmitedKey, emmitedDirection);      
      } 
    })
  </script>`);

export const Sorting = SortingTemplate.bind({});
