export default {
  title: 'Components/Table/Zebra',

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
    zebraMode: {
      name: 'Zebra mode',
      description: 'Enables zebra mode for the table.',
      control: {
        type: 'radio',
      },
      options: ['rows-odd', 'rows-even', 'columns-odd', 'columns-even', 'none'],
    },
    emptyState: {
      name: 'Empty state',
      control: { type: 'radio' },
      options: ['none', 'no-data', 'no-filtered-data'],
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
    zebraMode: 'rows-odd',
    emptyState: 'none',
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

const ZebraModeTemplate = ({
  modeVariant,
  headerTextAlignment,
  cellTextAlignment,
  compactDesign,
  responsiveDesign,
  disablePadding,
  disableHeaderPadding,
  verticalDivider,
  horizontalScrollWidth,
  zebraMode,
  emptyState,
  noMinWidth,
  column1Width,
  column2Width,
  column3Width,
  column4Width,
}) =>
  `
  <tds-table
      vertical-dividers="${verticalDivider}"
      compact-design="${compactDesign}"
      responsive="${responsiveDesign}"
      ${noMinWidth ? 'no-min-width' : ''}
      ${zebraMode !== 'none' ? `zebra-mode="${zebraMode}"` : ''}
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
      <tds-table-body empty-state="${emptyState}">
        ${
          emptyState === 'none'
            ? `
          <tds-table-body-row>
              <tds-body-cell cell-value="Test value 1" cell-key="truck" disable-padding="${disablePadding}" ${
                cellTextAlignment ? `text-align="${cellTextAlignment}"` : ''
              }></tds-body-cell>
              <tds-body-cell cell-value="Test value 2" cell-key="driver" disable-padding="${disablePadding}" ${
                cellTextAlignment ? `text-align="${cellTextAlignment}"` : ''
              }></tds-body-cell>
              <tds-body-cell cell-value="Test value 3" cell-key="country" disable-padding="${disablePadding}" ${
                cellTextAlignment ? `text-align="${cellTextAlignment}"` : ''
              }></tds-body-cell>
              <tds-body-cell cell-value="Test value 4" cell-key="mileage" disable-padding="${disablePadding}" ${
                cellTextAlignment ? `text-align="${cellTextAlignment}"` : ''
              }></tds-body-cell>
          </tds-table-body-row>
          <tds-table-body-row>
              <tds-body-cell cell-value="Test value 5" cell-key="truck" disable-padding="${disablePadding}" ${
                cellTextAlignment ? `text-align="${cellTextAlignment}"` : ''
              }></tds-body-cell>
              <tds-body-cell cell-value="Test value 6" cell-key="driver" disable-padding="${disablePadding}" ${
                cellTextAlignment ? `text-align="${cellTextAlignment}"` : ''
              }></tds-body-cell>
              <tds-body-cell cell-value="Test value 7" cell-key="country" disable-padding="${disablePadding}" ${
                cellTextAlignment ? `text-align="${cellTextAlignment}"` : ''
              }></tds-body-cell>
              <tds-body-cell cell-value="Test value 8" cell-key="mileage" disable-padding="${disablePadding}" ${
                cellTextAlignment ? `text-align="${cellTextAlignment}"` : ''
              }></tds-body-cell>
          </tds-table-body-row>
          <tds-table-body-row>
              <tds-body-cell cell-value="Test value 1" cell-key="truck" disable-padding="${disablePadding}" ${
                cellTextAlignment ? `text-align="${cellTextAlignment}"` : ''
              }></tds-body-cell>
              <tds-body-cell cell-value="Test value 2" cell-key="driver" disable-padding="${disablePadding}" ${
                cellTextAlignment ? `text-align="${cellTextAlignment}"` : ''
              }></tds-body-cell>
              <tds-body-cell cell-value="Test value 3" cell-key="country" disable-padding="${disablePadding}" ${
                cellTextAlignment ? `text-align="${cellTextAlignment}"` : ''
              }></tds-body-cell>
              <tds-body-cell cell-value="Test value 4" cell-key="mileage" disable-padding="${disablePadding}" ${
                cellTextAlignment ? `text-align="${cellTextAlignment}"` : ''
              }></tds-body-cell>
          </tds-table-body-row>
          <tds-table-body-row>
              <tds-body-cell cell-value="Test value 5" cell-key="truck" disable-padding="${disablePadding}" ${
                cellTextAlignment ? `text-align="${cellTextAlignment}"` : ''
              }></tds-body-cell>
              <tds-body-cell cell-value="Test value 6" cell-key="driver" disable-padding="${disablePadding}" ${
                cellTextAlignment ? `text-align="${cellTextAlignment}"` : ''
              }></tds-body-cell>
              <tds-body-cell cell-value="Test value 7" cell-key="country" disable-padding="${disablePadding}" ${
                cellTextAlignment ? `text-align="${cellTextAlignment}"` : ''
              }></tds-body-cell>
              <tds-body-cell cell-value="Test value 8" cell-key="mileage" disable-padding="${disablePadding}" ${
                cellTextAlignment ? `text-align="${cellTextAlignment}"` : ''
              }></tds-body-cell>
          </tds-table-body-row>
          <tds-table-body-row>
              <tds-body-cell cell-value="Test value 1" cell-key="truck" disable-padding="${disablePadding}" ${
                cellTextAlignment ? `text-align="${cellTextAlignment}"` : ''
              }></tds-body-cell>
              <tds-body-cell cell-value="Test value 2" cell-key="driver" disable-padding="${disablePadding}" ${
                cellTextAlignment ? `text-align="${cellTextAlignment}"` : ''
              }></tds-body-cell>
              <tds-body-cell cell-value="Test value 3" cell-key="country" disable-padding="${disablePadding}" ${
                cellTextAlignment ? `text-align="${cellTextAlignment}"` : ''
              }></tds-body-cell>
              <tds-body-cell cell-value="Test value 4" cell-key="mileage" disable-padding="${disablePadding}" ${
                cellTextAlignment ? `text-align="${cellTextAlignment}"` : ''
              }></tds-body-cell>
          </tds-table-body-row>
          <tds-table-body-row>
              <tds-body-cell cell-value="Test value 5" cell-key="truck" disable-padding="${disablePadding}" ${
                cellTextAlignment ? `text-align="${cellTextAlignment}"` : ''
              }></tds-body-cell>
              <tds-body-cell cell-value="Test value 6" cell-key="driver" disable-padding="${disablePadding}" ${
                cellTextAlignment ? `text-align="${cellTextAlignment}"` : ''
              }></tds-body-cell>
              <tds-body-cell cell-value="Test value 7" cell-key="country" disable-padding="${disablePadding}" ${
                cellTextAlignment ? `text-align="${cellTextAlignment}"` : ''
              }></tds-body-cell>
              <tds-body-cell cell-value="Test value 8" cell-key="mileage" disable-padding="${disablePadding}" ${
                cellTextAlignment ? `text-align="${cellTextAlignment}"` : ''
              }></tds-body-cell>
          </tds-table-body-row>
        `
            : `
          <div slot="${emptyState}">
            ${renderEmptyStateSlot(emptyState)}
          </div>
        `
        }
      </tds-table-body>
  </tds-table>`;

export const Default = ZebraModeTemplate.bind({});
