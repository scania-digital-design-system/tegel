import formatHtmlPreview from '../../../stories/formatHtmlPreview';

export default {
  title: 'Tegel Lite (Beta)/Table/Sorting',
  parameters: {
    docs: {
      description: {
        component:
          'Table with sortable columns. ⚠️ Note: Sorting functionality requires JavaScript for full functionality.',
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
    compactDesign: {
      name: 'Compact Design',
      description: 'Enables compact design of the Table, rows with less height.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
    responsiveDesign: {
      name: 'Responsive design',
      description:
        'Enables Table to take 100% of available width. For column values less than 192px, "No minimum width" has to be enabled too.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
    column1sortable: {
      name: 'Column 1 is sortable',
      description: 'Enables column 1 to be sorted alphabetically.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
    column2sortable: {
      name: 'Column 2 is sortable',
      description: 'Enables column 2 to be sorted alphabetically.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
    column3sortable: {
      name: 'Column 3 is sortable',
      description: 'Enables column 3 to be sorted alphabetically.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
    column4sortable: {
      name: 'Column 4 is sortable',
      description: 'Enables column 4 to be sorted alphabetically.',
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
    modeVariant: 'Primary',
    compactDesign: false,
    responsiveDesign: false,
    column1sortable: true,
    column2sortable: true,
    column3sortable: true,
    column4sortable: true,
    verticalDivider: false,
    noMinWidth: false,
    column1Width: '',
    column2Width: '',
    column3Width: '',
    column4Width: '',
  },
};

const SortingTemplate = ({
  modeVariant,
  compactDesign,
  responsiveDesign,
  column1sortable,
  column2sortable,
  column3sortable,
  column4sortable,
  verticalDivider,
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

  // Inline styles for custom column widths
  const col1Style = column1Width ? `style="min-width: ${column1Width}"` : '';
  const col2Style = column2Width ? `style="min-width: ${column2Width}"` : '';
  const col3Style = column3Width ? `style="min-width: ${column3Width}"` : '';
  const col4Style = column4Width ? `style="min-width: ${column4Width}"` : '';

  // Helper function to create header cell content
  const createHeaderCell = (text, sortable, columnIndex, colStyle, textAlign = 'left') => {
    if (sortable) {
      return `
        <th class="tl-table__header-cell tl-table__header-cell--sortable" data-column="${columnIndex}" data-sort-key="col${columnIndex}" ${colStyle}>
          <button class="tl-table__header-button">
            <span class="tl-table__header-button-text">${text}</span>
            <span class="tl-table__header-button-icon tl-icon tl-icon--sorting tl-icon--16" aria-hidden="true"></span>
          </button>
        </th>
      `;
    }
    return `
      <th class="tl-table__header-cell" data-column="${columnIndex}" ${colStyle} style="text-align: ${textAlign};">
        ${text}
      </th>
    `;
  };

  return formatHtmlPreview(`
    <!-- Required stylesheets:
      "@scania/tegel-lite/global.css"
      "@scania/tegel-lite/tl-table.css"
      "@scania/tegel-lite/tl-icon.css"
    -->
    <div class="${modeVariantClass}">
    <table class="tl-table ${compactClass} ${verticalDividersClass} ${responsiveClass} ${noMinWidthClass}">
      <caption class="tl-table__toolbar">
        <div class="tl-table__upper-bar-flex">
          <div class="tl-table__actionbar-left">
            <div class="tl-table__title">Sorting</div>
          </div>
        </div>
      </caption>
      <thead class="tl-table__header">
        <tr class="tl-table__row">
          ${createHeaderCell('Truck type', column1sortable, 0, col1Style)}
          ${createHeaderCell('Driver name', column2sortable, 1, col2Style)}
          ${createHeaderCell('Country', column3sortable, 2, col3Style)}
          ${createHeaderCell('Mileage', column4sortable, 3, col4Style, 'right')}
        </tr>
      </thead>
      <tbody class="tl-table__body">
        <tr class="tl-table__row" data-row="0">
          <td class="tl-table__body-cell" data-column="0">Test value 1</td>
          <td class="tl-table__body-cell" data-column="1">Test value 2</td>
          <td class="tl-table__body-cell" data-column="2">Test value 3</td>
          <td class="tl-table__body-cell" data-column="3">Test value 4</td>
        </tr>
        <tr class="tl-table__row" data-row="1">
          <td class="tl-table__body-cell" data-column="0">Test value 5</td>
          <td class="tl-table__body-cell" data-column="1">Test value 6</td>
          <td class="tl-table__body-cell" data-column="2">Test value 7</td>
          <td class="tl-table__body-cell" data-column="3">Test value 8</td>
        </tr>
        <tr class="tl-table__row" data-row="2">
          <td class="tl-table__body-cell" data-column="0">Test value 1</td>
          <td class="tl-table__body-cell" data-column="1">Test value 2</td>
          <td class="tl-table__body-cell" data-column="2">Test value 3</td>
          <td class="tl-table__body-cell" data-column="3">Test value 4</td>
        </tr>
        <tr class="tl-table__row" data-row="3">
          <td class="tl-table__body-cell" data-column="0">Test value 5</td>
          <td class="tl-table__body-cell" data-column="1">Test value 6</td>
          <td class="tl-table__body-cell" data-column="2">Test value 7</td>
          <td class="tl-table__body-cell" data-column="3">Test value 8</td>
        </tr>
        <tr class="tl-table__row" data-row="4">
          <td class="tl-table__body-cell" data-column="0">Test value 1</td>
          <td class="tl-table__body-cell" data-column="1">Test value 2</td>
          <td class="tl-table__body-cell" data-column="2">Test value 3</td>
          <td class="tl-table__body-cell" data-column="3">Test value 4</td>
        </tr>
        <tr class="tl-table__row" data-row="5">
          <td class="tl-table__body-cell" data-column="0">Test value 5</td>
          <td class="tl-table__body-cell" data-column="1">Test value 6</td>
          <td class="tl-table__body-cell" data-column="2">Test value 7</td>
          <td class="tl-table__body-cell" data-column="3">Test value 8</td>
        </tr>
      </tbody>
    </table>

    <!-- Script tag for demo purposes - Sort button visual state and column hover highlighting require JavaScript -->
    <script>
      (function() {
        const table = document.querySelector('.tl-table');
        if (!table) return;

        const headerCells = table.querySelectorAll('.tl-table__header-cell');
        const bodyCells = table.querySelectorAll('.tl-table__body-cell');
        const sortButtons = table.querySelectorAll('.tl-table__header-button');

        // Column hover highlighting
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

        // Sort button visual state (arrows only, no actual sorting)
        sortButtons.forEach(button => {
          const headerCell = button.closest('.tl-table__header-cell');
          let sortDirection = null; // null, 'asc', or 'desc'

          button.addEventListener('click', () => {
            // Reset all other sorted columns
            table.querySelectorAll('.tl-table__header-cell--is-sorted').forEach(cell => {
              if (cell !== headerCell) {
                cell.classList.remove('tl-table__header-cell--is-sorted');
                const otherButton = cell.querySelector('.tl-table__header-button');
                const otherIcon = otherButton.querySelector('.tl-table__header-button-icon');
                otherIcon.className = 'tl-table__header-button-icon tl-icon tl-icon--sorting tl-icon--16';
                otherIcon.setAttribute('aria-hidden', 'true');
              }
            });

            // Toggle sort direction
            if (sortDirection === null || sortDirection === 'desc') {
              sortDirection = 'asc';
            } else {
              sortDirection = 'desc';
            }

            // Update UI
            headerCell.classList.toggle('tl-table__header-cell--is-sorted', sortDirection !== null);
            const icon = button.querySelector('.tl-table__header-button-icon');
            
            if (sortDirection === 'asc') {
              icon.className = 'tl-table__header-button-icon tl-table__header-button-icon--rotate tl-icon tl-icon--arrow_down tl-icon--16';
            } else if (sortDirection === 'desc') {
              icon.className = 'tl-table__header-button-icon tl-icon tl-icon--arrow_down tl-icon--16';
            } else {
              icon.className = 'tl-table__header-button-icon tl-icon tl-icon--sorting tl-icon--16';
            }
            icon.setAttribute('aria-hidden', 'true');
          });
        });
      })();
    </script>
    </div>
  `);
};

export const Default = SortingTemplate.bind({});
