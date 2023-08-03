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
      name: 'Compact design',
      description: 'Enables compact design of the Table, rows with less height.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
    responsiveDesign: {
      name: 'Responsive Table',
      description:
        'Enables Table to take 100% of available width. For column values less than 192px, "No minimum width" has to be enabled too.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
    useDataProp: {
      name: 'Use data prop',
      description: 'Loads Table data from property.',
      control: {
        type: 'boolean',
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
    responsiveDesign: true,
    useDataProp: true,
    verticalDivider: false,
    noMinWidth: false,
    column1Width: '',
    column2Width: '',
    column3Width: '',
    column4Width: '',
  },
};

const FilteringTemplate = ({
  modeVariant,
  compactDesign,
  responsiveDesign,
  verticalDivider,
  noMinWidth,
  column1Width,
  column2Width,
  column3Width,
  column4Width,
}) =>
  formatHtmlPreview(`
   <tds-table
      vertical-dividers="${verticalDivider}"
      compact-design="${compactDesign}"
      ${responsiveDesign ? 'responsive' : ''}
      ${noMinWidth ? 'no-min-width' : ''}
      ${modeVariant !== 'Inherit from parent' ? `mode-variant="${modeVariant.toLowerCase()}"` : ''}
  >
          <tds-table-toolbar table-title="Filter" filter></tds-table-toolbar>
          <tds-table-header>
              <tds-header-cell column-key='truck' column-title='Truck type' ${
                column1Width ? `custom-width="${column1Width}"` : ''
              }></tds-header-cell>
              <tds-header-cell column-key='driver' column-title='Driver name' ${
                column2Width ? `custom-width="${column2Width}"` : ''
              }></tds-header-cell>
              <tds-header-cell column-key='country' column-title='Country' ${
                column3Width ? `custom-width="${column3Width}"` : ''
              }></tds-header-cell>
              <tds-header-cell column-key='mileage' column-title='Mileage' text-align='right' ${
                column4Width ? `custom-width="${column4Width}"` : ''
              }></tds-header-cell>
          </tds-table-header>
          <tds-table-body>
        </tds-table-body>
          <tds-table-footer>              
          </tds-table-footer>
  </tds-table>
  <!-- Note: Code below is just for demo purposes -->
  <div class="tds-u-mt1" style="width: 500px; background-color: lightblue; padding: 16px;">
  <p class="tds-u-mt0">Note: This box works only in "Canvas" tab.</p>
    <h5 class="tds-u-mt0 tds-u-mb0">Event test box</h5>
    <h6 class="tds-u-mt1 tds-u-mb0">Event name:</h6>
    <textarea id="event-name-textarea" rows="1" cols="50" readonly></textarea>
    <h6 class="tds-u-mt0 tds-u-mb0">Events value (aka detail)</h6>
    <br>
    <textarea id="event-value-textarea" rows="4" cols="50" readonly></textarea>
  </div>
  
  <script>  
  // Note: Script here is only for demo purposes
  
  tableBody = document.querySelector('tds-table-body');
  
  const demoData =  [
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
    tableBody.bodyData = demoData;
  
    function filterDataBySearchTerm(searchTerm, data) {
      // Convert the search term to string and lowercase outside the loops   
      const lowerCaseSearchTerm = String(searchTerm).toLowerCase();
      
      const filteredData = [];
      data.forEach(item => {
        const lowerCaseItem = {};
    
        // Iterate over each property of the item and convert to lowercase
        for (const key in item) {
          if (item.hasOwnProperty(key)) {
            lowerCaseItem[key] = item[key].toString().toLowerCase();
          }
        }
    
        // Check if any property of the item matches the search term
        if (
          Object.values(lowerCaseItem).some(value => value.includes(lowerCaseSearchTerm))
        ) {
          filteredData.push(item);
        }
      });
    
      return filteredData;
    }  
  
  window.addEventListener('tdsFilterChange', e => {
    document.getElementById('event-name-textarea').value = 'tdsFilterChange';
    document.getElementById('event-value-textarea').value = JSON.stringify(e.detail);
    let filteredDemoData = filterDataBySearchTerm(e.detail.query, demoData);
    tableBody = document.querySelector('tds-table-body');
    tableBody.bodyData = filteredDemoData;
  });
</script>`);

export const Filtering = FilteringTemplate.bind({});
