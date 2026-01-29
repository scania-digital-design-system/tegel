import formatHtmlPreview from '../../../stories/formatHtmlPreview';

export default {
  title: 'Tegel Lite (CSS)/Table/Column Filtering',
  parameters: {
    docs: {
      description: {
        component:
          'Table with column filtering inputs in header cells. ⚠️ Note: Interactive effects like column hover highlighting require JavaScript. Input fields allow text entry but do not filter table rows.',
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
    modeVariant: 'Primary',
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

const ColumnFilteringTemplate = ({
  modeVariant,
  compactDesign,
  responsiveDesign,
  verticalDivider,
  noMinWidth,
  column1Width,
  column2Width,
  column3Width,
  column4Width,
}) => {
  const compactClass = compactDesign ? 'tl-table--compact' : '';
  const modeVariantClass = `tl-table--${modeVariant.toLowerCase()}`;
  const verticalDividersClass = verticalDivider ? 'tl-table--vertical-dividers' : '';
  const responsiveClass = responsiveDesign ? 'tl-table--responsive' : '';
  const noMinWidthClass = noMinWidth ? 'tl-table--no-min-width' : '';

  // Inline styles for custom column widths
  const col1Style = column1Width ? `style="width: ${column1Width}"` : '';
  const col2Style = column2Width ? `style="width: ${column2Width}"` : '';
  const col3Style = column3Width ? `style="width: ${column3Width}"` : '';
  const col4Style = column4Width ? `style="width: ${column4Width}"` : '';

  return formatHtmlPreview(`
    <!-- Required stylesheets:
      "@scania/tegel-lite/global.css"
      "@scania/tegel-lite/tl-table.css"
      "@scania/tegel-lite/tl-text-field.css"
      "@scania/tegel-lite/tl-icon.css"
    -->
    <table class="tl-table ${compactClass} ${modeVariantClass} ${verticalDividersClass} ${responsiveClass} ${noMinWidthClass}">
      <thead class="tl-table__header">
        <tr class="tl-table__row">
          <th class="tl-table__header-cell" data-column="0" ${col1Style}>Truck type</th>
          <th class="tl-table__header-cell" data-column="1" ${col2Style}>Driver name</th>
          <th class="tl-table__header-cell" data-column="2" ${col3Style}>Country</th>
          <th class="tl-table__header-cell" data-column="3" ${col4Style}>Mileage</th>
        </tr>
        <tr class="tl-table__row">
          <th class="tl-table__header-cell" data-column="0" ${col1Style} style="padding: 0;">
            <div class="tl-table__header-input-wrapper">
              <span class="tl-icon tl-icon--search tl-icon--16" aria-hidden="true"></span>
              <input
                type="text"
                class="tl-table__header-input"
                placeholder="Search..."
              />
            </div>
          </th>
          <th class="tl-table__header-cell" data-column="1" ${col2Style} style="padding: 0;">
            <div class="tl-table__header-input-wrapper">
              <span class="tl-icon tl-icon--search tl-icon--16" aria-hidden="true"></span>
              <input
                type="text"
                class="tl-table__header-input"
                placeholder="Search..."
              />
            </div>
          </th>
          <th class="tl-table__header-cell" data-column="2" ${col3Style} style="padding: 0;">
            <div class="tl-table__header-input-wrapper">
              <span class="tl-icon tl-icon--search tl-icon--16" aria-hidden="true"></span>
              <input
                type="text"
                class="tl-table__header-input"
                placeholder="Search..."
              />
            </div>
          </th>
          <th class="tl-table__header-cell" data-column="3" ${col4Style} style="padding: 0;">
            <div class="tl-table__header-input-wrapper">
              <span class="tl-icon tl-icon--search tl-icon--16" aria-hidden="true"></span>
              <input
                type="text"
                class="tl-table__header-input"
                placeholder="Search..."
              />
            </div>
          </th>
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

    <!-- Script tag for demo purposes - Column hover highlighting requires JavaScript -->
    <script>
      (function() {
        const table = document.querySelector('.tl-table');
        if (!table) return;

        const headerCells = table.querySelectorAll('.tl-table__header-cell:not([style*="padding: 0"])');
        const bodyCells = table.querySelectorAll('.tl-table__body-cell');

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
      })();
    </script>
  `);
};

export const Default = ColumnFilteringTemplate.bind({});
