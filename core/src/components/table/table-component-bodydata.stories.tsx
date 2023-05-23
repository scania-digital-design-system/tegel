import { formatHtmlPreview } from '../../utils/utils';
import sddsTable from './table/readme.md';
import sddsTableToolbar from './table-toolbar/readme.md';
import sddsHeader from './table-header/readme.md';
import sddsHeaderCell from './table-header-cell/readme.md';
import sddsTableBody from './table-body/readme.md';
import sddsBodyRow from './table-body-row/readme.md';
import sddsBodyRowExpandable from './table-body-row-expandable/readme.md';
import sddsBodyCell from './table-body-cell/readme.md';
import sddsTableFooter from './table-footer/readme.md';
import { ComponentsFolder } from '../../utils/constants';

export default {
  title: `${ComponentsFolder}/Table`,
  parameters: {
    notes: {
      'sdds-table': sddsTable,
      'sdds-table-toolbar': sddsTableToolbar,
      'sdds-header': sddsHeader,
      'sdds-header-cell': sddsHeaderCell,
      'sdds-table-body': sddsTableBody,
      'sdds-body-row': sddsBodyRow,
      'sdds-body-row-expandable': sddsBodyRowExpandable,
      'sdds-body-cell': sddsBodyCell,
      'sdds-table-footer': sddsTableFooter,
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
    <sdds-table enable-expandable-rows="false">
    <sdds-table-toolbar table-title="'body-data' property example"></sdds-table-toolbar>
      <sdds-table-header>
          <sdds-header-cell column-key='truck' column-title='Truck type'></sdds-header-cell>
          <sdds-header-cell column-key='driver' column-title='Driver name'></sdds-header-cell>
      </sdds-table-header>
      <sdds-table-body body-data='${JSON.stringify(bodyData)}'>
      </sdds-table-body>
  </sdds-table>`);

export const DataProperty = DataPropertyTemplate.bind({});
