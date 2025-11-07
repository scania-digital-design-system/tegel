import formatHtmlPreview from '../../../stories/formatHtmlPreview';

export default {
  title: 'Tegel Light (CSS)/Table/Custom Width',
  parameters: {
    docs: {
      description: {
        component:
          'Table with custom column widths. <br>⚠️ Note: Interactive effects like column hover highlighting require JavaScript for full functionality.',
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
    compactDesign: false,
    responsiveDesign: false,
    verticalDivider: true,
    noMinWidth: true,
    column1Width: '321px',
    column2Width: '400px',
    column3Width: '150px',
    column4Width: '110px',
  },
};

const BasicTemplate = ({
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
  const modeVariantClass =
    modeVariant !== 'Inherit from parent' ? `tl-table--${modeVariant.toLowerCase()}` : '';
  const verticalDividersClass = verticalDivider ? 'tl-table--vertical-dividers' : '';
  const responsiveClass = responsiveDesign ? 'tl-table--responsive' : '';
  const noMinWidthClass = noMinWidth ? 'tl-table--no-min-width' : '';
  const getColumnStyle = (width) => (width ? `style="min-width: ${width}"` : '');

  return formatHtmlPreview(`
    <!-- Required stylesheets:
      "@scania/tegel-light/global.css"
      "@scania/tegel-light/tl-table.css"
    -->
    <div style="overflow-x: auto; width: 100%;">
      <table class="tl-table ${compactClass} ${modeVariantClass} ${verticalDividersClass} ${responsiveClass} ${noMinWidthClass}">
      <thead class="tl-table__header">
        <tr class="tl-table__row">
          <th class="tl-table__header-cell" data-column="0" ${getColumnStyle(column1Width)}>Truck type</th>
          <th class="tl-table__header-cell" data-column="1" ${getColumnStyle(column2Width)}>Driver name</th>
          <th class="tl-table__header-cell" data-column="2" ${getColumnStyle(column3Width)}>Country</th>
          <th class="tl-table__header-cell" data-column="3" ${getColumnStyle(column4Width)}>Mileage</th>
        </tr>
      </thead>
      <tbody class="tl-table__body">
        <tr class="tl-table__row">
          <td class="tl-table__body-cell" data-column="0" ${getColumnStyle(column1Width)}>Test value 1</td>
          <td class="tl-table__body-cell" data-column="1" ${getColumnStyle(column2Width)}>Test value 2</td>
          <td class="tl-table__body-cell" data-column="2" ${getColumnStyle(column3Width)}>Test value 3</td>
          <td class="tl-table__body-cell" data-column="3" ${getColumnStyle(column4Width)}>Test value 4</td>
        </tr>
        <tr class="tl-table__row">
          <td class="tl-table__body-cell" data-column="0" ${getColumnStyle(column1Width)}>Test value 5</td>
          <td class="tl-table__body-cell" data-column="1" ${getColumnStyle(column2Width)}>Test value 6</td>
          <td class="tl-table__body-cell" data-column="2" ${getColumnStyle(column3Width)}>Test value 7</td>
          <td class="tl-table__body-cell" data-column="3" ${getColumnStyle(column4Width)}>Test value 8</td>
        </tr>
        <tr class="tl-table__row">
          <td class="tl-table__body-cell" data-column="0" ${getColumnStyle(column1Width)}>Test value 1</td>
          <td class="tl-table__body-cell" data-column="1" ${getColumnStyle(column2Width)}>Test value 2</td>
          <td class="tl-table__body-cell" data-column="2" ${getColumnStyle(column3Width)}>Test value 3</td>
          <td class="tl-table__body-cell" data-column="3" ${getColumnStyle(column4Width)}>Test value 4</td>
        </tr>
        <tr class="tl-table__row">
          <td class="tl-table__body-cell" data-column="0" ${getColumnStyle(column1Width)}>Test value 5</td>
          <td class="tl-table__body-cell" data-column="1" ${getColumnStyle(column2Width)}>Test value 6</td>
          <td class="tl-table__body-cell" data-column="2" ${getColumnStyle(column3Width)}>Test value 7</td>
          <td class="tl-table__body-cell" data-column="3" ${getColumnStyle(column4Width)}>Test value 8</td>
        </tr>
        <tr class="tl-table__row">
          <td class="tl-table__body-cell" data-column="0" ${getColumnStyle(column1Width)}>Test value 1</td>
          <td class="tl-table__body-cell" data-column="1" ${getColumnStyle(column2Width)}>Test value 2</td>
          <td class="tl-table__body-cell" data-column="2" ${getColumnStyle(column3Width)}>Test value 3</td>
          <td class="tl-table__body-cell" data-column="3" ${getColumnStyle(column4Width)}>Test value 4</td>
        </tr>
        <tr class="tl-table__row">
          <td class="tl-table__body-cell" data-column="0" ${getColumnStyle(column1Width)}>Test value 5</td>
          <td class="tl-table__body-cell" data-column="1" ${getColumnStyle(column2Width)}>Test value 6</td>
          <td class="tl-table__body-cell" data-column="2" ${getColumnStyle(column3Width)}>Test value 7</td>
          <td class="tl-table__body-cell" data-column="3" ${getColumnStyle(column4Width)}>Test value 8</td>
        </tr>
      </tbody>
    </table>
    </div>

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

export const Default = BasicTemplate.bind({});
