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
    batchArea: {
      name: 'Batch code',
      description: 'Enables code to be injected into the toolbar area.',
      control: {
        type: 'text',
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
    batchArea: formatHtmlPreview(
      `<div slot="end" class="tds-u-flex tds-u-align-items-center tds-u-h-100 tds-u-gap1"><tds-button type="ghost" size="sm">
      <tds-icon slot="icon" class="tds-btn-icon" size="16px" name="settings"></tds-icon>
    </tds-button><tds-button  type="primary" size="sm" text="Download"></tds-button></div>`,
    ),
    verticalDivider: false,
    noMinWidth: false,
    column1Width: '',
    column2Width: '',
    column3Width: '',
    column4Width: '',
  },
};

const BatchActionTemplate = ({
  modeVariant,
  compactDesign,
  responsiveDesign,
  batchArea,
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
        responsive="${responsiveDesign}"
        ${noMinWidth ? 'no-min-width' : ''}
        ${
          modeVariant !== 'Inherit from parent' ? `mode-variant="${modeVariant.toLowerCase()}"` : ''
        }
      >
          <tds-table-toolbar table-title="Batch action">
          ${batchArea}
        </tds-table-toolbar>
          <tds-table-header>
              <tds-header-cell ${
                column1Width ? `style="width: ${column1Width};"` : ''
              } cell-key='truck' cell-value='Truck type'></tds-header-cell>
              <tds-header-cell ${
                column2Width ? `style="width: ${column2Width};"` : ''
              } cell-key='driver' cell-value='Driver name'></tds-header-cell>
              <tds-header-cell ${
                column3Width ? `style="width: ${column3Width};"` : ''
              } cell-key='country' cell-value='Country'></tds-header-cell>
              <tds-header-cell ${
                column4Width ? `style="width: ${column4Width};"` : ''
              } cell-key='mileage' cell-value='Mileage' text-align='right'></tds-header-cell>
          </tds-table-header>
          <tds-table-body>
          <tds-table-body-row>
              <tds-body-cell cell-value="Test value 1" cell-key="truck"></tds-body-cell>
              <tds-body-cell cell-value="Test value 2" cell-key="driver"></tds-body-cell>
              <tds-body-cell cell-value="Test value 3" cell-key="country"></tds-body-cell>
              <tds-body-cell cell-value="Test value 4" cell-key="mileage"></tds-body-cell>
          </tds-table-body-row>
          <tds-table-body-row>
              <tds-body-cell cell-value="Test value 5" cell-key="truck"></tds-body-cell>
              <tds-body-cell cell-value="Test value 6" cell-key="driver"></tds-body-cell>
              <tds-body-cell cell-value="Test value 7" cell-key="country"></tds-body-cell>
              <tds-body-cell cell-value="Test value 8" cell-key="mileage"></tds-body-cell>
          </tds-table-body-row>
          <tds-table-body-row>
              <tds-body-cell cell-value="Test value 1" cell-key="truck"></tds-body-cell>
              <tds-body-cell cell-value="Test value 2" cell-key="driver"></tds-body-cell>
              <tds-body-cell cell-value="Test value 3" cell-key="country"></tds-body-cell>
              <tds-body-cell cell-value="Test value 4" cell-key="mileage"></tds-body-cell>
          </tds-table-body-row>
          <tds-table-body-row>
              <tds-body-cell cell-value="Test value 5" cell-key="truck"></tds-body-cell>
              <tds-body-cell cell-value="Test value 6" cell-key="driver"></tds-body-cell>
              <tds-body-cell cell-value="Test value 7" cell-key="country"></tds-body-cell>
              <tds-body-cell cell-value="Test value 8" cell-key="mileage"></tds-body-cell>
          </tds-table-body-row>
          <tds-table-body-row>
              <tds-body-cell cell-value="Test value 1" cell-key="truck"></tds-body-cell>
              <tds-body-cell cell-value="Test value 2" cell-key="driver"></tds-body-cell>
              <tds-body-cell cell-value="Test value 3" cell-key="country"></tds-body-cell>
              <tds-body-cell cell-value="Test value 4" cell-key="mileage"></tds-body-cell>
          </tds-table-body-row>
          <tds-table-body-row>
              <tds-body-cell cell-value="Test value 5" cell-key="truck"></tds-body-cell>
              <tds-body-cell cell-value="Test value 6" cell-key="driver"></tds-body-cell>
              <tds-body-cell cell-value="Test value 7" cell-key="country"></tds-body-cell>
              <tds-body-cell cell-value="Test value 8" cell-key="mileage"></tds-body-cell>
          </tds-table-body-row>
      </tds-table-body>
  </tds-table>
  `);

export const BatchAction = BatchActionTemplate.bind({});
