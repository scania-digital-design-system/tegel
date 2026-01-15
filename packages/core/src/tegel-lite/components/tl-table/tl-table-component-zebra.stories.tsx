import formatHtmlPreview from '../../../stories/formatHtmlPreview';

export default {
  title: 'Tegel Lite (CSS)/Table/Zebra',
  parameters: {
    docs: {
      description: {
        component:
          'Zebra table component with alternating row/column patterns. <br> ⚠️ Note: Interactive effects like column hover highlighting require JavaScript for full functionality.',
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
    zebraMode: {
      name: 'Zebra mode',
      description: 'Enables zebra striping for rows or columns.',
      control: {
        type: 'radio',
      },
      options: ['rows-odd', 'rows-even', 'columns-odd', 'columns-even'],
      table: {
        defaultValue: { summary: 'rows-odd' },
      },
    },
    compact: {
      name: 'Compact design',
      description: 'Enables compact table styling with reduced padding.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
    verticalDividers: {
      name: 'Vertical dividers',
      description: 'Shows vertical dividers between columns.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
    responsive: {
      name: 'Responsive',
      description: 'Makes table take full width.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
    headerTextAlign: {
      name: 'Header text alignment',
      description: 'Sets text alignment for header cells only.',
      control: {
        type: 'select',
      },
      options: ['none', 'left', 'start', 'center', 'right', 'end'],
      table: {
        defaultValue: { summary: 'none' },
      },
    },
    cellTextAlign: {
      name: 'Cell text alignment',
      description: 'Sets text alignment for body cells only.',
      control: {
        type: 'select',
      },
      options: ['none', 'left', 'start', 'center', 'right', 'end'],
      table: {
        defaultValue: { summary: 'none' },
      },
    },
    clickable: {
      name: 'Clickable',
      description: 'Makes table rows clickable with pointer cursor.',
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
        'Resets min-width rule and enables setting column width value to less than 192px which is the default.',
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
    horizontalScrollWidth: {
      name: 'Horizontal scrolling table width',
      description:
        'Used to set the boundary width of horizontal scrolling. When set, the table will have a fixed width and enable horizontal scrolling.',
      control: {
        type: 'text',
      },
      table: {
        defaultValue: { summary: 'none' },
      },
    },
  },
  args: {
    modeVariant: 'Inherit from parent',
    zebraMode: 'rows-odd',
    compact: false,
    verticalDividers: false,
    responsive: false,
    headerTextAlign: 'none',
    cellTextAlign: 'none',
    clickable: false,
    noMinWidth: false,
    disablePadding: false,
    disableHeaderPadding: false,
    horizontalScrollWidth: '',
  },
};

const Template = ({
  compact,
  modeVariant,
  verticalDividers,
  zebraMode,
  responsive,
  headerTextAlign,
  cellTextAlign,
  clickable,
  noMinWidth,
  disablePadding,
  disableHeaderPadding,
  horizontalScrollWidth,
}) => {
  const compactClass = compact ? 'tl-table--compact' : '';
  const modeVariantClass =
    modeVariant !== 'Inherit from parent' ? `tl-table--${modeVariant.toLowerCase()}` : '';
  const verticalDividersClass = verticalDividers ? 'tl-table--vertical-dividers' : '';
  const zebraClass = `tl-table--zebra-${zebraMode}`;
  const responsiveClass = responsive ? 'tl-table--responsive' : '';
  const headerTextAlignClass =
    headerTextAlign !== 'none' ? `tl-table--header-text-align-${headerTextAlign}` : '';
  const cellTextAlignClass =
    cellTextAlign !== 'none' ? `tl-table--cell-text-align-${cellTextAlign}` : '';
  const clickableClass = clickable ? 'tl-table--clickable' : '';
  const noMinWidthClass = noMinWidth ? 'tl-table--no-min-width' : '';
  const disablePaddingClass = disablePadding ? 'tl-table--no-padding' : '';
  const disableHeaderPaddingClass = disableHeaderPadding ? 'tl-table--no-header-padding' : '';
  const horizontalScrollClass = horizontalScrollWidth ? 'tl-table--horizontal-scroll' : '';

  // Create inline style for horizontal scroll width
  const horizontalScrollStyle = horizontalScrollWidth
    ? `style="width: ${horizontalScrollWidth}px;"`
    : '';

  return formatHtmlPreview(`
    <!-- Required stylesheet 
      "@scania/tegel-lite/global.css"
      "@scania/tegel-lite/tl-table.css"
    -->
    <table class="tl-table ${compactClass} ${modeVariantClass} ${verticalDividersClass} ${zebraClass} ${responsiveClass} ${headerTextAlignClass} ${cellTextAlignClass} ${clickableClass} ${noMinWidthClass} ${disablePaddingClass} ${disableHeaderPaddingClass} ${horizontalScrollClass}" ${horizontalScrollStyle}>
        <thead class="tl-table__header">
          <tr class="tl-table__row">
            <th class="tl-table__header-cell" data-column="0">Truck type</th>
            <th class="tl-table__header-cell" data-column="1">Driver name</th>
            <th class="tl-table__header-cell" data-column="2">Country</th>
            <th class="tl-table__header-cell" data-column="3">Mileage</th>
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
  `);
};

export const Default = Template.bind({});
