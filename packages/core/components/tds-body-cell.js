import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const tableBodyCellCss = ":host(.tds-table__body-cell){box-sizing:border-box;font:var(--tds-detail-02);letter-spacing:var(--tds-detail-02-ls);display:table-cell;box-sizing:border-box;color:var(--tds-table-color);padding:var(--tds-spacing-element-16);min-width:192px;vertical-align:top;background-color:transparent;transition:background-color 200ms ease}:host(.tds-table__body-cell) *{box-sizing:border-box}:host(.tds-table__body-cell--no-padding){padding:0}:host(.tds-table__body-cell--hover){background-color:var(--tds-table-body-cell-background-hover)}:host(.tds-table__compact){padding:var(--tds-spacing-element-8) var(--tds-spacing-element-16)}:host(.tds-table--divider){border-right:1px solid var(--tds-table-divider)}:host(.tds-table--divider:last-of-type){border-right:none}:host(.tds-table--no-min-width){min-width:unset}";

const relevantTableProps = [
  'verticalDividers',
  'compactDesign',
  'noMinWidth',
];
const TdsTableBodyCell = /*@__PURE__*/ proxyCustomElement(class TdsTableBodyCell extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.cellValue = undefined;
    this.cellKey = undefined;
    this.disablePadding = false;
    this.textAlignState = undefined;
    this.activeSorting = false;
    this.verticalDividers = false;
    this.compactDesign = false;
    this.noMinWidth = false;
    this.whiteBackground = false;
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
  // Listen to headKey from table-header-element
  internalTdsHoverListener(event) {
    const { tableId, key } = event.detail;
    if (tableId === this.tableId) {
      this.activeSorting = this.cellKey === key;
    }
  }
  // Listen to internalTdsTextAlign from table-header-element
  internalTdsTextAlignListener(event) {
    const [receivedID, receivedKey, receivedTextAlign] = event.detail;
    if (this.tableId === receivedID) {
      if (this.cellKey === receivedKey) {
        this.textAlignState = receivedTextAlign;
      }
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
        'tds-table__body-cell': true,
        'tds-table__body-cell--hover': this.activeSorting,
        'tds-table__compact': this.compactDesign,
        'tds-table--divider': this.verticalDividers,
        'tds-table--no-min-width': this.noMinWidth,
        'tds-table__body-cell--no-padding': this.disablePadding,
      }, style: { textAlign: this.textAlignState } }, this.cellValue, h("slot", null)));
  }
  get host() { return this; }
  static get style() { return tableBodyCellCss; }
}, [1, "tds-body-cell", {
    "cellValue": [520, "cell-value"],
    "cellKey": [520, "cell-key"],
    "disablePadding": [516, "disable-padding"],
    "textAlignState": [32],
    "activeSorting": [32],
    "verticalDividers": [32],
    "compactDesign": [32],
    "noMinWidth": [32],
    "whiteBackground": [32],
    "tableId": [32]
  }, [[16, "internalTdsPropChange", "internalTdsPropChangeListener"], [16, "internalTdsHover", "internalTdsHoverListener"], [16, "internalTdsTextAlign", "internalTdsTextAlignListener"]]]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tds-body-cell"];
  components.forEach(tagName => { switch (tagName) {
    case "tds-body-cell":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TdsTableBodyCell);
      }
      break;
  } });
}

const TdsBodyCell = TdsTableBodyCell;
const defineCustomElement = defineCustomElement$1;

export { TdsBodyCell, defineCustomElement };
