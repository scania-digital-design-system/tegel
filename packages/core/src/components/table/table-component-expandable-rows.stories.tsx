import formatHtmlPreview from '../../stories/formatHtmlPreview';

export default {
  title: 'Components/Table/Expandable Rows',

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
      table: {
        defaultValue: { summary: false },
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
  overflow,
  autoCollapse,
}) =>
  formatHtmlPreview(`
  <tds-table
    expandable-rows
    vertical-dividers="${verticalDivider}"
    compact-design="${compactDesign}"
    responsive="${responsiveDesign}"
    ${noMinWidth ? 'no-min-width' : ''}
    ${modeVariant !== 'Inherit from parent' ? `mode-variant="${modeVariant?.toLowerCase()}"` : ''}
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
        <tds-table-body-row-expandable expanded=${expanded} auto-collapse="${autoCollapse}" row-id="1">
          <tds-body-cell cell-value="Test value 1" cell-key="truck"></tds-body-cell>
          <tds-body-cell cell-value="Test value 2" cell-key="driver"></tds-body-cell>
          <tds-body-cell cell-value="Test value 3" cell-key="country"></tds-body-cell>
          <tds-body-cell cell-value="Test value 4" cell-key="mileage"></tds-body-cell>
          <div slot="expand-row">Hello world 1</div>
        </tds-table-body-row-expandable>
         <tds-table-body-row-expandable auto-collapse="${autoCollapse}" row-id="2">
          <tds-body-cell cell-value="Test value 5" cell-key="truck"></tds-body-cell>
          <tds-body-cell cell-value="Test value 6" cell-key="driver"></tds-body-cell>
          <tds-body-cell cell-value="Test value 7" cell-key="country"></tds-body-cell>
          <tds-body-cell cell-value="Test value 8" cell-key="mileage"></tds-body-cell>
          <div slot="expand-row">Hello to you too</div>
        </tds-table-body-row-expandable>
        <tds-table-body-row-expandable auto-collapse="${autoCollapse}" row-id="3">
          <tds-body-cell cell-value="Test value 9" cell-key="truck"></tds-body-cell>
          <tds-body-cell cell-value="Test value 10" cell-key="driver"></tds-body-cell>
          <tds-body-cell cell-value="Test value 11" cell-key="country"></tds-body-cell>
          <tds-body-cell cell-value="Test value 12" cell-key="mileage"></tds-body-cell>
          <div slot="expand-row"><tds-button type="primary" text="Call to action"></tds-button></div>
        </tds-table-body-row-expandable>
        <tds-table-body-row-expandable expanded="${expanded}" overflow="${overflow}" auto-collapse="${autoCollapse}" row-id="4">
          <tds-body-cell cell-value="Demo overflow 1" cell-key="truck"></tds-body-cell>
          <tds-body-cell cell-value="Demo overflow 2" cell-key="driver"></tds-body-cell>
          <tds-body-cell cell-value="Demo overflow 3" cell-key="country"></tds-body-cell>
          <tds-body-cell cell-value="Demo overflow 4" cell-key="mileage"></tds-body-cell>
          <div slot="expand-row">
            <!-- Demo block: Overflow solution for Expanded Rows (Not Recommended). -->
              <div style="background: linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet); width: 900px; height: 100px; color: white; text-shadow: 1px 1px 2px black;">
                This is an example of a long sentence that demonstrates how content can overflow the boundaries of its container, especially when the container has a fixed width and the content is too large to fit within it.
              </div>
            <!-- end of demo block -->
          </div>
        </tds-table-body-row-expandable>
      </tds-table-body>
  </tds-table>

  <!-- Script for demo purposes. -->
  <script>
      (function(){
        let tableRowElements = document.querySelectorAll("tds-table-body-row-expandable");

        for (let i = 0; i < tableRowElements.length; i++) {
          tableRowElements[i].addEventListener("tdsChange", (event) => {
            if (event.detail.isExpanded) {
              console.log("Row with id:", event.detail.rowId, "is", event.detail.isExpanded);
            }
          });
        }
      })();
    </script>
`);

export const Default = ExpandableRowTemplate.bind({});
