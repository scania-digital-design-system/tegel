import formatHtmlPreview from '../../../stories/formatHtmlPreview';

export default {
  title: 'Tegel Lite/Table/Expandable Rows',
  parameters: {
    docs: {
      description: {
        component:
          'Table with expandable rows. ⚠️ Note: Expand/collapse functionality requires JavaScript. Click the expand button to show/hide row content. ⚠️ Note 2: Interactive effects like column hover highlighting require JavaScript for full functionality.',
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
  },
  args: {
    modeVariant: 'Primary',
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
}) => {
  const compactClass = compactDesign ? 'tl-table--compact' : '';
  const modeVariantClass = `tl-table--${modeVariant.toLowerCase()}`;
  const verticalDividersClass = verticalDivider ? 'tl-table--vertical-dividers' : '';
  const responsiveClass = responsiveDesign ? 'tl-table--responsive' : '';
  const noMinWidthClass = noMinWidth ? 'tl-table--no-min-width' : '';

  const col1Style = column1Width ? `style="min-width: ${column1Width}"` : '';
  const col2Style = column2Width ? `style="min-width: ${column2Width}"` : '';
  const col3Style = column3Width ? `style="min-width: ${column3Width}"` : '';
  const col4Style = column4Width ? `style="min-width: ${column4Width}"` : '';

  const overflowClass =
    overflow === 'hidden'
      ? 'tl-table__expand-row-cell--overflow-hidden'
      : overflow === 'visible'
        ? 'tl-table__expand-row-cell--overflow-visible'
        : '';

  const expandedClass = expanded ? 'tl-table__row--expanded' : '';

  return formatHtmlPreview(`
    <!-- Required stylesheets:
      "@scania/tegel-lite/global.css"
      "@scania/tegel-lite/tl-table.css"
    -->
    <!-- Optional stylesheet:
      "@scania/tegel-lite/tl-button.css"
    -->
    <table class="tl-table ${compactClass} ${modeVariantClass} ${verticalDividersClass} ${responsiveClass} ${noMinWidthClass}">
      <thead class="tl-table__header">
        <tr class="tl-table__row">
          <th class="tl-table__header-cell tl-table__header-cell--expand"></th>
          <th class="tl-table__header-cell" data-column="0" ${col1Style}>Truck type</th>
          <th class="tl-table__header-cell" data-column="1" ${col2Style}>Driver name</th>
          <th class="tl-table__header-cell" data-column="2" ${col3Style}>Country</th>
          <th class="tl-table__header-cell" data-column="3" ${col4Style} style="text-align: right;">Mileage</th>
        </tr>
      </thead>
      <tbody class="tl-table__body">
        <tr class="tl-table__row ${expandedClass}" data-row-id="1">
          <td class="tl-table__body-cell">
              <button type="button" class="tl-table__expand-control" onclick="toggleExpandState(event)" 
               aria-expanded="${expanded}" aria-controls="expandable-content-1" data-row-id="1" >
              <span class="tl-icon tl-icon--chevron_down tl-icon--16 tl-table__expand-icon"></span>
              </button>
          </td>
          <td class="tl-table__body-cell" data-column="0">Test value 1</td>
          <td class="tl-table__body-cell" data-column="1">Test value 2</td>
          <td class="tl-table__body-cell" data-column="2">Test value 3</td>
          <td class="tl-table__body-cell" data-column="3" style="text-align: right;">Test value 4</td>
        </tr>
        <tr class="tl-table__expand-row ${
          expanded ? 'tl-table__expand-row--expanded' : ''
        }" id="expandable-content-1" data-row-id="1">
          <td class="tl-table__expand-row-cell ${overflowClass}" colspan="5">Hello world 1</td>
        </tr>
        <tr class="tl-table__row ${expandedClass}" data-row-id="2">
          <td class="tl-table__body-cell">
           <button type="button" class="tl-table__expand-control" onclick="toggleExpandState(event)" 
               aria-expanded="${expanded}" aria-controls="expandable-content-2" data-row-id="2" >
              <span class="tl-icon tl-icon--chevron_down tl-icon--16 tl-table__expand-icon"></span>
              </button>
          </td>
          <td class="tl-table__body-cell" data-column="0">Test value 5</td>
          <td class="tl-table__body-cell" data-column="1">Test value 6</td>
          <td class="tl-table__body-cell" data-column="2">Test value 7</td>
          <td class="tl-table__body-cell" data-column="3" style="text-align: right;">Test value 8</td>
        </tr>
        <tr class="tl-table__expand-row  ${
          expanded ? 'tl-table__expand-row--expanded' : ''
        }" id="expandable-content-2" data-row-id="2">
          <td class="tl-table__expand-row-cell ${overflowClass}" colspan="5">Hello to you too</td>
        </tr>
        <tr class="tl-table__row ${expandedClass}" data-row-id="3">
          <td class="tl-table__body-cell">
            <button type="button" class="tl-table__expand-control" onclick="toggleExpandState(event)" 
               aria-expanded="${expanded}" aria-controls="expandable-content-3" data-row-id="3" >
              <span class="tl-icon tl-icon--chevron_down tl-icon--16 tl-table__expand-icon"></span>
              </button>
          </td>
          <td class="tl-table__body-cell" data-column="0">Test value 9</td>
          <td class="tl-table__body-cell" data-column="1">Test value 10</td>
          <td class="tl-table__body-cell" data-column="2">Test value 11</td>
          <td class="tl-table__body-cell" data-column="3" style="text-align: right;">Test value 12</td>
        </tr>
        <tr class="tl-table__expand-row  ${
          expanded ? 'tl-table__expand-row--expanded' : ''
        }" id="expandable-content-3" data-row-id="3">
          <td class="tl-table__expand-row-cell ${overflowClass}" colspan="5">
            <button class="tl-button tl-button--primary tl-button--sm">Call to action</button>
          </td>
        </tr>
        <tr class="tl-table__row ${expandedClass}" data-row-id="4">
          <td class="tl-table__body-cell">
           <button type="button" class="tl-table__expand-control" onclick="toggleExpandState(event)" 
               aria-expanded="${expanded}" aria-controls="expandable-content-4" data-row-id="4" >
              <span class="tl-icon tl-icon--chevron_down tl-icon--16 tl-table__expand-icon"></span>
              </button>
          </td>
          <td class="tl-table__body-cell" data-column="0">Demo overflow 1</td>
          <td class="tl-table__body-cell" data-column="1">Demo overflow 2</td>
          <td class="tl-table__body-cell" data-column="2">Demo overflow 3</td>
          <td class="tl-table__body-cell" data-column="3" style="text-align: right;">Demo overflow 4</td>
        </tr>
        <tr class="tl-table__expand-row ${
          expanded ? 'tl-table__expand-row--expanded' : ''
        }" id="expandable-content-4" data-row-id="4">
          <td class="tl-table__expand-row-cell ${overflowClass}" colspan="5">
            <!-- Demo block: Overflow solution for Expanded Rows (Not Recommended). -->
            <div style="background: linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet); width: 900px; height: 100px; color: white; text-shadow: 1px 1px 2px black;">
              This is an example of a long sentence that demonstrates how content can overflow the boundaries of its container, especially when the container has a fixed width and the content is too large to fit within it.
            </div>
            <!-- end of demo block -->
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Script for expandable row functionality and column hover highlighting -->
    <script>
      (function() {
        const table = document.querySelector('.tl-table');
        if (!table) return;

        // Column hover highlighting
        const headerCells = table.querySelectorAll('.tl-table__header-cell');
        const bodyCells = table.querySelectorAll('.tl-table__body-cell');

        headerCells.forEach(headerCell => {
          const columnIndex = headerCell.getAttribute('data-column');
          
          // Skip the expand column (no data-column attribute) - no hover effect for expand column
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

      function toggleExpandState(event) {
        const button = event.target.closest("button");
        console.log("button", button);

        const ariaControls = button.getAttribute("aria-controls");
        console.log("aria-controls", ariaControls);

        const controlRow = button.closest(".tl-table__row");
        const expandable = document.getElementById(ariaControls);
        console.log("expandable", expandable);

        const expanded = controlRow.classList.toggle("tl-table__row--expanded");

        if (expanded) {
          expandable.classList.add("tl-table__expand-row--expanded");
        } else {
          expandable.classList.remove("tl-table__expand-row--expanded");
        }
      }
    </script>
  `);
};

export const Default = ExpandableRowTemplate.bind({});
