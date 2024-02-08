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
    allSelected: {
      name: 'All selected',
      description: `Controls the checked state of the "all-selected"-checkbox.`,
      control: {
        type: 'boolean',
      },
    },
    allDisabled: {
      name: 'All disabled',
      description: `Controls the disabled state of the "all-selected"-checkbox.`,
      control: {
        type: 'boolean',
      },
    },
    allIndeterminate: {
      name: 'All indeterminate',
      description: `Controls the indeterminate state of the "all-selected"-checkbox.`,
      control: {
        type: 'boolean',
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
    allSelected: false,
    allIndeterminate: false,
    allDisabled: false,
    compactDesign: false,
    responsiveDesign: false,
    verticalDivider: false,
    noMinWidth: false,
    column1Width: '',
    column2Width: '',
    column3Width: '',
    column4Width: '',
  },
};

const MultiselectTemplate = ({
  modeVariant,
  allSelected,
  allIndeterminate,
  allDisabled,
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
        table-id="multiselect-table"
        multiselect
        vertical-dividers="${verticalDivider}"
        compact-design="${compactDesign}"
        responsive="${responsiveDesign}"
        ${noMinWidth ? 'no-min-width' : ''}
        ${
          modeVariant !== 'Inherit from parent' ? `mode-variant="${modeVariant.toLowerCase()}"` : ''
        }
    >
          <tds-table-header 
            ${allSelected ? 'selected' : ''}
            ${allIndeterminate ? 'indeterminate' : ''}
            ${allDisabled ? 'disabled' : ''}
          >
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
          <tds-body-cell cell-key="truck" cell-value="L-series"> </tds-body-cell
          ><tds-body-cell cell-key="driver" cell-value="Sonya Bruce"></tds-body-cell
          ><tds-body-cell cell-key="country" cell-value="Brazil"></tds-body-cell
          ><tds-body-cell cell-key="mileage" cell-value="123987"></tds-body-cell>
        </tds-table-body-row>
        <tds-table-body-row 
          ><tds-body-cell cell-key="truck" cell-value="P-series"></tds-body-cell
          ><tds-body-cell cell-key="driver" cell-value="Guerra Bowman"></tds-body-cell
          ><tds-body-cell cell-key="country" cell-value="Sweden"></tds-body-cell
          ><tds-body-cell cell-key="mileage" cell-value="2000852"></tds-body-cell>
        </tds-table-body-row>
        <tds-table-body-row
          ><tds-body-cell cell-key="truck" cell-value="G-series"></tds-body-cell
          ><tds-body-cell cell-key="driver" cell-value="Ferrell Wallace"></tds-body-cell
          ><tds-body-cell cell-key="country" cell-value="Germany"></tds-body-cell
          ><tds-body-cell cell-key="mileage" cell-value="564"></tds-body-cell>
        </tds-table-body-row>
        <tds-table-body-row
          ><tds-body-cell cell-key="truck" cell-value="R-series"></tds-body-cell
          ><tds-body-cell cell-key="driver" cell-value="Cox Burris"></tds-body-cell
          ><tds-body-cell cell-key="country" cell-value="Spain"></tds-body-cell
          ><tds-body-cell cell-key="mileage" cell-value="1789357"></tds-body-cell>
        </tds-table-body-row>
          </tds-table-body>
  </tds-table>
  <!-- Note: Code below is just for demo purposes -->
  <div class="tds-u-mt1" style="width: 500px; background-color: lightblue; padding: 16px;">
  <p class="tds-u-mt0">Note: This box works only in "Canvas" tab.</p>
    <h5 class="tds-u-mt0 tds-u-mb0">Event test box</h5>
    <h6 class="tds-u-mt1 tds-u-mb0">Event name:</h6>
    <textarea id="event-name-textarea" rows="1" cols="50" readonly></textarea>
    <br><br>
    <h6 class="tds-u-mt0 tds-u-mb0">Events value (aka detail)</h6>
    <textarea id="event-value-textarea" rows="4" cols="50" readonly></textarea>
    <br><br>
    <h6 class="tds-u-mt0 tds-u-mb0">Selected rows</h6>
    <textarea  id="selected-rows-textarea" rows="4" cols="50" readonly></textarea>
  </div>  
  <script>
  // Note: Script here is only for demo purposes

  window.addEventListener('tdsSelectAll', e => {
    console.log(e)
    document.getElementById('event-name-textarea').value = e.type;
    document.getElementById('event-value-textarea').value = JSON.stringify(e.detail, null, 2);
    document.getElementById('selected-rows-textarea').value = JSON.stringify(e.detail.selectedRows,null, 2);
  });

  window.addEventListener('tdsSelect', e => {
    console.log(e)
    document.getElementById('event-name-textarea').value = e.type;
    document.getElementById('event-value-textarea').value = JSON.stringify(e.detail, null, 2);
    document.getElementById('selected-rows-textarea').value = JSON.stringify(e.detail.selectedRows,null, 2);
  });
</script>
  `);

export const Multiselect = MultiselectTemplate.bind({});
