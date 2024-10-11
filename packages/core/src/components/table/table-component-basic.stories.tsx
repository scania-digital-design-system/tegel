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
import formatHtmlPreview from '../../stories/formatHtmlPreview';

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
    headerTextAlignment: {
      name: 'Text alignment in headers',
      description: 'Content alignment inside headers',
      control: {
        type: 'radio',
      },
      options: ['left', 'start', 'right', 'end', 'center'],
      table: {
        defaultValue: { summary: 'left' },
      },
    },
    cellTextAlignment: {
      name: 'Text alignment in cells',
      description: 'Content alignment inside body cells',
      control: {
        type: 'radio',
      },
      options: ['left', 'start', 'right', 'end', 'center'],
      table: {
        defaultValue: { summary: 'left' },
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
    disablePadding: {
      name: 'Disable cell padding',
      description:
        'By default each cell comes with padding. Disabling padding rule can be useful when a users want to insert another HTML element in cell, eg. input.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
    disableHeaderPadding: {
      name: 'Disable header cell padding',
      description:
        'By default each header cell comes with padding. Disabling padding rule can be useful when a users want to insert another HTML element in a header cell, eg. input.',
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
      table: {
        defaultValue: { summary: false },
      },
    },
    horizontalScrollWidth: {
      name: 'Horizontal scrolling table width',
      description: 'Used to set the boundary with of horizontal scrolling',
      control: {
        type: 'text',
      },
      table: {
        defaultValue: { summary: '300px' },
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
    clickable: {
      name: 'Clickable rows',
      description: 'Enables rows to be clickable and emit `tdsClick` events.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
  },
  args: {
    modeVariant: 'Inherit from parent',
    headerTextAlignment: 'left',
    cellTextAlignment: 'left',
    compactDesign: false,
    responsiveDesign: false,
    disablePadding: false,
    disableHeaderPadding: false,
    verticalDivider: false,
    horizontalScrollWidth: '',
    noMinWidth: false,
    column1Width: '',
    column2Width: '',
    column3Width: '',
    column4Width: '',
    clickable: false,
  },
};

const BasicTemplate = ({
  modeVariant,
  headerTextAlignment,
  cellTextAlignment,
  compactDesign,
  responsiveDesign,
  disablePadding,
  disableHeaderPadding,
  verticalDivider,
  horizontalScrollWidth,
  noMinWidth,
  column1Width,
  column2Width,
  column3Width,
  column4Width,
  clickable,
}) =>
  formatHtmlPreview(`
  <tds-table
      vertical-dividers="${verticalDivider}"
      compact-design="${compactDesign}"
      responsive="${responsiveDesign}"
      ${noMinWidth ? 'no-min-width' : ''}
      ${modeVariant !== 'Inherit from parent' ? `mode-variant="${modeVariant.toLowerCase()}"` : ''}
      ${horizontalScrollWidth ? `horizontal-scroll-width="${horizontalScrollWidth}"` : ''}
    >
      <tds-table-header >
          <tds-header-cell cell-key='truck' cell-value='Truck type' disable-padding="${disableHeaderPadding}" ${
    column1Width ? `custom-width="${column1Width}"` : ''
  } text-align="${headerTextAlignment}"></tds-header-cell>
          <tds-header-cell cell-key='driver' cell-value='Driver name' disable-padding="${disableHeaderPadding}" ${
    column2Width ? `custom-width="${column2Width}"` : ''
  } text-align="${headerTextAlignment}"></tds-header-cell>
          <tds-header-cell cell-key='country' cell-value='Country' disable-padding="${disableHeaderPadding}" ${
    column3Width ? `custom-width="${column3Width}"` : ''
  } text-align="${headerTextAlignment}"></tds-header-cell>
          <tds-header-cell cell-key='mileage' cell-value='Mileage' disable-padding="${disableHeaderPadding}" ${
    column4Width ? `custom-width="${column4Width}"` : ''
  } text-align="${headerTextAlignment}"></tds-header-cell>
      </tds-table-header>
      <tds-table-body>
          ${[...Array(6)]
            .map(
              (_, index) => `
            <tds-table-body-row ${clickable ? 'clickable' : ''}>
              <tds-body-cell cell-value="Test value ${
                index % 2 === 0 ? '1' : '5'
              }" cell-key="truck" disable-padding="${disablePadding}" ${
                cellTextAlignment ? `text-align="${cellTextAlignment}"` : ''
              }></tds-body-cell>
              <tds-body-cell cell-value="Test value ${
                index % 2 === 0 ? '2' : '6'
              }" cell-key="driver" disable-padding="${disablePadding}" ${
                cellTextAlignment ? `text-align="${cellTextAlignment}"` : ''
              }></tds-body-cell>
              <tds-body-cell cell-value="Test value ${
                index % 2 === 0 ? '3' : '7'
              }" cell-key="country" disable-padding="${disablePadding}" ${
                cellTextAlignment ? `text-align="${cellTextAlignment}"` : ''
              }></tds-body-cell>
              <tds-body-cell cell-value="Test value ${
                index % 2 === 0 ? '4' : '8'
              }" cell-key="mileage" disable-padding="${disablePadding}" ${
                cellTextAlignment ? `text-align="${cellTextAlignment}"` : ''
              }></tds-body-cell>
            </tds-table-body-row>
          `,
            )
            .join('')}
      </tds-table-body>
  </tds-table>

  <!-- The script below is just for demo purposes -->
<script>
  (function() {
    // Select all rows
    let rows = document.querySelectorAll('tds-table-body-row');

    // Add event listener to all rows
    rows.forEach(row => {
      row.addEventListener('tdsClick', (event) => {
        console.log('Row clicked:', event.detail);
      });
    });
  })();
</script>
`);

export const Basic = BasicTemplate.bind({});
