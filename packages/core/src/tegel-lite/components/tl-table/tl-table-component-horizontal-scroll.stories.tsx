import formatHtmlPreview from '../../../stories/formatHtmlPreview';

export default {
  title: 'Tegel Lite (Beta)/Table/Horizontal Scroll',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Table with horizontal scrolling. ⚠️ Note: Interactive effects like column hover highlighting require JavaScript for full functionality.',
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
    horizontalScrollWidth: {
      name: 'Horizontal scroll table width',
      description:
        'Sets the table width to enable horizontal scrolling. Enter a number (e.g., 300) or a value with unit (e.g., 300px).',
      control: {
        type: 'text',
      },
      table: {
        defaultValue: { summary: '500' },
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
    horizontalScrollWidth: '500',
    column1Width: '',
    column2Width: '',
    column3Width: '',
    column4Width: '',
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
}) => {
  const compactClass = compactDesign ? 'tl-table--compact' : '';
  const modeVariantClass = `tl-mode-variant-${modeVariant.toLowerCase()}`;
  const verticalDividersClass = verticalDivider ? 'tl-table--vertical-dividers' : '';
  const responsiveClass = responsiveDesign ? 'tl-table--responsive' : '';
  const noMinWidthClass = noMinWidth ? 'tl-table--no-min-width' : '';
  const horizontalScrollClass = horizontalScrollWidth ? 'tl-table--horizontal-scroll' : '';

  // Auto-append 'px' if only a number is provided
  const getHorizontalScrollWidth = (width) => {
    if (!width) return '';
    // Check if it's just a number (with optional whitespace)
    const trimmed = width.trim();
    if (/^\d+$/.test(trimmed)) {
      return `${trimmed}px`;
    }
    return trimmed;
  };

  const horizontalScrollStyle = horizontalScrollWidth
    ? `style="width: ${getHorizontalScrollWidth(horizontalScrollWidth)};"`
    : '';

  const col1Style = column1Width ? `style="min-width: ${column1Width}"` : '';
  const col2Style = column2Width ? `style="min-width: ${column2Width}"` : '';
  const col3Style = column3Width ? `style="min-width: ${column3Width}"` : '';
  const col4Style = column4Width ? `style="min-width: ${column4Width}"` : '';

  return formatHtmlPreview(`
    <!-- Required stylesheets:
      "@scania/tegel-lite/global.css"
      "@scania/tegel-lite/tl-table.css"
    -->
    <div class="${modeVariantClass}">
    <table class="tl-table ${compactClass} ${verticalDividersClass} ${responsiveClass} ${noMinWidthClass} ${horizontalScrollClass}" ${horizontalScrollStyle}>
      <thead class="tl-table__header">
        <tr class="tl-table__row">
          <th class="tl-table__header-cell" data-column="0" ${col1Style}>Truck type</th>
          <th class="tl-table__header-cell" data-column="1" ${col2Style}>Driver name</th>
          <th class="tl-table__header-cell" data-column="2" ${col3Style}>Country</th>
          <th class="tl-table__header-cell" data-column="3" ${col4Style}>Mileage</th>
        </tr>
      </thead>
      <tbody class="tl-table__body">
        <tr class="tl-table__row">
          <td class="tl-table__body-cell" data-column="0">Test value 1</td>
          <td class="tl-table__body-cell" data-column="1">Test value 2</td>
          <td class="tl-table__body-cell" data-column="2">Test value 3</td>
          <td class="tl-table__body-cell" data-column="3">Test value 4</td>
        </tr>
        <tr class="tl-table__row">
          <td class="tl-table__body-cell" data-column="0">Test value 5</td>
          <td class="tl-table__body-cell" data-column="1">Test value 6</td>
          <td class="tl-table__body-cell" data-column="2">Test value 7</td>
        <td class="tl-table__body-cell" data-column="3">Test value 8</td>
        </tr>
        <tr class="tl-table__row">
          <td class="tl-table__body-cell" data-column="0">Test value 1</td>
          <td class="tl-table__body-cell" data-column="1">Test value 2</td>
          <td class="tl-table__body-cell" data-column="2">Test value 3</td>
          <td class="tl-table__body-cell" data-column="3">Test value 4</td>
        </tr>
        <tr class="tl-table__row">
          <td class="tl-table__body-cell" data-column="0">Test value 5</td>
          <td class="tl-table__body-cell" data-column="1">Test value 6</td>
          <td class="tl-table__body-cell" data-column="2">Test value 7</td>
          <td class="tl-table__body-cell" data-column="3">Test value 8</td>
        </tr>
        <tr class="tl-table__row">
          <td class="tl-table__body-cell" data-column="0">Test value 1</td>
          <td class="tl-table__body-cell" data-column="1">Test value 2</td>
          <td class="tl-table__body-cell" data-column="2">Test value 3</td>
          <td class="tl-table__body-cell" data-column="3">Test value 4</td>
        </tr>
        <tr class="tl-table__row">
          <td class="tl-table__body-cell" data-column="0">Test value 5</td>
          <td class="tl-table__body-cell" data-column="1">Test value 6</td>
          <td class="tl-table__body-cell" data-column="2">Test value 7</td>
          <td class="tl-table__body-cell" data-column="3">Test value 8</td>
        </tr>
      </tbody>
    </table>

    <!-- Script for column hover highlighting -->
    <script>
      (function() {
        const table = document.querySelector('.tl-table');
        if (!table) return;

        // Column hover highlighting
        const headerCells = table.querySelectorAll('.tl-table__header-cell');
        const bodyCells = table.querySelectorAll('.tl-table__body-cell');

        headerCells.forEach(headerCell => {
          const columnIndex = headerCell.getAttribute('data-column');
          
          if (columnIndex === null) return;
          
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

export const Default = HorizontalScrollTemplate.bind({});
