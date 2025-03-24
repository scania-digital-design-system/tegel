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
import formatHtmlPreview from '../../stories/formatHtmlPreview';

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
  },
};

const EditableCellsTemplate = ({
  modeVariant,
  headerTextAlignment,
  cellTextAlignment,
  compactDesign,
  responsiveDesign,

  disableHeaderPadding,
  verticalDivider,
  horizontalScrollWidth,
  noMinWidth,
  column1Width,
  column2Width,
  column3Width,
  column4Width,
}) =>
  formatHtmlPreview(`

  <div>
    <style>
      label {
        position: absolute;
        width: 1px;
        height: 1px;
        margin: -1px;
        padding: 0;
        overflow: hidden;
        clip: rect(0 0 0 0);
        border: 0;
      }
    </style>
    <tds-table
  vertical-dividers="${verticalDivider}"
  compact-design="${compactDesign}"
  responsive="${responsiveDesign}"
  ${noMinWidth ? 'no-min-width' : ''}
  ${modeVariant !== 'Inherit from parent' ? `mode-variant="${modeVariant.toLowerCase()}"` : ''}
  ${horizontalScrollWidth ? `horizontal-scroll-width="${horizontalScrollWidth}"` : ''}
>
  <tds-table-header>
    <tds-header-cell cell-key="truck" cell-value="Truck type" disable-padding="${disableHeaderPadding}" ${
    column1Width ? `custom-width="${column1Width}"` : ''
  } text-align="${headerTextAlignment}"></tds-header-cell>
    <tds-header-cell cell-key="driver" cell-value="Driver name" disable-padding="${disableHeaderPadding}" ${
    column2Width ? `custom-width="${column2Width}"` : ''
  } text-align="${headerTextAlignment}"></tds-header-cell>
    <tds-header-cell cell-key="country" cell-value="Country" disable-padding="${disableHeaderPadding}" ${
    column3Width ? `custom-width="${column3Width}"` : ''
  } text-align="${headerTextAlignment}"></tds-header-cell>
    <tds-header-cell cell-key="mileage" cell-value="Mileage" disable-padding="${disableHeaderPadding}" ${
    column4Width ? `custom-width="${column4Width}"` : ''
  } text-align="${headerTextAlignment}"></tds-header-cell>
  </tds-table-header>

  <tds-table-body>
    <tds-table-body-row>
      <tds-body-cell cell-key="truck" disable-padding="true" ${
        cellTextAlignment ? `text-align="${cellTextAlignment}"` : ''
      }>
        <tds-table-body-input-wrapper>
          <label for="truck-input-1">Truck type</label>
          <input id="truck-input-1" type="text" value="Test value 1" />
        </tds-table-body-input-wrapper>
      </tds-body-cell>

      <tds-body-cell cell-key="driver" disable-padding="true" ${
        cellTextAlignment ? `text-align="${cellTextAlignment}"` : ''
      }>
        <tds-table-body-input-wrapper>
          <label for="driver-input-1">Driver name</label>
          <input id="driver-input-1" type="text" value="Test value 2" />
        </tds-table-body-input-wrapper>
      </tds-body-cell>

      <tds-body-cell cell-key="country" disable-padding="true" ${
        cellTextAlignment ? `text-align="${cellTextAlignment}"` : ''
      }>
        <tds-table-body-input-wrapper>
          <label for="country-input-1">Country</label>
          <input id="country-input-1" type="text" value="Test value 3" />
        </tds-table-body-input-wrapper>
      </tds-body-cell>

      <tds-body-cell cell-key="mileage" disable-padding="true" ${
        cellTextAlignment ? `text-align="${cellTextAlignment}"` : ''
      }>
        <tds-table-body-input-wrapper>
          <label for="mileage-input-1">Mileage</label>
          <input id="mileage-input-1" type="text" value="Test value 4" />
        </tds-table-body-input-wrapper>
      </tds-body-cell>
    </tds-table-body-row>

    <tds-table-body-row>
      <tds-body-cell cell-key="truck" disable-padding="true" ${
        cellTextAlignment ? `text-align="${cellTextAlignment}"` : ''
      }>
        <tds-table-body-input-wrapper>
          <label for="truck-input-2">Truck type</label>
          <input id="truck-input-2" type="text" value="Test value 5" />
        </tds-table-body-input-wrapper>
      </tds-body-cell>

      <tds-body-cell cell-key="driver" disable-padding="true" ${
        cellTextAlignment ? `text-align="${cellTextAlignment}"` : ''
      }>
        <tds-table-body-input-wrapper>
          <label for="driver-input-2">Driver name</label>
          <input id="driver-input-2" type="text" value="Test value 6" />
        </tds-table-body-input-wrapper>
      </tds-body-cell>

      <tds-body-cell cell-key="country" disable-padding="true" ${
        cellTextAlignment ? `text-align="${cellTextAlignment}"` : ''
      }>
        <tds-table-body-input-wrapper>
          <label for="country-input-2">Country</label>
          <input id="country-input-2" type="text" value="Test value 7" />
        </tds-table-body-input-wrapper>
      </tds-body-cell>

      <tds-body-cell cell-key="mileage" disable-padding="true" ${
        cellTextAlignment ? `text-align="${cellTextAlignment}"` : ''
      }>
        <tds-table-body-input-wrapper>
          <label for="mileage-input-2">Mileage</label>
          <input id="mileage-input-2" type="text" value="Test value 8" />
        </tds-table-body-input-wrapper>
      </tds-body-cell>
    </tds-table-body-row>

    <tds-table-body-row>
      <tds-body-cell cell-key="truck" disable-padding="true" ${
        cellTextAlignment ? `text-align="${cellTextAlignment}"` : ''
      }>
        <tds-table-body-input-wrapper>
          <label for="truck-input-3">Truck type</label>
          <input id="truck-input-3" type="text" value="Test value 1" />
        </tds-table-body-input-wrapper>
      </tds-body-cell>

      <tds-body-cell cell-key="driver" disable-padding="true" ${
        cellTextAlignment ? `text-align="${cellTextAlignment}"` : ''
      }>
        <tds-table-body-input-wrapper>
          <label for="driver-input-3">Driver name</label>
          <input id="driver-input-3" type="text" value="Test value 2" />
        </tds-table-body-input-wrapper>
      </tds-body-cell>

      <tds-body-cell cell-key="country" disable-padding="true" ${
        cellTextAlignment ? `text-align="${cellTextAlignment}"` : ''
      }>
        <tds-table-body-input-wrapper>
          <label for="country-input-3">Country</label>
          <input id="country-input-3" type="text" value="Test value 3" />
        </tds-table-body-input-wrapper>
      </tds-body-cell>

      <tds-body-cell cell-key="mileage" disable-padding="true" ${
        cellTextAlignment ? `text-align="${cellTextAlignment}"` : ''
      }>
        <tds-table-body-input-wrapper>
          <label for="mileage-input-3">Mileage</label>
          <input id="mileage-input-3" type="text" value="Test value 4" />
        </tds-table-body-input-wrapper>
      </tds-body-cell>
    </tds-table-body-row>

    <tds-table-body-row>
      <tds-body-cell cell-key="truck" disable-padding="true" ${
        cellTextAlignment ? `text-align="${cellTextAlignment}"` : ''
      }>
        <tds-table-body-input-wrapper>
          <label for="truck-input-4">Truck type</label>
          <input id="truck-input-4" type="text" value="Test value 5" />
        </tds-table-body-input-wrapper>
      </tds-body-cell>

      <tds-body-cell cell-key="driver" disable-padding="true" ${
        cellTextAlignment ? `text-align="${cellTextAlignment}"` : ''
      }>
        <tds-table-body-input-wrapper>
          <label for="driver-input-4">Driver name</label>
          <input id="driver-input-4" type="text" value="Test value 6" />
        </tds-table-body-input-wrapper>
      </tds-body-cell>

      <tds-body-cell cell-key="country" disable-padding="true" ${
        cellTextAlignment ? `text-align="${cellTextAlignment}"` : ''
      }>
        <tds-table-body-input-wrapper>
          <label for="country-input-4">Country</label>
          <input id="country-input-4" type="text" value="Test value 7" />
        </tds-table-body-input-wrapper>
      </tds-body-cell>

      <tds-body-cell cell-key="mileage" disable-padding="true" ${
        cellTextAlignment ? `text-align="${cellTextAlignment}"` : ''
      }>
        <tds-table-body-input-wrapper>
          <label for="mileage-input-4">Mileage</label>
          <input id="mileage-input-4" type="text" value="Test value 8" />
        </tds-table-body-input-wrapper>
      </tds-body-cell>
    </tds-table-body-row>

    <tds-table-body-row>
      <tds-body-cell cell-key="truck" disable-padding="true" ${
        cellTextAlignment ? `text-align="${cellTextAlignment}"` : ''
      }>
        <tds-table-body-input-wrapper>
          <label for="truck-input-5">Truck type</label>
          <input id="truck-input-5" type="text" value="Test value 1" />
        </tds-table-body-input-wrapper>
      </tds-body-cell>

      <tds-body-cell cell-key="driver" disable-padding="true" ${
        cellTextAlignment ? `text-align="${cellTextAlignment}"` : ''
      }>
        <tds-table-body-input-wrapper>
          <label for="driver-input-5">Driver name</label>
          <input id="driver-input-5" type="text" value="Test value 2" />
        </tds-table-body-input-wrapper>
      </tds-body-cell>

      <tds-body-cell cell-key="country" disable-padding="true" ${
        cellTextAlignment ? `text-align="${cellTextAlignment}"` : ''
      }>
        <tds-table-body-input-wrapper>
          <label for="country-input-5">Country</label>
          <input id="country-input-5" type="text" value="Test value 3" />
        </tds-table-body-input-wrapper>
      </tds-body-cell>

      <tds-body-cell cell-key="mileage" disable-padding="true" ${
        cellTextAlignment ? `text-align="${cellTextAlignment}"` : ''
      }>
        <tds-table-body-input-wrapper>
          <label for="mileage-input-5">Mileage</label>
          <input id="mileage-input-5" type="text" value="Test value 4" />
        </tds-table-body-input-wrapper>
      </tds-body-cell>
    </tds-table-body-row>

    <tds-table-body-row>
      <tds-body-cell cell-key="truck" disable-padding="true" ${
        cellTextAlignment ? `text-align="${cellTextAlignment}"` : ''
      }>
        <tds-table-body-input-wrapper>
          <label for="truck-input-6">Truck type</label>
          <input id="truck-input-6" type="text" value="Test value 5" />
        </tds-table-body-input-wrapper>
      </tds-body-cell>

      <tds-body-cell cell-key="driver" disable-padding="true" ${
        cellTextAlignment ? `text-align="${cellTextAlignment}"` : ''
      }>
        <tds-table-body-input-wrapper>
          <label for="driver-input-6">Driver name</label>
          <input id="driver-input-6" type="text" value="Test value 6" />
        </tds-table-body-input-wrapper>
      </tds-body-cell>

      <tds-body-cell cell-key="country" disable-padding="true" ${
        cellTextAlignment ? `text-align="${cellTextAlignment}"` : ''
      }>
        <tds-table-body-input-wrapper>
          <label for="country-input-6">Country</label>
          <input id="country-input-6" type="text" value="Test value 7" />
        </tds-table-body-input-wrapper>
      </tds-body-cell>

      <tds-body-cell cell-key="mileage" disable-padding="true" ${
        cellTextAlignment ? `text-align="${cellTextAlignment}"` : ''
      }>
        <tds-table-body-input-wrapper>
          <label for="mileage-input-6">Mileage</label>
          <input id="mileage-input-6" type="text" value="Test value 8" />
        </tds-table-body-input-wrapper>
      </tds-body-cell>
    </tds-table-body-row>
  </tds-table-body>
</tds-table>
  </div>  
  `);

export const EditableCells = EditableCellsTemplate.bind({});
