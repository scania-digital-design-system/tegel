import formatHtmlPreview from '../../stories/formatHtmlPreview';
import tdsTable from './table/readme.md';
import tdsTableToolbar from './table-toolbar/readme.md';
import tdsHeader from './table-header/readme.md';
import tdsHeaderCell from './table-header-cell/readme.md';
import tdsTableBody from './table-body/readme.md';
import tdsBodyRow from './table-body-row/readme.md';
import tdsBodyRowExpandable from './table-body-row-expandable/readme.md';
import tdsBodyCell from './table-body-cell/readme.md';
import tdsTableFooter from './table-footer/readme.md';
import tdsTableBodyInputWrapper from './table-body-input-wrapper/readme.md';
import tdsTableHeaderInputWrapper from './table-header-input-wrapper/readme.md';
import { ComponentsFolder } from '../../utils/constants';

export default {
  title: `${ComponentsFolder}/Table`,
  parameters: {
    notes: {
      'tds-table': tdsTable,
      'tds-table-toolbar': tdsTableToolbar,
      'tds-header': tdsHeader,
      'tds-header-cell': tdsHeaderCell,
      'tds-header-input-wrapper': tdsTableHeaderInputWrapper,
      'tds-table-body': tdsTableBody,
      'tds-body-row': tdsBodyRow,
      'tds-body-row-expandable': tdsBodyRowExpandable,
      'tds-body-cell': tdsBodyCell,
      'tds-body-input-wrapper': tdsTableBodyInputWrapper,
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
    expanded: {
      name: 'Expanded',
      description: 'Expands row when set to true. This is set on row level.',
      control: {
        type: 'boolean',
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
    flexDisplay: {
      name: 'Flex display',
      description: 'Enable flex layout for the expanded row.',
      control: { type: 'boolean' },
      table: { defaultValue: { summary: false } },
    },
    flexDirection: {
      name: 'Flex direction',
      description: 'Direction of the flex layout.',
      control: { type: 'radio' },
      options: ['row', 'column'],
      table: { defaultValue: { summary: 'row' } },
      if: { arg: 'flexDisplay', eq: true },
    },
    justifyContent: {
      name: 'Justify content',
      description: 'Justify content of the flex layout.',
      control: { type: 'radio' },
      options: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around'],
      table: { defaultValue: { summary: 'flex-start' } },
      if: { arg: 'flexDisplay', eq: true },
    },
    alignItems: {
      name: 'Align items',
      description: 'Align items of the flex layout.',
      control: { type: 'radio' },
      options: ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'],
      table: { defaultValue: { summary: 'flex-start' } },
      if: { arg: 'flexDisplay', eq: true },
    },
  },
  args: {
    modeVariant: 'Inherit from parent',
    compactDesign: false,
    expanded: false,
    responsiveDesign: false,
    verticalDivider: false,
    noMinWidth: false,
    column1Width: '',
    column2Width: '',
    column3Width: '',
    column4Width: '',
    flexDisplay: false,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
};

const ExpandableRowTemplate = ({
  modeVariant,
  compactDesign,
  expanded,
  responsiveDesign,
  verticalDivider,
  noMinWidth,
  column1Width,
  column2Width,
  column3Width,
  column4Width,
  flexDisplay,
  flexDirection,
  justifyContent,
  alignItems,
}) =>
  formatHtmlPreview(`
  <tds-table
    expandable-rows
    vertical-dividers="${verticalDivider}"
    compact-design="${compactDesign}"
    responsive="${responsiveDesign}"
    ${noMinWidth ? 'no-min-width' : ''}
    ${modeVariant !== 'Inherit from parent' ? `mode-variant="${modeVariant.toLowerCase()}"` : ''}
    >
      <tds-table-header>
          <tds-header-cell cell-key='truck' cell-value='Truck type' ${
            column1Width ? `custom-width="${column1Width}"` : ''
          }></tds-header-cell>
          <tds-header-cell cell-key='driver' cell-value='Driver name' ${
            column2Width ? `custom-width="${column2Width}"` : ''
          }></tds-header-cell>
          <tds-header-cell cell-key='country' cell-value='Country' ${
            column3Width ? `custom-width="${column3Width}"` : ''
          }></tds-header-cell>
          <tds-header-cell cell-key='mileage' cell-value='Mileage' text-align='right' ${
            column4Width ? `custom-width="${column4Width}"` : ''
          }></tds-header-cell>
      </tds-table-header>
      <tds-table-body>
        <tds-table-body-row-expandable expanded=${expanded} row-id="1">
          <tds-body-cell cell-value="Test value 1" cell-key="truck"></tds-body-cell>
          <tds-body-cell cell-value="Test value 2" cell-key="driver"></tds-body-cell>
          <tds-body-cell cell-value="Test value 3" cell-key="country"></tds-body-cell>
          <tds-body-cell cell-value="Test value 4" cell-key="mileage"></tds-body-cell>
          <div slot="expand-row">Hello world 1</div>
        </tds-table-body-row-expandable>
         <tds-table-body-row-expandable row-id="2">
          <tds-body-cell cell-value="Test value 5" cell-key="truck"></tds-body-cell>
          <tds-body-cell cell-value="Test value 6" cell-key="driver"></tds-body-cell>
          <tds-body-cell cell-value="Test value 7" cell-key="country"></tds-body-cell>
          <tds-body-cell cell-value="Test value 8" cell-key="mileage"></tds-body-cell>
          <div slot="expand-row">Hello to you too</div>
        </tds-table-body-row-expandable>
        <tds-table-body-row-expandable>
          <tds-body-cell cell-value="Test value 9" cell-key="truck"></tds-body-cell>
          <tds-body-cell cell-value="Test value 10" cell-key="driver"></tds-body-cell>
          <tds-body-cell cell-value="Test value 11" cell-key="country"></tds-body-cell>
          <tds-body-cell cell-value="Test value 12" cell-key="mileage"></tds-body-cell>
          <div slot="expand-row"><tds-button type="primary" text="Call to action"></tds-button></div>
        </tds-table-body-row-expandable>
        <tds-table-body-row-expandable expanded="${expanded}" row-id="1"
          ${flexDisplay ? 'flex-display' : ''}
        >
          <tds-body-cell cell-value="Demo overflow 1" cell-key="truck"></tds-body-cell>
          <tds-body-cell cell-value="Demo overflow 2" cell-key="driver"></tds-body-cell>
          <tds-body-cell cell-value="Demo overflow 3" cell-key="country"></tds-body-cell>
          <tds-body-cell cell-value="Demo overflow 4" cell-key="mileage"></tds-body-cell>
          <div slot="expand-row" style="${
            flexDisplay ? `display: flex; flex-direction: ${flexDirection};` : ''
          }
          justify-content: ${justifyContent}; align-items: ${alignItems};
          align-content: ${alignItems}; flex-wrap: wrap; width: 100%;
          ">
            <!-- Demo block: Overflow solution for Expanded Rows (Not Recommended). -->
              <div style="background-color: red; width: 1300px; height: 100px;">Not Recommended</div>
              <div style="background-color: red; width: 300px; height: 100px;">Not Recommended</div>
              <div style="background-color: red; width: 300px; height: 100px;">Not Recommended</div>
            <!-- end of demo block -->
          </div>
        </tds-table-body-row-expandable>
      </tds-table-body>
  </tds-table>

  <!-- Script for demo purposes. -->
  <script>

  tableRowElementAll = document.querySelectorAll("tds-table-body-row-expandable");
 
  for (let i = 0; i < tableRowElementAll.length; i++) {
    tableRowElementAll[i].addEventListener("tdsChange", (event) => {
      console.log("Row with id: ", event.detail.rowId, " is ", event.detail.isExpanded);
    });
  }

</script>
  `);

export const ExpandableRows = ExpandableRowTemplate.bind({});
