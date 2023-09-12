import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { d as defineCustomElement$2 } from './checkbox.js';

const tableBodyRowCss = ":host(.tds-table__row){box-sizing:border-box;display:table-row;border-bottom:1px solid var(--tds-table-divider);background-color:var(--tds-table-body-row-background);transition:background-color 200ms ease;color:var(--tds-table-color)}:host(.tds-table__row) *{box-sizing:border-box}:host(.tds-table__row) .tds-table__body-cell--checkbox{min-width:48px;width:48px;padding:0}:host(.tds-table__row:hover){background-color:var(--tds-table-body-row-background-hover)}:host(.tds-table__row--selected){background-color:var(--tds-table-body-row-background-selected)}:host(.tds-table__row--selected:hover){background-color:var(--tds-table-body-row-background-selected-hover)}:host(.tds-table__row--hidden){display:none}:host(.tds-table__row--expended){width:100%;background-color:pink}:host .tds-form-label--table{width:100%;height:48px;display:flex;justify-content:center;align-items:center;cursor:pointer}:host(.tds-table__compact) .tds-form-label--table{height:32px}:host(.tds-table--divider) .tds-table__body-cell--checkbox{border-right:1px solid var(--tds-table-divider)}";

const relevantTableProps = [
  'multiselect',
  'verticalDividers',
  'compactDesign',
];
const TdsTableBodyRow$1 = /*@__PURE__*/ proxyCustomElement(class TdsTableBodyRow extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.tdsSelect = createEvent(this, "tdsSelect", 6);
    this.selected = false;
    this.multiselect = false;
    this.mainCheckBoxStatus = false;
    this.verticalDividers = false;
    this.compactDesign = false;
    this.noMinWidth = false;
    this.tableId = '';
  }
  async handleCheckboxChange(event) {
    this.selected = event.detail.checked;
    this.tdsSelect.emit({
      tableId: this.tableId,
      checked: this.selected,
      selectedRows: await this.tableEl.getSelectedRows(),
    });
  }
  internalTdsPropChangeListener(event) {
    if (this.tableId === event.detail.tableId) {
      event.detail.changed
        .filter((changedProp) => relevantTableProps.includes(changedProp))
        .forEach((changedProp) => {
        if (typeof this[changedProp] === 'undefined') {
          throw new Error(`Table prop is not supported: ${changedProp}`);
        }
        this[changedProp] = event.detail[changedProp];
      });
    }
  }
  connectedCallback() {
    this.tableEl = this.host.closest('tds-table');
    this.tableId = this.tableEl.tableId;
  }
  componentWillLoad() {
    relevantTableProps.forEach((tablePropName) => {
      this[tablePropName] = this.tableEl[tablePropName];
    });
  }
  render() {
    return (h(Host, { class: {
        'tds-table__row': true,
        'tds-table__row--selected': this.selected,
        'tds-table__compact': this.compactDesign,
        'tds-table--divider': this.verticalDividers,
      } }, this.multiselect && (h("td", { class: "tds-table__body-cell tds-table__body-cell--checkbox tds-form-label tds-form-label--table" }, h("tds-checkbox", { onTdsChange: (event) => this.handleCheckboxChange(event), checked: this.selected }))), h("slot", null)));
  }
  get host() { return this; }
  static get style() { return tableBodyRowCss; }
}, [1, "tds-table-body-row", {
    "selected": [516],
    "multiselect": [32],
    "mainCheckBoxStatus": [32],
    "verticalDividers": [32],
    "compactDesign": [32],
    "noMinWidth": [32],
    "tableId": [32]
  }, [[16, "internalTdsTablePropChange", "internalTdsPropChangeListener"]]]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tds-table-body-row", "tds-checkbox"];
  components.forEach(tagName => { switch (tagName) {
    case "tds-table-body-row":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TdsTableBodyRow$1);
      }
      break;
    case "tds-checkbox":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const TdsTableBodyRow = TdsTableBodyRow$1;
const defineCustomElement = defineCustomElement$1;

export { TdsTableBodyRow, defineCustomElement };
