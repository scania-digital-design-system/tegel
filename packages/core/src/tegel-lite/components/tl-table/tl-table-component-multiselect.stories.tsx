import formatHtmlPreview from '../../../stories/formatHtmlPreview';

export default {
  title: 'Tegel Lite (CSS)/Table/Multiselect',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Multiselect table component with checkbox selection. <br> ⚠️ Note: Interactive effects like column hover highlighting and multiselect functionality require JavaScript for full functionality.',
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
    responsive: {
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
    verticalDividers: {
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
    allDisabled: false,
    compactDesign: false,
    responsive: false,
    verticalDividers: false,
    noMinWidth: false,
    column1Width: '',
    column2Width: '',
    column3Width: '',
    column4Width: '',
  },
};

const MultiselectTemplate = ({
  modeVariant,
  allSelected,
  allIndeterminate,
  allDisabled,
  compactDesign,
  responsive,
  verticalDividers,
  noMinWidth,
  column1Width,
  column2Width,
  column3Width,
  column4Width,
}) =>
  formatHtmlPreview(`
    <!-- Required stylesheets: 
    "@scania/tegel-lite/tl-global.css"
    "@scania/tegel-lite/tl-table.css"
    "@scania/tegel-lite/tl-checkbox.css"
    -->
    
    
    <table class="tl-table ${compactDesign ? 'tl-table--compact' : ''} ${
    responsive ? 'tl-table--responsive' : ''
  } ${verticalDividers ? 'tl-table--vertical-dividers' : ''} ${
    noMinWidth ? 'tl-table--no-min-width' : ''
  } ${modeVariant !== 'Inherit from parent' ? `tl-table--${modeVariant.toLowerCase()}` : ''}">
      <thead class="tl-table__header">
        <tr class="tl-table__row">
          <th class="tl-table__header-cell tl-table__header-cell--checkbox" data-column="0">
            <div class="tl-checkbox">
              <input type="checkbox" class="tl-checkbox__input ${
                allIndeterminate ? 'tl-checkbox__input--indeterminate' : ''
              }" ${allSelected ? 'checked' : ''} ${allDisabled ? 'disabled' : ''} />
            </div>
          </th>
          <th class="tl-table__header-cell" data-column="1" ${
            column1Width ? `style="width: ${column1Width}"` : ''
          }>Truck type</th>
          <th class="tl-table__header-cell" data-column="2" ${
            column2Width ? `style="width: ${column2Width}"` : ''
          }>Driver name</th>
          <th class="tl-table__header-cell" data-column="3" ${
            column3Width ? `style="width: ${column3Width}"` : ''
          }>Country</th>
          <th class="tl-table__header-cell" data-column="4" ${
            column4Width ? `style="width: ${column4Width}"` : ''
          }>Mileage</th>
        </tr>
      </thead>
      <tbody class="tl-table__body">
        <tr class="tl-table__row">
          <td class="tl-table__body-cell tl-table__body-cell--checkbox" data-column="0">
            <div class="tl-checkbox">
              <input type="checkbox" class="tl-checkbox__input" />
            </div>
          </td>
          <td class="tl-table__body-cell" data-column="1">L-series</td>
          <td class="tl-table__body-cell" data-column="2">Sonya Bruce</td>
          <td class="tl-table__body-cell" data-column="3">Brazil</td>
          <td class="tl-table__body-cell" data-column="4">123987</td>
        </tr>
        <tr class="tl-table__row">
          <td class="tl-table__body-cell tl-table__body-cell--checkbox" data-column="0">
            <div class="tl-checkbox">
              <input type="checkbox" class="tl-checkbox__input" />
            </div>
          </td>
          <td class="tl-table__body-cell" data-column="1">P-series</td>
          <td class="tl-table__body-cell" data-column="2">Guerra Bowman</td>
          <td class="tl-table__body-cell" data-column="3">Sweden</td>
          <td class="tl-table__body-cell" data-column="4">2000852</td>
        </tr>
        <tr class="tl-table__row">
          <td class="tl-table__body-cell tl-table__body-cell--checkbox" data-column="0">
            <div class="tl-checkbox">
              <input type="checkbox" class="tl-checkbox__input" />
            </div>
          </td>
          <td class="tl-table__body-cell" data-column="1">G-series</td>
          <td class="tl-table__body-cell" data-column="2">Ferrell Wallace</td>
          <td class="tl-table__body-cell" data-column="3">Germany</td>
          <td class="tl-table__body-cell" data-column="4">564</td>
        </tr>
        <tr class="tl-table__row">
          <td class="tl-table__body-cell tl-table__body-cell--checkbox" data-column="0">
            <div class="tl-checkbox">
              <input type="checkbox" class="tl-checkbox__input" />
            </div>
          </td>
          <td class="tl-table__body-cell" data-column="1">R-series</td>
          <td class="tl-table__body-cell" data-column="2">Cox Burris</td>
          <td class="tl-table__body-cell" data-column="3">Spain</td>
          <td class="tl-table__body-cell" data-column="4">1789357</td>
        </tr>
      </tbody>
    </table>

    <!-- Script tag for demo purposes - Multiselect functionality and column hover highlighting require JavaScript -->
    <script>
    function setupMultiselectDemo() {
      const table = document.querySelector('.tl-table');
      const headerCheckbox = table.querySelector('thead .tl-checkbox__input');
      const rowCheckboxes = table.querySelectorAll('tbody .tl-checkbox__input');
      
      // Header checkbox functionality
      headerCheckbox.addEventListener('change', function() {
        const isChecked = this.checked;
        rowCheckboxes.forEach(checkbox => {
          checkbox.checked = isChecked;
        });
      });
      
      // Row checkbox functionality
      rowCheckboxes.forEach((checkbox, index) => {
        checkbox.addEventListener('change', function() {
          const checkedCount = Array.from(rowCheckboxes).filter(cb => cb.checked).length;
          const totalCount = rowCheckboxes.length;
          
          // Update header checkbox state
          if (checkedCount === 0) {
            headerCheckbox.checked = false;
            headerCheckbox.indeterminate = false;
          } else if (checkedCount === totalCount) {
            headerCheckbox.checked = true;
            headerCheckbox.indeterminate = false;
          } else {
            headerCheckbox.checked = false;
            headerCheckbox.indeterminate = true;
          }
        });
      });
    }

    // Column hover functionality
    (function() {
      const table = document.querySelector('.tl-table');
      if (!table) return;

      const headerCells = table.querySelectorAll('.tl-table__header-cell');
      const bodyCells = table.querySelectorAll('.tl-table__body-cell');

      headerCells.forEach(headerCell => {
        const columnIndex = headerCell.getAttribute('data-column');
        
        // Skip the checkbox column (data-column="0") - no hover effect for checkbox column
        if (columnIndex === '0') return;
        
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
    
    setupMultiselectDemo();
    </script>
  `);

export const Default = MultiselectTemplate.bind({});
