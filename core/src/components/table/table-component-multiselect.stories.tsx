import { formatHtmlPreview } from '../../utils/utils';
import tdsTable from './table/readme.md';
import tdsTableToolbar from './table-toolbar/readme.md';
import tdsHeader from './table-header/readme.md';
import tdsHeaderCell from './table-header-cell/readme.md';
import tdsTableBody from './table-body/readme.md';
import tdsBodyRow from './table-body-row/readme.md';
import tdsBodyRowExpandable from './table-body-row-expandable/readme.md';
import tdsBodyCell from './table-body-cell/readme.md';
import tdsTableFooter from './table-footer/readme.md';
import { ComponentsFolder } from '../../utils/constants';

export default {
  title: `${ComponentsFolder}/Table`,
  parameters: {
    notes: {
      'tds-table': tdsTable,
      'tds-table-toolbar': tdsTableToolbar,
      'tds-header': tdsHeader,
      'tds-header-cell': tdsHeaderCell,
      'tds-table-body': tdsTableBody,
      'tds-body-row': tdsBodyRow,
      'tds-body-row-expandable': tdsBodyRowExpandable,
      'tds-body-cell': tdsBodyCell,
      'tds-table-footer': tdsTableFooter,
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
    multiselect: {
      name: 'Enable multiselect',
      description: 'Enables row selection.',
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
    multiselect: true,
    verticalDivider: false,
    noMinWidth: false,
    column1Width: '',
    column2Width: '',
    column3Width: '',
    column4Width: '',
  },
};

const MultiselectTemplate = ({
  modeVariant,
  compactDesign,
  responsiveDesign,
  multiselect,
  verticalDivider,
  noMinWidth,
  column1Width,
  column2Width,
  column3Width,
  column4Width,
}) =>
  formatHtmlPreview(`
<script>
// Note: Script here is only for demo purposes
  function getValue() {
    const element = document.querySelector('#multiselect-table > tds-table-body');
    const textArea = document.getElementById('selected-rows-value-textarea');
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === 'attributes') {
          textArea.value = element.getAttribute('data-selected-rows');
        }
      });
    });
    observer.observe(element, {
      attributes: true,
    });
  }
  window.addEventListener('click', () => {
    getValue();
  });

</script>

    <tds-table
        id="multiselect-table"
        ${multiselect ? 'multiselect' : ''}
        vertical-dividers="${verticalDivider}"
        compact-design="${compactDesign}"
        responsive="${responsiveDesign}"
        ${noMinWidth ? 'no-min-width' : ''}
        ${
          modeVariant !== 'Inherit from parent' ? `mode-variant="${modeVariant.toLowerCase()}"` : ''
        }
    >
          <tds-table-header>
              <tds-header-cell column-key='truck' column-title='Truck type' ${
                column1Width ? `custom-width="${column1Width}"` : ''
              }></tds-header-cell>
              <tds-header-cell column-key='driver' column-title='Driver name' ${
                column2Width ? `custom-width="${column2Width}"` : ''
              }></tds-header-cell>
              <tds-header-cell column-key='country' column-title='Country' ${
                column3Width ? `custom-width="${column3Width}"` : ''
              }></tds-header-cell>
              <tds-header-cell column-key='mileage' column-title='Mileage' text-align='right' ${
                column4Width ? `custom-width="${column4Width}"` : ''
              }></tds-header-cell>
          </tds-table-header>
          <tds-table-body>
          </tds-table-body>
  </tds-table>
  <script>
  /* ONLY WORKS IN THE CANVAS TAB. */
  tableBody = document.querySelector('tds-table-body');
  tableBody.bodyData = [
    {
      "truck": "L-series",
      "driver": "Sonya Bruce",
      "country": "Brazil",
      "mileage": 123987
    },
    {
      "truck": "P-series",
      "driver": "Guerra Bowman",
      "country": "Sweden",
      "mileage": 2000852
    },
    {
      "truck": "G-series",
      "driver": "Ferrell Wallace",
      "country": "Germany",
      "mileage": 564
    },
    {
      "truck": "R-series",
      "driver": "Cox Burris",
      "country": "Spain",
      "mileage": 1789357
    },
    {
      "truck": "S-series",
      "driver": "Montgomery Cervantes",
      "country": "Croatia",
      "mileage": 65
    },
    {
      "truck": "L-series",
      "driver": "Sheryl Nielsen",
      "country": "Greece",
      "mileage": 365784
    },
    {
      "truck": "G-series",
      "driver": "Benton Gomez",
      "country": "France",
      "mileage": 80957
    }
  ]
</script>

  <!-- Note: Code below is just for demo purposes -->
  <div class="tds-u-mt1" style="width: 450px; background-color: lightblue; padding: 16px;">
    <p class="tds-u-mt0">Note: This box works only in "Canvas" tab.</p>
    <h6 class="tds-u-pb0 tds-u-mb0 tds-u-mt0">Selected rows data</h6>
    <small>Values here are values found in data-selected-rows attribute of tds-table-body element. They are shown here just for presentation purposes.</small>
    <textarea id="selected-rows-value-textarea" rows="5" cols="50" readonly></textarea>
  </div>
  `);

export const Multiselect = MultiselectTemplate.bind({});
