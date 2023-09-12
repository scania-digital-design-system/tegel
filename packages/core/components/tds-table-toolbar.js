import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { d as defineCustomElement$2 } from './icon.js';

const tableToolbarCss = ":host{box-sizing:border-box;display:table-caption;position:relative;background-color:var(--tds-table-toolbar-background);color:var(--tds-table-color);padding:0 var(--tds-spacing-element-16);height:64px;border-top-left-radius:4px;border-top-right-radius:4px}:host *{box-sizing:border-box}:host .tds-table__upper-bar-flex{width:100%;height:100%;display:flex;justify-content:space-between}:host .tds-table__title{font:var(--tds-headline-07);letter-spacing:var(--tds-headline-07-ls);padding-top:var(--tds-spacing-element-16);text-align:left}:host .tds-table__actionbar,:host slot[name=end]::slotted(*){display:flex;align-self:center}:host .tds-table__searchbar{display:flex;align-self:center;position:relative;height:40px;width:40px;border-radius:4px 4px 0 0;transition:background-color 250ms ease, width 250ms ease;overflow:hidden;background-color:transparent}:host .tds-table__searchbar::after{content:\"\";width:100%;height:2px;position:absolute;bottom:0;background-color:var(--tds-blue-400);transform:scaleX(0);transition:transform 150ms ease}:host .tds-table__searchbar:focus-within::after{transform:scaleX(100%)}:host .tds-table__searchbar:focus-within,:host .tds-table__searchbar.tds-table__searchbar--active{width:208px;background-color:var(--tds-table-toolbar-searchbar-background)}:host .tds-table__searchbar:focus-within:hover,:host .tds-table__searchbar.tds-table__searchbar--active:hover{background-color:var(--tds-table-toolbar-searchbar-background)}:host .tds-table__searchbar .tds-table__searchbar-input{font:var(--tds-detail-02);letter-spacing:var(--tds-detail-02-ls);color:var(--tds-table-color);z-index:1;width:100%;height:100%;border:none;padding:0 36px 0 16px;background-color:transparent;outline:none;cursor:pointer}:host .tds-table__searchbar .tds-table__searchbar-input :focus{background-color:var(--tds-table-toolbar-searchbar-background)}:host .tds-table__searchbar:hover{background-color:var(--tds-table-toolbar-searchbar-background-hover)}:host .tds-table__searchbar .tds-table__searchbar-icon{z-index:0;position:absolute;right:9px;top:9px;width:20px;height:20px}:host(.tds-table--compact){height:56px}";

const relevantTableProps = [
  'compactDesign',
  'noMinWidth',
  'verticalDividers',
];
const TdsTableToolbar$1 = /*@__PURE__*/ proxyCustomElement(class TdsTableToolbar extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.tdsFilter = createEvent(this, "tdsFilter", 7);
    this.tableTitle = '';
    this.filter = false;
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
  connectedCallback() {
    this.tableEl = this.host.closest('tds-table');
    this.tableId = this.tableEl.tableId;
  }
  componentWillLoad() {
    relevantTableProps.forEach((tablePropName) => {
      this[tablePropName] = this.tableEl[tablePropName];
    });
  }
  handleSearch(event) {
    const searchTerm = event.currentTarget.value.toLowerCase();
    const tdsTableSearchBar = event.currentTarget.parentElement;
    this.tdsFilter.emit({
      tableId: this.tableId,
      query: searchTerm,
    });
    /** NOTE: Could these be handles in pure CSS? */
    if (searchTerm.length > 0) {
      tdsTableSearchBar.classList.add('tds-table__searchbar--active');
    }
    else {
      tdsTableSearchBar.classList.remove('tds-table__searchbar--active');
    }
  }
  render() {
    return (h(Host, { class: this.compactDesign ? 'tds-table--compact' : '' }, h("div", { class: "tds-table__upper-bar-flex" }, h("caption", { class: "tds-table__title" }, this.tableTitle), h("div", { class: "tds-table__actionbar" }, this.filter && (h("div", { class: "tds-table__searchbar" }, h("input", { class: "tds-table__searchbar-input", type: "text", onKeyUp: (event) => this.handleSearch(event) }), h("span", { class: "tds-table__searchbar-icon" }, h("tds-icon", { name: "search", size: "20px" })))), h("slot", { name: "end" })))));
  }
  get host() { return this; }
  static get style() { return tableToolbarCss; }
}, [1, "tds-table-toolbar", {
    "tableTitle": [513, "table-title"],
    "filter": [516],
    "verticalDividers": [32],
    "compactDesign": [32],
    "noMinWidth": [32],
    "whiteBackground": [32],
    "tableId": [32]
  }, [[16, "internalTdsTablePropChange", "internalTdsPropChangeListener"]]]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tds-table-toolbar", "tds-icon"];
  components.forEach(tagName => { switch (tagName) {
    case "tds-table-toolbar":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TdsTableToolbar$1);
      }
      break;
    case "tds-icon":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const TdsTableToolbar = TdsTableToolbar$1;
const defineCustomElement = defineCustomElement$1;

export { TdsTableToolbar, defineCustomElement };
