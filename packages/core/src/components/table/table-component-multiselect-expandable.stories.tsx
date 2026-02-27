import formatHtmlPreview from '../../stories/formatHtmlPreview';

export default {
  title: 'Components/Table/Multiselect + Expandable',

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
    expanded: {
      name: 'Expanded',
      description: 'Expands first row when set to true.',
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
    overflow: {
      name: 'Overflow',
      description: 'Controls the overflow behavior of the expandable row content',
      control: {
        type: 'radio',
      },
      options: ['auto', 'hidden', 'visible'],
      table: {
        defaultValue: { summary: 'auto' },
      },
    },
    autoCollapse: {
      name: 'Auto Collapse',
      description: 'Automatically collapses other rows when one is expanded.',
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
    allSelected: false,
    allIndeterminate: false,
    allDisabled: false,
    compactDesign: false,
    expanded: false,
    responsiveDesign: false,
    verticalDivider: false,
    noMinWidth: false,
    column1Width: '',
    column2Width: '',
    column3Width: '',
    column4Width: '',
    overflow: 'auto',
    autoCollapse: false,
  },
};

const MultiselectExpandableTemplate = ({
  modeVariant,
  allSelected,
  allIndeterminate,
  allDisabled,
  compactDesign,
  expanded,
  responsiveDesign,
  verticalDivider,
  noMinWidth,
  column1Width,
  column2Width,
  column3Width,
  column4Width,
  overflow,
  autoCollapse,
}) =>
  formatHtmlPreview(`
    <tds-table
        table-id="multiselect-expandable-table"
        multiselect
        expandable-rows
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
            <tds-table-body-row-expandable expanded="${expanded}" auto-collapse="${autoCollapse}" overflow="${overflow}" row-id="1">
              <tds-body-cell cell-key="truck" cell-value="L-series"></tds-body-cell>
              <tds-body-cell cell-key="driver" cell-value="Sonya Bruce"></tds-body-cell>
              <tds-body-cell cell-key="country" cell-value="Brazil"></tds-body-cell>
              <tds-body-cell cell-key="mileage" cell-value="123987" text-align="right"></tds-body-cell>
              <div slot="expand-row">
                <p><strong>Additional Details:</strong></p>
                <p>Truck Model: L-series Premium</p>
                <p>Last Service: 2023-08-15</p>
                <p>Next Service Due: 2024-02-15</p>
              </div>
            </tds-table-body-row-expandable>
            
            <tds-table-body-row-expandable auto-collapse="${autoCollapse}" overflow="${overflow}" row-id="2">
              <tds-body-cell cell-key="truck" cell-value="P-series"></tds-body-cell>
              <tds-body-cell cell-key="driver" cell-value="Guerra Bowman"></tds-body-cell>
              <tds-body-cell cell-key="country" cell-value="Sweden"></tds-body-cell>
              <tds-body-cell cell-key="mileage" cell-value="2000852" text-align="right"></tds-body-cell>
              <div slot="expand-row">
                <p><strong>Additional Details:</strong></p>
                <p>Truck Model: P-series Long Haul</p>
                <p>Last Service: 2023-09-22</p>
                <p>Next Service Due: 2024-03-22</p>
              </div>
            </tds-table-body-row-expandable>
            
            <tds-table-body-row-expandable auto-collapse="${autoCollapse}" overflow="${overflow}" row-id="3" selected>
              <tds-body-cell cell-key="truck" cell-value="G-series"></tds-body-cell>
              <tds-body-cell cell-key="driver" cell-value="Ferrell Wallace"></tds-body-cell>
              <tds-body-cell cell-key="country" cell-value="Germany"></tds-body-cell>
              <tds-body-cell cell-key="mileage" cell-value="564" text-align="right"></tds-body-cell>
              <div slot="expand-row">
                <p><strong>Additional Details:</strong></p>
                <p>Truck Model: G-series Construction</p>
                <p>Last Service: 2024-01-05</p>
                <p>Next Service Due: 2024-07-05</p>
                <tds-button type="primary" text="Schedule Service" size="sm"></tds-button>
              </div>
            </tds-table-body-row-expandable>
            
            <tds-table-body-row-expandable auto-collapse="${autoCollapse}" overflow="${overflow}" row-id="4">
              <tds-body-cell cell-key="truck" cell-value="R-series"></tds-body-cell>
              <tds-body-cell cell-key="driver" cell-value="Cox Burris"></tds-body-cell>
              <tds-body-cell cell-key="country" cell-value="Spain"></tds-body-cell>
              <tds-body-cell cell-key="mileage" cell-value="1789357" text-align="right"></tds-body-cell>
              <div slot="expand-row">
                <p><strong>Additional Details:</strong></p>
                <p>Truck Model: R-series Heavy Duty</p>
                <p>Last Service: 2023-12-10</p>
                <p>Next Service Due: 2024-06-10</p>
              </div>
            </tds-table-body-row-expandable>
          </tds-table-body>
  </tds-table>
  
  <!-- Note: Code below is just for demo purposes -->
  <div class="tds-u-mt1" style="width: 600px; background-color: lightblue; padding: 16px;">
    <p class="tds-u-mt0">Note: This box works only in "Canvas" tab.</p>
    <h5 class="tds-u-mt0 tds-u-mb0">Event test box</h5>

    <h6 class="tds-u-mt1 tds-u-mb0">Event name:</h6>
    <label for="event-name-textarea" class="sr-only">Event Name</label>
    <textarea id="event-name-textarea" rows="1" cols="70" readonly></textarea>

    <br><br>

    <h6 class="tds-u-mt0 tds-u-mb0">Events value (aka detail):</h6>
    <label for="event-value-textarea" class="sr-only">Event Value</label>
    <textarea id="event-value-textarea" rows="4" cols="70" readonly></textarea>

    <br><br>

    <h6 class="tds-u-mt0 tds-u-mb0">Selected rows:</h6>
    <label for="selected-rows-textarea" class="sr-only">Selected Rows</label>
    <textarea id="selected-rows-textarea" rows="4" cols="70" readonly></textarea>
  </div>  

  <script>
  // Note: Script here is only for demo purposes

  window.addEventListener('tdsSelectAll', e => {
    console.log('tdsSelectAll event:', e)
    document.getElementById('event-name-textarea').value = e.type;
    document.getElementById('event-value-textarea').value = JSON.stringify(e.detail, null, 2);
    document.getElementById('selected-rows-textarea').value = JSON.stringify(e.detail.selectedRows, null, 2);
  });

  window.addEventListener('tdsSelect', e => {
    console.log('tdsSelect event:', e)
    document.getElementById('event-name-textarea').value = e.type;
    document.getElementById('event-value-textarea').value = JSON.stringify(e.detail, null, 2);
    document.getElementById('selected-rows-textarea').value = JSON.stringify(e.detail.selectedRows, null, 2);
  });

  window.addEventListener('tdsChange', e => {
    // This is for expandable row changes
    if (e.detail.rowId && e.detail.isExpanded !== undefined) {
      console.log('tdsChange (expand) event:', e)
      document.getElementById('event-name-textarea').value = e.type + ' (expand)';
      document.getElementById('event-value-textarea').value = JSON.stringify(e.detail, null, 2);
    }
  });
</script>
  `);

export const Default = MultiselectExpandableTemplate.bind({});
