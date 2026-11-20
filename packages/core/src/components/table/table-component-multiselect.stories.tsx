export default {
  title: 'Components/Table/Multiselect',

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
    emptyState: {
      name: 'Empty state',
      control: { type: 'radio' },
      options: ['none', 'no-data', 'no-filtered-data'],
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
    emptyState: 'none',
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

const renderEmptyStateSlot = (emptyState: string) =>
  emptyState === 'no-data'
    ? `
      <div class="tds-u-flex-center" style="padding: var(--unit-80);">
        <div class="tds-u-flex tds-u-gap2" style="max-width: 560px;">
          <tds-icon name="truck" size="28px" aria-hidden="true"></tds-icon>
          <div>
            <h4 class="tds-headline-04" style="margin: 0;">No vehicles yet</h4>
            <p class="tds-body-02" style="margin-block: var(--unit-16) 0; color: var(--color-text-defined);">
              Add a vehicle to start building your fleet, or choose a vehicle type to get started.
            </p>
            <div class="tds-u-flex tds-u-flex-wrap tds-u-gap2" style="margin-block-start: var(--unit-32);" role="group" aria-label="Vehicle types">
              ${['Trucks', 'Buses', 'Vans', 'Trailers', 'Other']
                .map(
                  (label) =>
                    `<tds-chip type="button" size="lg"><span slot="label">${label}</span></tds-chip>`,
                )
                .join('')}
            </div>
            <div class="tds-u-flex tds-u-flex-wrap tds-u-gap2" style="align-items: center; margin-block-start: var(--unit-32);">
              <tds-button variant="primary" size="sm" text="Add vehicle"></tds-button>
              <tds-button variant="secondary" size="sm" text="Import vehicles"></tds-button>
              <tds-button variant="ghost" size="sm" text="View sample fleet"></tds-button>
              <tds-link underline><a href="#">Explore Scania</a></tds-link>
            </div>
          </div>
        </div>
      </div>
    `
    : `
      <div class="tds-u-flex-center" style="padding: var(--unit-80);">
        <div class="tds-u-flex tds-u-gap2" style="max-width: 448px;">
          <tds-icon name="search" size="28px" aria-hidden="true"></tds-icon>
          <div>
            <h4 class="tds-headline-04" style="margin: 0;">No data found</h4>
            <p class="tds-body-02" style="margin-block: var(--unit-16) 0; color: var(--color-text-defined);">
              There's nothing to show here yet. Try adjusting your filters or check back later.
            </p>
            <tds-button type="primary" size="sm" text="Clear filters" style="margin-block-start: var(--unit-32);"></tds-button>
          </div>
        </div>
      </div>
    `;

const MultiselectTemplate = ({
  modeVariant,
  allSelected,
  allIndeterminate,
  emptyState,
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
  `
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
              <tds-header-cell cell-key='mileage' cell-value='Mileage' ${
                column4Width ? `custom-width="${column4Width}"` : ''
              }></tds-header-cell>
          </tds-table-header>
          <tds-table-body empty-state="${emptyState}">
            ${
              emptyState === 'none'
                ? `
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
            `
                : `
              <div slot="${emptyState}">
                ${renderEmptyStateSlot(emptyState)}
              </div>
            `
            }
          </tds-table-body>
  </tds-table>
  <!-- Note: Code below is just for demo purposes -->
  <div class="tds-u-mt1" style="width: 500px; background-color: lightblue; padding: 16px;">
    <p class="tds-u-mt0">Note: This box works only in "Canvas" tab.</p>
    <h5 class="tds-u-mt0 tds-u-mb0">Event test box</h5>

    <h6 class="tds-u-mt1 tds-u-mb0">Event name:</h6>
    <label for="event-name-textarea" class="sr-only">Event Name</label>
    <textarea id="event-name-textarea" rows="1" cols="50" readonly></textarea>

    <br><br>

    <h6 class="tds-u-mt0 tds-u-mb0">Events value (aka detail):</h6>
    <label for="event-value-textarea" class="sr-only">Event Value</label>
    <textarea id="event-value-textarea" rows="4" cols="50" readonly></textarea>

    <br><br>

    <h6 class="tds-u-mt0 tds-u-mb0">Selected rows:</h6>
    <label for="selected-rows-textarea" class="sr-only">Selected Rows</label>
    <textarea id="selected-rows-textarea" rows="4" cols="50" readonly></textarea>
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
  `;

export const Default = MultiselectTemplate.bind({});
