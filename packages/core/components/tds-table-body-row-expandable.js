import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';

const tableBodyRowExpandableCss = ":host{box-sizing:border-box;display:contents}:host *{box-sizing:border-box}:host .tds-table__row,:host .tds-table__row-extend{display:table-row;border-bottom:1px solid var(--tds-table-divider);background-color:var(--tds-table-body-row-background);transition:background-color 200ms ease;color:var(--tds-table-color)}:host .tds-table__row:hover,:host .tds-table__row-extend:hover{background-color:var(--tds-table-body-row-background-hover)}:host .tds-table__expand-control-container{display:flex;justify-content:center;align-items:center;height:46px;cursor:pointer;padding:0 16px;position:relative}:host .tds-table__expand-control-container .tds-table__expand-input{all:unset;top:0;left:0;width:100%;height:100%;position:absolute;cursor:pointer}:host .tds-table__expand-control-container .tds-table__expand-input:focus{outline:2px solid var(--tds-blue-400);outline-offset:-2px}:host .tds-table__expand-control-container .tds-expendable-row-icon{height:16px;width:16px;transition:transform 200ms ease;transform:rotate(0)}:host .tds-table__row-expand{display:none;transition:background-color 200ms ease}:host .tds-table__row-expand .tds-table__cell-expand{padding:16px 16px 16px 66px;color:var(--tds-table-color)}:host(.tds-table__row-expand--active) .tds-table__row{background-color:var(--tds-table-body-row-background-selected)}:host(.tds-table__row-expand--active) .tds-table__expand-control-container .tds-expendable-row-icon{transform:rotate(180deg)}:host(.tds-table__row-expand--active) .tds-table__row-expand{background-color:var(--tds-table-body-row-background-selected);display:table-row}:host(.tds-table__compact) .tds-table__expand-control-container{height:30px}:host(.tds-table__compact) .tds-table__row-expand .tds-table__cell-expand{padding:8px 16px 8px 66px}:host(.tds-table__row--hidden){display:none}:host(.tds-table--divider) .tds-table__cell--expand{border-right:1px solid var(--tds-table-divider)}";

const relevantTableProps = [
  'verticalDividers',
  'compactDesign',
  'noMinWidth',
  'modeVariant',
];
const TdsTableBodyRowExpandable$1 = /*@__PURE__*/ proxyCustomElement(class TdsTableBodyRowExpandable extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.internalTdsRowExpanded = createEvent(this, "internalTdsRowExpanded", 6);
    this.colSpan = null;
    this.isExpanded = false;
    this.tableId = '';
    this.columnsNumber = null;
    this.verticalDividers = false;
    this.compactDesign = false;
    this.noMinWidth = false;
    this.modeVariant = null;
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
  componentWillRender() {
    if (this.colSpan !== null) {
      this.columnsNumber = this.colSpan;
    }
    else {
      this.columnsNumber = this.tableEl.querySelector('tds-table-header').childElementCount + 1;
    }
  }
  sendValue() {
    this.internalTdsRowExpanded.emit([this.tableId, this.isExpanded]);
  }
  onChangeHandler(event) {
    this.isExpanded = event.currentTarget.checked === true;
    this.sendValue();
  }
  render() {
    return (h(Host, { class: {
        'tds-table__row': true,
        'tds-table__row-expand--active': this.isExpanded,
        'tds-table__compact': this.compactDesign,
        'tds-table--divider': this.verticalDividers,
      } }, h("tr", { class: "tds-table__row" }, h("td", { class: "tds-table__cell tds-table__cell--expand" }, h("label", { class: "tds-table__expand-control-container" }, h("input", { class: "tds-table__expand-input", type: "checkbox", onChange: (event) => this.onChangeHandler(event), checked: this.isExpanded }), h("span", { class: "tds-expendable-row-icon" }, h("svg", { fill: "none", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 32" }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M4.273 9.783a1 1 0 0 1 1.415 0l9.888 9.888a.6.6 0 0 0 .848 0l9.888-9.888a1 1 0 1 1 1.415 1.414l-9.889 9.889a2.6 2.6 0 0 1-3.677 0l-9.888-9.889a1 1 0 0 1 0-1.414Z", fill: "currentColor" }))))), h("slot", null)), h("tr", { class: "tds-table__row-expand" }, h("td", { class: "tds-table__cell-expand", colSpan: this.columnsNumber }, h("slot", { name: "expand-row" })))));
  }
  get host() { return this; }
  static get style() { return tableBodyRowExpandableCss; }
}, [1, "tds-table-body-row-expandable", {
    "colSpan": [2, "col-span"],
    "isExpanded": [32],
    "tableId": [32],
    "columnsNumber": [32],
    "verticalDividers": [32],
    "compactDesign": [32],
    "noMinWidth": [32],
    "modeVariant": [32]
  }, [[16, "internalTdsTablePropChange", "internalTdsPropChangeListener"]]]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tds-table-body-row-expandable"];
  components.forEach(tagName => { switch (tagName) {
    case "tds-table-body-row-expandable":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TdsTableBodyRowExpandable$1);
      }
      break;
  } });
}

const TdsTableBodyRowExpandable = TdsTableBodyRowExpandable$1;
const defineCustomElement = defineCustomElement$1;

export { TdsTableBodyRowExpandable, defineCustomElement };
