import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const tableBodyCss = ":host,tds-table-body{box-sizing:border-box;display:table-row-group}:host *,tds-table-body *{box-sizing:border-box}:host .tds-table__info-message,tds-table-body .tds-table__info-message{font:var(--tds-detail-02);letter-spacing:var(--tds-detail-02-ls);display:table-cell;box-sizing:border-box;color:var(--tds-table-color);padding:var(--tds-spacing-element-16);min-width:192px;vertical-align:top;background-color:transparent;transition:background-color 200ms ease}";

const relevantTableProps = ['multiselect', 'expandableRows'];
const TdsTableBody$1 = /*@__PURE__*/ proxyCustomElement(class TdsTableBody extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.bodyCheckBoxClicked = () => {
      const numberOfRows = this.host.getElementsByClassName('tds-table__row').length;
      const numberOfRowsSelected = this.host.getElementsByClassName('tds-table__row--selected').length;
      this.mainCheckboxStatus = numberOfRows === numberOfRowsSelected;
    };
    this.multiselect = false;
    this.enablePaginationTableBody = false;
    this.expandableRows = false;
    this.multiselectArray = [];
    this.multiselectArrayJSON = undefined;
    this.mainCheckboxStatus = false;
    this.columnsNumber = 0;
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
  // No need to read the value, event is here just to trigger another function
  bodyCheckboxListener() {
    this.bodyCheckBoxClicked();
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
    const headerColumnsNo = this.host.parentElement.querySelector('tds-table-header').children.length;
    // multiselect and expended features requires one extra column for controls...
    if (this.multiselect || this.expandableRows) {
      this.columnsNumber = headerColumnsNo + 1;
    }
    else {
      this.columnsNumber = headerColumnsNo;
    }
  }
  render() {
    return (h(Host, { "data-selected-rows": this.multiselectArrayJSON }, h("slot", null)));
  }
  get host() { return this; }
  static get style() { return tableBodyCss; }
}, [4, "tds-table-body", {
    "multiselect": [32],
    "enablePaginationTableBody": [32],
    "expandableRows": [32],
    "multiselectArray": [32],
    "multiselectArrayJSON": [32],
    "mainCheckboxStatus": [32],
    "columnsNumber": [32],
    "tableId": [32]
  }, [[16, "internalTdsTablePropChange", "internalTdsPropChangeListener"], [16, "internalTdsRowChange", "bodyCheckboxListener"]]]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tds-table-body"];
  components.forEach(tagName => { switch (tagName) {
    case "tds-table-body":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TdsTableBody$1);
      }
      break;
  } });
}

const TdsTableBody = TdsTableBody$1;
const defineCustomElement = defineCustomElement$1;

export { TdsTableBody, defineCustomElement };
