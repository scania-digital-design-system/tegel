import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { d as defineCustomElement$2 } from './icon.js';

const tableFooterCss = ":host{box-sizing:border-box;display:table-footer-group;height:48px}:host *{box-sizing:border-box}:host .tds-table__footer-row{background-color:var(--tds-table-footer-background);color:var(--tds-table-color)}:host .tds-table__footer-cell{padding:0 16px}:host .tds-table__footer-cell .tds-table__pagination{height:48px;display:flex;align-items:center;justify-content:space-between}:host .tds-table__footer-cell .tds-table__pagination .tds-table__row-selector,:host .tds-table__footer-cell .tds-table__pagination .tds-table__page-selector{display:flex;align-items:center}:host .tds-table__footer-cell .tds-table__pagination .tds-table__page-selector-input{font:var(--tds-detail-02);letter-spacing:var(--tds-detail-02-ls);background-color:var(--tds-table-footer-page-selector-input-background);color:var(--tds-table-color);width:54px;height:30px;border:none;border-radius:4px;transition:background-color 250ms ease;margin-right:4px;padding-left:16px}:host .tds-table__footer-cell .tds-table__pagination .tds-table__page-selector-input:hover{background-color:var(--tds-table-footer-page-selector-input-background-hover)}:host .tds-table__footer-cell .tds-table__pagination .tds-table__page-selector-input:disabled{color:var(--tds-table-footer-page-selector-input-color-disabled)}:host .tds-table__footer-cell .tds-table__pagination .tds-table__page-selector-input--shake{animation:tds-shake-animation 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;transform:translate3d(0, 0, 0);backface-visibility:hidden;perspective:1000px}:host .tds-table__footer-cell .tds-table__pagination .tds-table__footer-text{font:var(--tds-detail-02);letter-spacing:var(--tds-detail-02-ls);padding:1px 8px 0 0}:host .tds-table__footer-cell .tds-table__pagination .tds-table__footer-btn{display:flex;justify-content:center;align-items:center;border:none;background-color:transparent;cursor:pointer;height:32px;width:32px;border-radius:4px;transition:background-color 250ms ease;color:var(--tds-table-footer-page-selector-icon)}:host .tds-table__footer-cell .tds-table__pagination .tds-table__footer-btn:hover{background-color:var(--tds-table-footer-btn-hover)}:host .tds-table__footer-cell .tds-table__pagination .tds-table__footer-btn:disabled{cursor:default;color:var(--tds-table-footer-page-selector-icon-disabled)}:host .tds-table__footer-cell .tds-table__pagination .tds-table__footer-btn:disabled:hover{background-color:transparent}:host .tds-table__footer-cell .tds-table__pagination .tds-table__footer-btn-svg{height:20px;width:20px;fill:var(--tds-table-color)}:host(.tds-table--compact){height:32px}:host(.tds-table--compact) .tds-table__footer-cell .tds-table__pagination{height:32px}:host(.tds-table--compact) .tds-table__footer-cell .tds-table__pagination .tds-table__page-selector-input{height:24px}:host(.tds-table--compact) .tds-table__footer-cell .tds-table__pagination .tds-table__footer-btn{height:28px;width:28px}@keyframes tds-shake-animation{10%,90%{transform:translate3d(-1px, 0, 0)}20%,80%{transform:translate3d(2px, 0, 0)}30%,50%,70%{transform:translate3d(-4px, 0, 0)}40%,60%{transform:translate3d(4px, 0, 0)}}";

const relevantTableProps = ['compactDesign'];
function removeShakeAnimation(e) {
  e.target.classList.remove('tds-table__page-selector-input--shake');
}
const TdsTableFooter$1 = /*@__PURE__*/ proxyCustomElement(class TdsTableFooter extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.tdsPagination = createEvent(this, "tdsPagination", 7);
    this.previousPage = () => {
      /** If pages and greater or equal to 2, decrease pagination value.
       * This is to not get under 1 in pagination value.  */
      if (this.paginationValue >= 2) {
        this.paginationValue--;
      }
      /* Emits pagination event. */
      this.tdsPagination.emit({
        tableId: this.tableId,
        paginationValue: Number(this.paginationValue),
      });
      this.storeLastCorrectValue(this.paginationValue);
    };
    this.nextPage = () => {
      /** If pages and greater or equal to the number of pages, increase pagination value.
       * This is to not get above the number of pages in pagination value.  */
      if (this.paginationValue <= this.pages) {
        this.paginationValue++;
      }
      this.tdsPagination.emit({
        tableId: this.tableId,
        paginationValue: Number(this.paginationValue),
      });
      this.storeLastCorrectValue(this.paginationValue);
    };
    this.pagination = false;
    this.paginationValue = 1;
    this.pages = null;
    this.cols = null;
    this.columnsNumber = 0;
    this.compactDesign = false;
    this.lastCorrectValue = undefined;
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
  connectedCallback() {
    this.tableEl = this.host.closest('tds-table');
    this.tableId = this.tableEl.tableId;
  }
  componentWillLoad() {
    relevantTableProps.forEach((tablePropName) => {
      this[tablePropName] = this.tableEl[tablePropName];
    });
    this.storeLastCorrectValue(this.paginationValue);
    /** Get the number of columns. */
    const numberOfColumns = this.host.parentElement.querySelector('tds-table-header').childElementCount;
    if (this.cols) {
      this.columnsNumber = this.cols;
    }
    else {
      this.columnsNumber = numberOfColumns;
    }
  }
  /* Function to store last valid input */
  storeLastCorrectValue(value) {
    this.lastCorrectValue = value;
  }
  paginationInputChange(event) {
    const insertedValue = Number(event.target.value);
    if (insertedValue > event.target.max || insertedValue < event.target.min) {
      event.target.classList.add('tds-table__page-selector-input--shake');
      this.inputElement.value = String(this.lastCorrectValue);
      this.paginationValue = Number(this.inputElement.value);
    }
    else {
      this.paginationValue = insertedValue;
    }
    this.tdsPagination.emit({
      tableId: this.tableId,
      paginationValue: Number(this.paginationValue),
    });
    this.storeLastCorrectValue(this.paginationValue);
  }
  render() {
    return (h(Host, { class: this.compactDesign ? 'tds-table--compact' : '' }, h("tr", { class: "tds-table__footer-row" }, h("td", { class: "tds-table__footer-cell", colSpan: this.columnsNumber }, this.pagination && (h("div", { class: "tds-table__pagination" }, h("div", { class: "tds-table__row-selector" }), h("div", { class: "tds-table__page-selector" }, h("input", { ref: (element) => (this.inputElement = element), class: "tds-table__page-selector-input", type: "number", min: "1", max: this.pages, value: this.paginationValue, pattern: "[0-9]+", dir: "ltr", onChange: (event) => this.paginationInputChange(event), onAnimationEnd: removeShakeAnimation }), h("p", { class: "tds-table__footer-text" }, "of ", h("span", null, this.pages), " pages"), h("button", { type: "button", class: "tds-table__footer-btn", disabled: this.paginationValue <= 1, onClick: () => this.previousPage() }, h("tds-icon", { name: "chevron_left", size: "20px" })), h("button", { type: "button", class: "tds-table__footer-btn", disabled: this.paginationValue >= this.pages, onClick: () => this.nextPage() }, h("tds-icon", { name: "chevron_right", size: "20px" })))))))));
  }
  get host() { return this; }
  static get style() { return tableFooterCss; }
}, [1, "tds-table-footer", {
    "pagination": [516],
    "paginationValue": [1538, "pagination-value"],
    "pages": [514],
    "cols": [2],
    "columnsNumber": [32],
    "compactDesign": [32],
    "lastCorrectValue": [32],
    "tableId": [32]
  }, [[16, "internalTdsTablePropChange", "internalTdsPropChangeListener"]]]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tds-table-footer", "tds-icon"];
  components.forEach(tagName => { switch (tagName) {
    case "tds-table-footer":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TdsTableFooter$1);
      }
      break;
    case "tds-icon":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const TdsTableFooter = TdsTableFooter$1;
const defineCustomElement = defineCustomElement$1;

export { TdsTableFooter, defineCustomElement };
