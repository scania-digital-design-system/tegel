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
    bodyData: {
      name: 'Data',
      description:
        'An array of objects with keys matching the header cell `column-key` attributes. Can be passed as an array object, or as a stringified array.',
      control: {
        type: 'array',
      },
    },
  },
  args: {
    bodyData: [
      {
        truck: 'L-series',
        driver: 'Sonya Bruce',
        country: 'Brazil',
        mileage: 123987,
      },
      {
        truck: 'P-series',
        driver: 'Guerra Bowman',
        country: 'Sweden',
        mileage: 2000852,
      },
      {
        truck: 'G-series',
        driver: 'Ferrell Wallace',
        country: 'Germany',
        mileage: 564,
      },
      {
        truck: 'R-series',
        driver: 'Cox Burris',
        country: 'Spain',
        mileage: 1789357,
      },
      {
        truck: 'S-series',
        driver: 'Montgomery Cervantes',
        country: 'Croatia',
        mileage: 65,
      },
      {
        truck: 'L-series',
        driver: 'Sheryl Nielsen',
        country: 'Greece',
        mileage: 365784,
      },
      {
        truck: 'G-series',
        driver: 'Benton Gomez',
        country: 'France',
        mileage: 80957,
      },
    ],
  },
};

const DataPropertyTemplate = ({ bodyData }) =>
  formatHtmlPreview(`
    <tds-table enable-expandable-rows="false">
    <tds-table-toolbar table-title="'body-data' property example"></tds-table-toolbar>
      <tds-table-header>
          <tds-header-cell column-key='truck' column-title='Truck type'></tds-header-cell>
          <tds-header-cell column-key='driver' column-title='Driver name'></tds-header-cell>
          <tds-header-cell column-key='country' column-title='Country'></tds-header-cell>
          <tds-header-cell column-key='milage' column-title='Milage'></tds-header-cell>
      </tds-table-header>
      <tds-table-body>
      </tds-table-body>
  </tds-table>
  
  <script>
    /* ONLY WORKS IN THE CANVAS TAB. */
    tableBody = document.querySelector('tds-table-body');
    tableBody.bodyData = ${JSON.stringify(bodyData)}
  </script>`);

export const DataProperty = DataPropertyTemplate.bind({});
