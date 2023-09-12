import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { g as generateUniqueId } from './utils.js';

const tableCss = ":host,.tds-table{border-collapse:collapse;display:table;box-sizing:border-box}:host *,.tds-table *{box-sizing:border-box}:host(.tds-table--responsive),.tds-table--responsive{width:100%}";

const TdsTable$1 = /*@__PURE__*/ proxyCustomElement(class TdsTable extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.internalTdsTablePropChange = createEvent(this, "internalTdsTablePropChange", 6);
    this.verticalDividers = false;
    this.compactDesign = false;
    this.noMinWidth = undefined;
    this.multiselect = false;
    this.expandableRows = false;
    this.responsive = false;
    this.modeVariant = null;
    this.tableId = generateUniqueId();
  }
  emitInternalTdsPropChange(changedValueName, changedValue) {
    this.internalTdsTablePropChange.emit({
      tableId: this.tableId,
      changed: [changedValueName],
      [changedValueName]: changedValue,
    });
  }
  /** Returns all selected rows data. */
  async getSelectedRows() {
    let selectedRowsData = [];
    const tableBody = this.host.querySelector('tds-table-body');
    const selectedRows = Array.from(tableBody.querySelectorAll('tds-table-body-row')).filter((element) => element.selected);
    selectedRows.forEach((row) => {
      let selectedRow = [];
      const rowCells = Array.from(row.getElementsByTagName('tds-body-cell'));
      rowCells.forEach((cell) => {
        var _a;
        const cellObject = {
          cellKey: null,
          cellValue: null,
        };
        cellObject.cellKey = cell.cellKey;
        cellObject.cellValue = (_a = cell.cellValue) !== null && _a !== void 0 ? _a : cell.innerText;
        selectedRow = [...selectedRow, cellObject];
      });
      selectedRowsData = [...selectedRowsData, selectedRow];
    });
    return selectedRowsData;
  }
  multiselectChanged(newValue) {
    this.emitInternalTdsPropChange('multiselect', newValue);
  }
  enableExpandableRowsChanged(newValue) {
    this.emitInternalTdsPropChange('expandableRows', newValue);
  }
  compactDesignChanged(newValue) {
    this.emitInternalTdsPropChange('compactDesign', newValue);
  }
  verticalDividersChanged(newValue) {
    this.emitInternalTdsPropChange('verticalDividers', newValue);
  }
  noMinWidthChanged(newValue) {
    this.emitInternalTdsPropChange('noMinWidth', newValue);
  }
  modeVariantChanged(newValue) {
    this.emitInternalTdsPropChange('modeVariant', newValue);
  }
  render() {
    return (h(Host, { class: {
        'tds-table--responsive': this.responsive,
        'tds-mode-variant-primary': this.modeVariant === 'primary',
        'tds-mode-variant-secondary': this.modeVariant === 'secondary',
      } }, h("table", { class: {
        'tds-table': true,
        'tds-table--compact': this.compactDesign,
        'tds-table--divider': this.verticalDividers,
        'tds-table--no-min-width': this.noMinWidth,
        'tds-table--responsive': this.responsive,
      } }, h("slot", null))));
  }
  get host() { return this; }
  static get watchers() { return {
    "multiselect": ["multiselectChanged"],
    "expandableRows": ["enableExpandableRowsChanged"],
    "compactDesign": ["compactDesignChanged"],
    "verticalDividers": ["verticalDividersChanged"],
    "noMinWidth": ["noMinWidthChanged"],
    "modeVariant": ["modeVariantChanged"]
  }; }
  static get style() { return tableCss; }
}, [1, "tds-table", {
    "verticalDividers": [516, "vertical-dividers"],
    "compactDesign": [516, "compact-design"],
    "noMinWidth": [516, "no-min-width"],
    "multiselect": [516],
    "expandableRows": [516, "expandable-rows"],
    "responsive": [516],
    "modeVariant": [513, "mode-variant"],
    "tableId": [1, "table-id"],
    "getSelectedRows": [64]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tds-table"];
  components.forEach(tagName => { switch (tagName) {
    case "tds-table":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TdsTable$1);
      }
      break;
  } });
}

const TdsTable = TdsTable$1;
const defineCustomElement = defineCustomElement$1;

export { TdsTable, defineCustomElement };
