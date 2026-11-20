export default {
  title: 'Components/Table/Basic',
  parameters: {
    docs: {
      description: {
        component: `
<div style="border: 1px solid rgba(38, 85, 115, 0.15); padding: 10px; border-radius: 4px; box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px;">
🚧 Accessibility - This component is not fully accessible, read more in the <a href="https://tds-storybook.tegel.scania.com/?path=/docs/foundations-accessibility--docs">Accessibility section</a>.
</div>
        `,
      },
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
    cellVerticalAlignment: {
      name: 'Text vertical alignment in cells',
      description:
        'Vertical content alignment inside body cells.<br/>This control change in the docs/demo from Storybook does not show a difference given the height of each cell is already being used in full. This is for cases where the height may be bigger.',
      control: {
        type: 'radio',
      },
      options: ['top', 'bottom', 'middle'],
      table: {
        defaultValue: { summary: 'top' },
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
    emptyState: {
      name: 'Empty state',
      control: { type: 'radio' },
      options: ['none', 'no-data', 'no-filtered-data'],
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
    stickyHeader: {
      name: 'Sticky Header',
      description: 'Enables sticky header.',
      control: {
        type: 'boolean',
      },
      if: { arg: 'verticalScrollHeight', neq: '' },
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
    verticalScrollHeight: {
      name: 'Vertical scrolling table height in px',
      description: 'Used to set the boundary height of vertical scrolling',
      control: {
        type: 'text',
      },
      table: {
        defaultValue: { summary: '400px' },
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
    cellVerticalAlignment: 'top',
    compactDesign: false,
    responsiveDesign: false,
    emptyState: 'none',
    disablePadding: false,
    disableHeaderPadding: false,
    verticalDivider: false,
    stickyHeader: false,
    horizontalScrollWidth: '',
    verticalScrollHeight: '',
    noMinWidth: false,
    column1Width: '',
    column2Width: '',
    column3Width: '',
    column4Width: '',
    clickable: false,
  },
};

const renderEmptyStateSlot = (emptyState: string) =>
  emptyState === 'no-data'
    ? '<strong>No records yet</strong><div>New records will appear here.</div>'
    : `
      <div class="tds-u-flex-center" style="padding: var(--unit-80);">
        <div class="tds-u-flex tds-u-gap2" style="max-width: 447px;">
          <tds-icon name="search" size="28px" aria-hidden="true"></tds-icon>
          <div>
            <h4 class="tds-headline-04" style="margin: 0;">No data found</h4>
            <p class="tds-body-02" style="margin-block: var(--unit-16) 0; color: var(--color-text-defined);">
              There's nothing to show here yet. Try adjusting your filters or check back later.
            </p>
            <tds-button type="primary" size="sm" text="Clear filters" style="margin-top: var(--unit-32);"></tds-button>
          </div>
        </div>
      </div>
    `;

const BasicTemplate = ({
  modeVariant,
  headerTextAlignment,
  cellTextAlignment,
  cellVerticalAlignment,
  compactDesign,
  responsiveDesign,
  emptyState,
  disablePadding,
  disableHeaderPadding,
  verticalDivider,
  stickyHeader,
  horizontalScrollWidth,
  verticalScrollHeight,
  noMinWidth,
  column1Width,
  column2Width,
  column3Width,
  column4Width,
  clickable,
}) =>
  `
  <tds-table
      vertical-dividers="${verticalDivider}"
      compact-design="${compactDesign}"
      responsive="${responsiveDesign}"
      ${stickyHeader ? `sticky-header="${stickyHeader}"` : ''}
      ${noMinWidth ? 'no-min-width' : ''}
      ${modeVariant !== 'Inherit from parent' ? `mode-variant="${modeVariant.toLowerCase()}"` : ''}
      ${horizontalScrollWidth ? `horizontal-scroll-width="${horizontalScrollWidth}"` : ''}
      ${verticalScrollHeight ? `vertical-scroll-height="${verticalScrollHeight}"` : ''}
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
          ${[...Array(12)]
            .map(
              (_, index) => `
            <tds-table-body-row ${clickable ? 'clickable' : ''}>
              <tds-body-cell cell-value="Bigger text in this cell so that vertical alignment control effect in the docs can be noticeable, Test value ${
                index % 2 === 0 ? '1' : '5'
              }" cell-key="truck" disable-padding="${disablePadding}" ${
                cellTextAlignment ? `text-align="${cellTextAlignment}"` : ''
              } ${cellVerticalAlignment ? `vertical-align="${cellVerticalAlignment}"` : ''}>
                
              </tds-body-cell>
              <tds-body-cell cell-value="Test value ${
                index % 2 === 0 ? '2' : '6'
              }" cell-key="driver" disable-padding="${disablePadding}" ${
                cellTextAlignment ? `text-align="${cellTextAlignment}"` : ''
              } ${cellVerticalAlignment ? `vertical-align="${cellVerticalAlignment}"` : ''}></tds-body-cell>
              <tds-body-cell cell-value="Test value ${
                index % 2 === 0 ? '3' : '7'
              }" cell-key="country" disable-padding="${disablePadding}" ${
                cellTextAlignment ? `text-align="${cellTextAlignment}"` : ''
              } ${cellVerticalAlignment ? `vertical-align="${cellVerticalAlignment}"` : ''}></tds-body-cell>
              <tds-body-cell cell-value="Test value ${
                index % 2 === 0 ? '4' : '8'
              }" cell-key="mileage" disable-padding="${disablePadding}" ${
                cellTextAlignment ? `text-align="${cellTextAlignment}"` : ''
              } ${cellVerticalAlignment ? `vertical-align="${cellVerticalAlignment}"` : ''}></tds-body-cell>
            </tds-table-body-row>
          `,
            )
            .join('')}
        `
            : `
          <div slot="${emptyState}">
            ${renderEmptyStateSlot(emptyState)}
          </div>
        `
        }
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
`;

export const Default = BasicTemplate.bind({});
