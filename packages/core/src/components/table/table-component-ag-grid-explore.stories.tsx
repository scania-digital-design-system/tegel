import tdsTable from './table/readme.md';
import tdsTableToolbar from './table-toolbar/readme.md';
import tdsHeader from './table-header/readme.md';
import tdsHeaderCell from './table-header-cell/readme.md';
import tdsTableBody from './table-body/readme.md';
import tdsBodyRow from './table-body-row/readme.md';
import tdsBodyRowExpandable from './table-body-row-expandable/readme.md';
import tdsBodyCell from './table-body-cell/readme.md';
import tdsTableFooter from './table-footer/readme.md';
import tdsTableBodyInputWrapper from './table-body-input-wrapper/readme.md';
import tdsTableHeaderInputWrapper from './table-header-input-wrapper/readme.md';
import { ComponentsFolder } from '../../utils/constants';
import formatHtmlPreview from '../../stories/formatHtmlPreview';

export default {
  title: `${ComponentsFolder}/Table`,
  parameters: {
    notes: {
      'tds-table': tdsTable,
      'tds-table-toolbar': tdsTableToolbar,
      'tds-header': tdsHeader,
      'tds-header-cell': tdsHeaderCell,
      'tds-header-input-wrapper': tdsTableHeaderInputWrapper,
      'tds-table-body': tdsTableBody,
      'tds-body-row': tdsBodyRow,
      'tds-body-row-expandable': tdsBodyRowExpandable,
      'tds-body-cell': tdsBodyCell,
      'tds-body-input-wrapper': tdsTableBodyInputWrapper,
      'tds-table-footer': tdsTableFooter,
    },
  },
};

const AgGridExploreTemplate = () =>
  formatHtmlPreview(`
    <div id="myGrid" style="width: 100%; height: 100%"></div>
`);

export const AgGridExplore = AgGridExploreTemplate.bind({});
