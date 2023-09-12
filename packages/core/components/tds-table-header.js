import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { d as defineCustomElement$2 } from './checkbox.js';

const tableHeaderCss = ":host{box-sizing:border-box;display:table-header-group}:host *{box-sizing:border-box}:host .tds-table__header-cell--checkbox{font:var(--tds-headline-07);letter-spacing:var(--tds-headline-07-ls);display:table-cell;text-align:left;color:var(--tds-table-color);background-color:var(--tds-table-header-background);border-bottom:1px solid var(--tds-table-divider);height:48px;box-sizing:border-box;overflow:hidden;transition:background-color 200ms ease;min-width:unset;width:48px;padding:0;border-top-left-radius:4px}:host .tds-form-label--table{width:100%;height:48px;display:flex;justify-content:center;align-items:center;cursor:pointer}:host .tds-table__expand-control-container{display:flex;justify-content:center;align-items:center;height:48px;cursor:pointer}:host .tds-table__expand-control-container .tds-table__expand-input{display:none}:host .tds-table__expand-control-container .tds-expandable-row-icon{height:20px;width:20px;transition:transform 200ms ease;transform:rotate(0)}:host .tds-table__expand-control-container .tds-expandable-row-icon--opened{transform:rotate(180deg)}:host ::slotted(tds-header-cell:hover){background-color:var(--tds-table-header-background-hover)}:host(.tds-table--compact) .tds-table__header-cell--checkbox{height:32px}:host(.tds-table--compact) .tds-form-label--table{height:32px}:host(.tds-table--divider) .tds-table__header-cell--checkbox{border-right:1px solid var(--tds-table-divider)}:host(.tds-table--toolbar-available) .tds-table__header-cell--checkbox{border-top-left-radius:0}";

const relevantTableProps = [
  'multiselect',
  'expandableRows',
  'verticalDividers',
  'compactDesign',
  'noMinWidth',
];
const TdsTableHeaderRow = /*@__PURE__*/ proxyCustomElement(class TdsTableHeaderRow extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.tdsSelectAll = createEvent(this, "tdsSelectAll", 6);
    this.allSelected = false;
    this.multiselect = false;
    this.expandableRows = false;
    this.mainCheckboxSelected = false;
    this.mainExpendSelected = false;
    this.verticalDividers = false;
    this.compactDesign = false;
    this.noMinWidth = false;
    this.whiteBackground = false;
    this.enableToolbarDesign = false;
    this.tableId = '';
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
  internalTdsRowExpandedListener(event) {
    if (this.tableId === event.detail[0]) {
      // TODO: Improve this logic. Why we get late repose in DOM?
      setTimeout(() => {
        this.bodyExpandClicked();
      }, 100);
    }
  }
  bodyExpandClicked() {
    const numberOfExtendRowsActive = this.host.parentElement
      .querySelector('tds-table-body')
      .getElementsByClassName('tds-table__row-extend--active').length;
    const numberOfExtendRows = this.host.parentElement
      .querySelector('tds-table-body')
      .getElementsByTagName('tds-table-body-row-expendable').length;
    if (numberOfExtendRows === numberOfExtendRowsActive) {
      this.mainExpendSelected = true;
    }
    else {
      this.mainExpendSelected = false;
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
  componentWillRender() {
    this.enableToolbarDesign =
      this.host.closest('tds-table').getElementsByTagName('tds-table-toolbar').length >= 1;
  }
  async handleCheckboxChange(event) {
    this.allSelected = event.detail.checked;
    this.tdsSelectAll.emit({
      tableId: this.tableId,
      checked: event.detail.checked,
      selectedRows: await this.tableEl.getSelectedRows(),
    });
  }
  render() {
    return (h(Host, { class: {
        'tds-table--compact': this.compactDesign,
        'tds-table--divider': this.verticalDividers,
        'tds-table--toolbar-available': this.enableToolbarDesign,
      } }, h("tr", null, this.multiselect && (h("th", { class: "tds-table__header-cell tds-table__header-cell--checkbox" }, h("div", { class: "tds-form-label tds-form-label--table" }, h("tds-checkbox", { checked: this.allSelected, onTdsChange: (event) => this.handleCheckboxChange(event) })))), this.expandableRows && (h("th", { class: "tds-table__header-cell tds-table__header-cell--checkbox" })), h("slot", null))));
  }
  get host() { return this; }
  static get style() { return tableHeaderCss; }
}, [1, "tds-table-header", {
    "allSelected": [1540, "all-selected"],
    "multiselect": [32],
    "expandableRows": [32],
    "mainCheckboxSelected": [32],
    "mainExpendSelected": [32],
    "verticalDividers": [32],
    "compactDesign": [32],
    "noMinWidth": [32],
    "whiteBackground": [32],
    "enableToolbarDesign": [32],
    "tableId": [32]
  }, [[16, "internalTdsTablePropChange", "internalTdsPropChangeListener"], [16, "internalTdsRowExpanded", "internalTdsRowExpandedListener"]]]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tds-table-header", "tds-checkbox"];
  components.forEach(tagName => { switch (tagName) {
    case "tds-table-header":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TdsTableHeaderRow);
      }
      break;
    case "tds-checkbox":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const TdsTableHeader = TdsTableHeaderRow;
const defineCustomElement = defineCustomElement$1;

export { TdsTableHeader, defineCustomElement };
