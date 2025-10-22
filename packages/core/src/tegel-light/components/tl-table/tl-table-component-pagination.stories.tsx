import formatHtmlPreview from '../../../stories/formatHtmlPreview';

export default {
  title: 'Tegel Light (CSS)/Table/Pagination',
  parameters: {
    docs: {
      description: {
        component:
          'Table with a CSS-only pagination footer. ⚠️ Note: The controls below are demo-only — real pagination requires app logic. The script below demonstrates an example of pagination logic.',
      },
    },
    layout: 'padded',
  },
  argTypes: {
    modeVariant: {
      name: 'Mode variant',
      description:
        'Mode variant adjusts component colors to have better visibility depending on global mode and background.',
      control: { type: 'radio' },
      options: ['Inherit from parent', 'Primary', 'Secondary'],
      table: { defaultValue: { summary: 'Inherit from parent' } },
    },
    compactDesign: {
      name: 'Compact design',
      description: 'Enables compact design of the Table, rows with less height.',
      control: { type: 'boolean' },
      table: { defaultValue: { summary: false } },
    },
    responsiveDesign: {
      name: 'Responsive Table',
      description:
        'Enables Table to take 100% of available width. For column values less than 192px, "No minimum width" has to be enabled too.',
      control: { type: 'boolean' },
      table: { defaultValue: { summary: false } },
    },
    verticalDivider: {
      name: 'Vertical dividers',
      description: 'Enables vertical dividers between Table columns.',
      control: { type: 'boolean' },
      table: { defaultValue: { summary: false } },
    },
    rowsPerPageValues: {
      name: 'Rows per page values',
      description: 'List of rows per page values',
      control: {
        type: 'select',
        options: ['[5,10,15]', '[10,25,50]', '[20,30,40]', '[100, 220, 303]'],
      },
    },
    pages: {
      name: 'Pages',
      description: 'Number of pages',
      control: { type: 'number', min: 1, max: 1000 },
    },
    rowsPerPage: {
      name: 'Rows per page',
      description: 'Show/hide rows per page dropdown in footer',
      control: { type: 'boolean' },
      table: { defaultValue: { summary: true } },
    },
    noMinWidth: {
      name: 'No minimum width',
      description:
        'Resets min-width rule and enables setting column width value to less than 192px which is the default. When enabled, controls for column width will show here.',
      control: { type: 'boolean' },
    },
    column1Width: {
      name: 'Column 1 width',
      description:
        'Value of width for column 1. Works together with "No minimum width". Provide unit, e.g. 200px.',
      control: { type: 'text' },
      if: { arg: 'noMinWidth', eq: true },
    },
    column2Width: {
      name: 'Column 2 width',
      description:
        'Value of width for column 2. Works together with "No minimum width". Provide unit, e.g. 200px.',
      control: { type: 'text' },
      if: { arg: 'noMinWidth', eq: true },
    },
    column3Width: {
      name: 'Column 3 width',
      description:
        'Value of width for column 3. Works together with "No minimum width". Provide unit, e.g. 200px.',
      control: { type: 'text' },
      if: { arg: 'noMinWidth', eq: true },
    },
    column4Width: {
      name: 'Column 4 width',
      description:
        'Value of width for column 4. Works together with "No minimum width". Provide unit, e.g. 200px.',
      control: { type: 'text' },
      if: { arg: 'noMinWidth', eq: true },
    },
  },
  args: {
    modeVariant: 'Inherit from parent',
    compactDesign: false,
    responsiveDesign: false,
    verticalDivider: false,
    rowsPerPage: true,
    rowsPerPageValues: '[10,25,50]',
    pages: 4,
    noMinWidth: false,
    column1Width: '',
    column2Width: '',
    column3Width: '',
    column4Width: '',
  },
};

const PaginationTemplate = ({
  modeVariant,
  compactDesign,
  responsiveDesign,
  verticalDivider,
  rowsPerPage,
  rowsPerPageValues,
  pages,
  noMinWidth,
  column1Width,
  column2Width,
  column3Width,
  column4Width,
}) => {
  const modeClass =
    modeVariant !== 'Inherit from parent' ? `tl-table--${modeVariant.toLowerCase()}` : '';
  const compactClass = compactDesign ? 'tl-table--compact' : '';
  const responsiveClass = responsiveDesign ? 'tl-table--responsive' : '';
  const verticalDividersClass = verticalDivider ? 'tl-table--vertical-dividers' : '';
  const noMinWidthClass = noMinWidth ? 'tl-table--no-min-width' : '';

  // Inline styles for custom column widths (TL is CSS-only; we mimic WC "custom-width" via inline style)
  const col1Style = column1Width ? `style="width: ${column1Width}"` : '';
  const col2Style = column2Width ? `style="width: ${column2Width}"` : '';
  const col3Style = column3Width ? `style="width: ${column3Width}"` : '';
  const col4Style = column4Width ? `style="width: ${column4Width}"` : '';

  return formatHtmlPreview(`
    <!-- Required stylesheets:
      "@scania/tegel-light/global.css"
      "@scania/tegel-light/tl-table.css"
      "@scania/tegel-light/tl-icon.css"
    -->
    <table class="tl-table ${modeClass} ${compactClass} ${responsiveClass} ${verticalDividersClass} ${noMinWidthClass}">
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
      </tbody>

      <tfoot class="tl-table__footer">
        <tr class="tl-table__footer-row">
          <td class="tl-table__footer-cell" colspan="4">
            <div class="tl-table__pagination">
              <div class="tl-table__row-selector">
                              ${
                                rowsPerPage
                                  ? `
                  <div class="tl-table__rows-per-page">
                   <p class="tl-table__rows-per-page-label">Rows per page</p>
                   <select id="tl-rows-per-page" class="tl-table__rows-per-page-select"></select>
                  </div>
              `
                                  : ''
                              }
              </div>

              <div class="tl-table__page-selector">
                <input class="tl-table__page-selector-input" id="tl-current-page" value="1" type="number" min="1" max="4" pattern="[0-9]+" dir="rtl">
                <p class="tl-table__footer-text">of <span id="tl-total-pages">${pages}</span> pages</p>
                <button class="tl-table__footer-btn" data-action="first"><span class="tl-icon tl-icon--skip_backwards tl-icon--20"></span></button>
                <button class="tl-table__footer-btn" data-action="prev"><span class="tl-icon tl-icon--chevron_left tl-icon--20"></span></button>
                <button class="tl-table__footer-btn" data-action="next"><span class="tl-icon tl-icon--chevron_right tl-icon--20"></span></button>
                <button class="tl-table__footer-btn" data-action="last"><span class="tl-icon tl-icon--skip_forward tl-icon--20"></span></button>
              </div>
            </div>
          </td>
        </tr>
      </tfoot>
    </table>

  <!-- The script below is just for demo purposes -->
<script>
  (function () {
    var totalPages = Number(${pages}) || 1;
    var currentPageEl = document.getElementById('tl-current-page');
    var totalPagesEl = document.getElementById('tl-total-pages');
    var rowsPerPageEl = document.getElementById('tl-rows-per-page');

    var values = [];
    try { values = JSON.parse('${rowsPerPageValues}'.replace(/'/g, '"')); } catch (e) {}
    if (rowsPerPageEl && Array.isArray(values)) {
      rowsPerPageEl.innerHTML = values.map(v => '<option value="'+v+'">'+v+'</option>').join('');
    }

    totalPagesEl.textContent = String(totalPages);

    function emit(name, detail) {
      console.log(name, detail);
    }

    var btns = document.querySelectorAll('.tl-table__footer-btn');
    var btnFirst = document.querySelector('.tl-table__footer-btn[data-action="first"]');
    var btnPrev = document.querySelector('.tl-table__footer-btn[data-action="prev"]');
    var btnNext = document.querySelector('.tl-table__footer-btn[data-action="next"]');
    var btnLast = document.querySelector('.tl-table__footer-btn[data-action="last"]');

    function updateButtonStates(current) {
      if (!btnFirst || !btnPrev || !btnNext || !btnLast) return;

      if (current <= 1) {
        btnFirst.disabled = true;
        btnPrev.disabled = true;
      } else {
        btnFirst.disabled = false;
        btnPrev.disabled = false;
      }

      if (current >= totalPages) {
        btnNext.disabled = true;
        btnLast.disabled = true;
      } else {
        btnNext.disabled = false;
        btnLast.disabled = false;
      }
    }

    btns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        var action = btn.getAttribute('data-action');
        var current = Number(currentPageEl.value) || 1;
        var next = current;

        if (action === 'first') next = 1;
        if (action === 'prev') next = Math.max(1, current - 1);
        if (action === 'next') next = Math.min(totalPages, current + 1);
        if (action === 'last') next = totalPages;

        if (next !== current) {
          currentPageEl.value = String(next);
          emit('tlPagination', { action: action, page: next, totalPages: totalPages });
        }

        updateButtonStates(next);
      });
    });

    if (rowsPerPageEl) {
      rowsPerPageEl.addEventListener('change', function() {
        emit('tlRowsPerPageChange', { rowsPerPage: Number(this.value) });
      });
    }

    var initPage = Number(currentPageEl.value) || 1;
    updateButtonStates(initPage);
  })();
</script>

  `);
};

export const Default = PaginationTemplate.bind({});
