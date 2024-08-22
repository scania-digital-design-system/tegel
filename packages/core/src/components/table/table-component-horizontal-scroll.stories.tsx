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
import tdsTableBodyInputWrapper from './table-body-input-wrapper/readme.md';
import tdsTableHeaderInputWrapper from './table-header-input-wrapper/readme.md';
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
    horizontalScrollWidth: {
      name: 'Horizontal scroll table width',
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
      if: { arg: 'horizontalScrollWidth', truthy: true },
    },
    column2Width: {
      name: 'Column 2 width',
      description:
        'Value of width for column 2. In order to work correctly "No minimum width" has to be enabled too. When editing please provide a unit next to the value, eg. 200px.',
      control: {
        type: 'text',
      },
      if: { arg: 'horizontalScrollWidth', truthy: true },
    },
    column3Width: {
      name: 'Column 3 width',
      description:
        'Value of width for column 3. In order to work correctly "No minimum width" has to be enabled too. When editing please provide a unit next to the value, eg. 200px.',
      control: {
        type: 'text',
      },
      if: { arg: 'horizontalScrollWidth', truthy: true },
    },
    column4Width: {
      name: 'Column 4 width',
      description:
        'Value of width for column 4. In order to work correctly "No minimum width" has to be enabled too. When editing please provide a unit next to the value, eg. 200px.',
      control: {
        type: 'text',
      },
      if: { arg: 'horizontalScrollWidth', truthy: true },
    },
  },
  args: {
    modeVariant: 'Inherit from parent',
    compactDesign: false,
    responsiveDesign: false,
    verticalDivider: false,
    noMinWidth: false,
    horizontalScrollWidth: '',
    column1Width: '',
    column2Width: '',
    column3Width: '',
    column4Width: '',
    batchArea: formatHtmlPreview(
      `<div slot="end" class="tds-u-flex tds-u-align-items-center tds-u-h-100 tds-u-gap1"><tds-button type="ghost" size="sm">
      <tds-icon slot="icon" class="tds-btn-icon" size="16px" name="settings"></tds-icon>
    </tds-button><tds-button  type="primary" size="sm" text="Download"></tds-button></div>`,
    ),
  },
};

const HorizontalScrollTemplate = ({
  modeVariant,
  compactDesign,
  responsiveDesign,
  verticalDivider,
  noMinWidth,
  horizontalScrollWidth,
  column1Width,
  column2Width,
  column3Width,
  column4Width,
  batchArea,
}) =>
  formatHtmlPreview(`
    <tds-table
      table-id='pagination-table'
      vertical-dividers="${verticalDivider}"
      compact-design="${compactDesign}"
      responsive="${responsiveDesign}"
      ${noMinWidth ? 'no-min-width' : ''}
      ${modeVariant !== 'Inherit from parent' ? `mode-variant="${modeVariant.toLowerCase()}"` : ''}
      ${horizontalScrollWidth ? `horizontal-scroll-width="${horizontalScrollWidth}"` : ''}
      >
        <tds-table-toolbar table-title="Batch action">
          ${batchArea}
        </tds-table-toolbar>
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
          <tds-table-footer pages="4" pagination ></tds-table-footer>
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
    window.addEventListener('tdsPagination', e => {
      document.getElementById('event-name-textarea').value = e.type;
      document.getElementById('event-value-textarea').value = JSON.stringify(e.detail, null, 2);
    });
  </script>
  
  `);

export const HorizontalScroll = HorizontalScrollTemplate.bind({});
