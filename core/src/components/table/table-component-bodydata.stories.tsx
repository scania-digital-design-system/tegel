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
      { truck: 'L-series', driver: 'Sonya Bruce' },
      { truck: 'P-series', driver: 'Guerra Bowman' },
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
      </tds-table-header>
      <tds-table-body body-data='${JSON.stringify(bodyData)}'>
      </tds-table-body>
  </tds-table>`);

export const DataProperty = DataPropertyTemplate.bind({});
