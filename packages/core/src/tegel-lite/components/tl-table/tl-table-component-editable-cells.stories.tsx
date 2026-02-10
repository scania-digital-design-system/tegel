import formatHtmlPreview from '../../../stories/formatHtmlPreview';

export default {
  title: 'Tegel Lite (Beta)/Table/Editable Cells',
  parameters: {
    docs: {
      description: {
        component:
          'Table with editable cells containing input fields. ⚠️ Note: Column hover highlighting requires JavaScript for full functionality.',
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
      options: ['Primary', 'Secondary'],
      table: {
        defaultValue: { summary: 'Primary' },
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
    modeVariant: 'Primary',
    headerTextAlignment: 'left',
    cellTextAlignment: 'left',
    compactDesign: false,
    responsiveDesign: false,
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
}) => {
  const compactClass = compactDesign ? 'tl-table--compact' : '';
  const modeVariantClass = `tl-mode-variant-${modeVariant.toLowerCase()}`;
  const verticalDividersClass = verticalDivider ? 'tl-table--vertical-dividers' : '';
  const responsiveClass = responsiveDesign ? 'tl-table--responsive' : '';
  const noMinWidthClass = noMinWidth ? 'tl-table--no-min-width' : '';
  const disableHeaderPaddingClass = disableHeaderPadding ? 'tl-table--no-header-padding' : '';
  const disablePaddingClass = 'tl-table--no-padding';
  const horizontalScrollClass = horizontalScrollWidth ? 'tl-table--horizontal-scroll' : '';
  const headerTextAlignClass =
    headerTextAlignment !== 'left' ? `tl-table--header-text-align-${headerTextAlignment}` : '';
  const cellTextAlignClass =
    cellTextAlignment !== 'left' ? `tl-table--cell-text-align-${cellTextAlignment}` : '';

  // Inline styles for custom column widths
  const col1Style = column1Width ? `style="min-width: ${column1Width}"` : '';
  const col2Style = column2Width ? `style="min-width: ${column2Width}"` : '';
  const col3Style = column3Width ? `style="min-width: ${column3Width}"` : '';
  const col4Style = column4Width ? `style="min-width: ${column4Width}"` : '';

  const horizontalScrollStyle = horizontalScrollWidth
    ? `style="width: ${horizontalScrollWidth};"`
    : '';

  // Helper function to create editable cell
  const createEditableCell = (inputId, value, columnIndex, colStyle, disabled = false) => {
    const cellStyle = colStyle || '';
    const iconClass = disabled ? 'tl-icon--edit_inactive' : 'tl-icon--edit';
    const textFieldDisabledClass = disabled ? 'tl-text-field--disabled' : '';
    const textFieldSizeClass = compactDesign ? 'tl-text-field--sm' : 'tl-text-field--md';
    const iconSizeClass = compactDesign ? 'tl-icon--16' : 'tl-icon--20';
    return `
      <td class="tl-table__body-cell" data-column="${columnIndex}" ${cellStyle}>
        <div class="tl-text-field ${textFieldSizeClass} tl-text-field--no-min-width ${textFieldDisabledClass}">
          <input id="${inputId}" class="tl-text-field__input" type="text" value="${value}" ${
      disabled ? 'disabled' : ''
    } />
          <span class="tl-icon ${iconClass} ${iconSizeClass} tl-text-field__suffix--icon" aria-hidden="true"></span>
        </div>
      </td>
    `;
  };

  return formatHtmlPreview(`
    <!-- Required stylesheets:
      "@scania/tegel-lite/global.css"
      "@scania/tegel-lite/tl-table.css"
      "@scania/tegel-lite/tl-text-field.css"
      "@scania/tegel-lite/tl-icon.css"
    -->
    <div class="${modeVariantClass}">
    ${horizontalScrollWidth ? `<div ${horizontalScrollStyle}>` : ''}
    <table class="tl-table ${compactClass} ${verticalDividersClass} ${responsiveClass} ${noMinWidthClass} ${disableHeaderPaddingClass} ${disablePaddingClass} ${horizontalScrollClass} ${headerTextAlignClass} ${cellTextAlignClass}">
      <thead class="tl-table__header">
        <tr class="tl-table__row">
          <th class="tl-table__header-cell" data-column="0" ${col1Style}>Truck type</th>
          <th class="tl-table__header-cell" data-column="1" ${col2Style}>Driver name</th>
          <th class="tl-table__header-cell" data-column="2" ${col3Style}>Country</th>
          <th class="tl-table__header-cell" data-column="3" ${col4Style}>Mileage</th>
        </tr>
      </thead>
      <tbody class="tl-table__body">
        <tr class="tl-table__row" data-row="0">
          ${createEditableCell('truck-input-1', 'Test value 1', 0, col1Style, false)}
          ${createEditableCell('driver-input-1', 'Test value 2', 1, col2Style, false)}
          ${createEditableCell('country-input-1', 'Test value 3', 2, col3Style, false)}
          ${createEditableCell('mileage-input-1', 'Test value 4', 3, col4Style, false)}
        </tr>
        <tr class="tl-table__row" data-row="1">
          ${createEditableCell('truck-input-2', 'Test value 5', 0, col1Style, false)}
          ${createEditableCell('driver-input-2', 'Test value 6', 1, col2Style, false)}
          ${createEditableCell('country-input-2', 'Test value 7', 2, col3Style, false)}
          ${createEditableCell('mileage-input-2', 'Test value 8', 3, col4Style, false)}
        </tr>
        <tr class="tl-table__row" data-row="2">
          ${createEditableCell('truck-input-3', 'Test value 1', 0, col1Style, true)}
          ${createEditableCell('driver-input-3', 'Test value 2', 1, col2Style, false)}
          ${createEditableCell('country-input-3', 'Test value 3', 2, col3Style, false)}
          ${createEditableCell('mileage-input-3', 'Test value 4', 3, col4Style, false)}
        </tr>
        <tr class="tl-table__row" data-row="3">
          ${createEditableCell('truck-input-4', 'Test value 5', 0, col1Style, false)}
          ${createEditableCell('driver-input-4', 'Test value 6', 1, col2Style, false)}
          ${createEditableCell('country-input-4', 'Test value 7', 2, col3Style, false)}
          ${createEditableCell('mileage-input-4', 'Test value 8', 3, col4Style, false)}
        </tr>
        <tr class="tl-table__row" data-row="4">
          ${createEditableCell('truck-input-5', 'Test value 1', 0, col1Style, false)}
          ${createEditableCell('driver-input-5', 'Test value 2', 1, col2Style, false)}
          ${createEditableCell('country-input-5', 'Test value 3', 2, col3Style, false)}
          ${createEditableCell('mileage-input-5', 'Test value 4', 3, col4Style, false)}
        </tr>
        <tr class="tl-table__row" data-row="5">
          ${createEditableCell('truck-input-6', 'Test value 5', 0, col1Style, false)}
          ${createEditableCell('driver-input-6', 'Test value 6', 1, col2Style, false)}
          ${createEditableCell('country-input-6', 'Test value 7', 2, col3Style, false)}
          ${createEditableCell('mileage-input-6', 'Test value 8', 3, col4Style, false)}
        </tr>
      </tbody>
    </table>
    ${horizontalScrollWidth ? '</div>' : ''}

    <!-- Script tag for demo purposes - Column hover highlighting requires JavaScript -->
    <script>
      (function() {
        const table = document.querySelector('.tl-table');
        if (!table) return;

        const headerCells = table.querySelectorAll('.tl-table__header-cell');
        const bodyCells = table.querySelectorAll('.tl-table__body-cell');

        headerCells.forEach(headerCell => {
          const columnIndex = headerCell.getAttribute('data-column');
          
          headerCell.addEventListener('mouseenter', () => {
            bodyCells.forEach(cell => {
              if (cell.getAttribute('data-column') === columnIndex) {
                cell.classList.add('tl-table__body-cell--column-highlight');
              }
            });
          });

          headerCell.addEventListener('mouseleave', () => {
            bodyCells.forEach(cell => {
              cell.classList.remove('tl-table__body-cell--column-highlight');
            });
          });
        });
      })();
    </script>
    </div>
  `);
};

export const Default = EditableCellsTemplate.bind({});
