import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';

const tableHeaderCellCss = ":host(.tds-table__header-cell){box-sizing:border-box;font:var(--tds-headline-07);letter-spacing:var(--tds-headline-07-ls);display:table-cell;text-align:left;color:var(--tds-table-color);background-color:var(--tds-table-header-background);border-bottom:1px solid var(--tds-table-header-background-hover);padding:0;height:48px;min-width:192px;box-sizing:border-box;vertical-align:middle;overflow:hidden;transition:background-color 200ms ease}:host(.tds-table__header-cell) *{box-sizing:border-box}:host(.tds-table__header-cell) .tds-table__header-text{padding:0 16px;margin:0}:host(.tds-table__header-cell--sortable) .tds-table__header-button{display:flex;align-items:center;gap:8px;justify-content:start;flex-direction:row;width:100%;height:100%;padding:0 16px;background-color:transparent;border:none;cursor:pointer;transition:background-color 200ms ease}:host(.tds-table__header-cell--sortable) .tds-table__header-button:focus{outline:2px solid var(--tds-table-header-btn-focus);outline-offset:-2px}:host(.tds-table__header-cell--sortable) .tds-table__header-button:focus .tds-table__header-button-icon{opacity:1}:host(.tds-table__header-cell--sortable) .tds-table__header-button .tds-table__header-button-text{font:var(--tds-headline-07);letter-spacing:var(--tds-headline-07-ls);text-align:left;color:var(--tds-table-header-btn-color)}:host(.tds-table__header-cell--sortable) .tds-table__header-button .tds-table__header-button-icon{flex:0 0 16px;height:16px;width:16px;opacity:0;transform-origin:center;transition:opacity 200ms ease-in, transform 200ms ease;fill:var(--tds-table-color)}:host(.tds-table__header-cell--sortable) .tds-table__header-button:hover .tds-table__header-button-icon{opacity:1}:host(.tds-table__header-cell--right-align) .tds-table__header-button{text-align:right;justify-content:end;flex-direction:row-reverse}:host(.tds-table__header-cell--is-sorted) .tds-table__header-button{background-color:var(--tds-table-header-btn-background)}:host(.tds-table__header-cell--is-sorted) .tds-table__header-button:hover{background-color:var(--tds-table-header-btn-background-hover)}:host(.tds-table__header-cell--is-sorted) .tds-table__header-button .tds-table__header-button-icon{opacity:1}:host(.tds-table__header-cell--is-sorted) .tds-table__header-button .tds-table__header-button-icon--rotate{transform:rotate(180deg)}:host(.tds-table--compact){height:33px}:host(.tds-table--divider){border-right:1px solid var(--tds-table-divider)}:host(.tds-table--divider:last-of-type){border-right:none}:host(.tds-table--no-min-width){min-width:unset}:host(.tds-table__header-cell:first-of-type){border-top-left-radius:4px}:host(.tds-table__header-cell:last-of-type){border-top-right-radius:4px}:host(.tds-table--extra-column:first-of-type){border-top-left-radius:0}:host(.tds-table--toolbar-available){border-radius:0}:host(.tds-table--extra-column.tds-table--toolbar-available){border-radius:0}:host(.tds-table__header-cell.tds-table--toolbar-available:first-of-type){border-top-left-radius:0}:host(.tds-table__header-cell.tds-table--toolbar-available:last-of-type){border-top-right-radius:0}";

const relevantTableProps = [
  'multiselect',
  'expandableRows',
  'compactDesign',
  'noMinWidth',
  'verticalDividers',
];
const TdsTableHeaderCell = /*@__PURE__*/ proxyCustomElement(class TdsTableHeaderCell extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.tdsSort = createEvent(this, "tdsSort", 7);
    this.internalSortButtonClicked = createEvent(this, "internalSortButtonClicked", 6);
    this.internalTdsTextAlign = createEvent(this, "internalTdsTextAlign", 6);
    this.internalTdsHover = createEvent(this, "internalTdsHover", 6);
    this.sortButtonClick = () => {
      // Toggling direction of sorting as we only use one button for sorting
      if (this.sortingDirection !== 'asc') {
        this.sortingDirection = 'asc';
      }
      else {
        this.sortingDirection = 'desc';
      }
      // Settings to true we can set enable CSS class for "active" state of column
      this.sortedByMyKey = true;
      /* Emit sort event */
      this.tdsSort.emit({
        tableId: this.tableId,
        columnKey: this.cellKey,
        sortingDirection: this.sortingDirection,
      });
      /**
       * Emits sortButtonClicked event which is listened to by all the header-cells.
       * This resets the sorting button in the header-cell that was not clicked.
       */
      this.internalSortButtonClicked.emit({
        tableId: this.tableId,
        key: this.cellKey,
      });
    };
    this.headerCellContent = () => {
      if (this.sortable) {
        return (h("button", { class: "tds-table__header-button", onClick: () => this.sortButtonClick() }, h("span", { class: "tds-table__header-button-text", style: { textAlign: this.textAlignState } }, this.cellValue), this.sortingDirection === null && (h("svg", { class: "tds-table__header-button-icon", fill: "currentColor", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 12 15" }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M8.45 13.67V4.62a.5.5 0 0 1 1 0v9.05h-1Z" }), h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M6.07 10.28a.5.5 0 0 1 .7.08l2.1 2.66a.1.1 0 0 0 .15 0l2.09-2.66a.5.5 0 1 1 .78.62l-2.08 2.66a1.1 1.1 0 0 1-1.73 0l-2.1-2.66a.5.5 0 0 1 .1-.7ZM3.55.4v9.04a.5.5 0 1 1-1 0V.39h1Z" }), h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M5.93 3.78a.5.5 0 0 1-.7-.08l-2.1-2.66a.1.1 0 0 0-.15 0L.89 3.7a.5.5 0 0 1-.78-.62L2.19.42a1.1 1.1 0 0 1 1.73 0l2.1 2.66a.5.5 0 0 1-.1.7Z" }))), this.sortingDirection && (h("svg", { class: `tds-table__header-button-icon ${this.sortingDirection === 'desc' ? 'tds-table__header-button-icon--rotate' : ''}`, fill: "currentColor", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 32" }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M17 2.974a1 1 0 0 0-2 0v24.3l-9.312-9.312a1 1 0 0 0-1.414 1.414l9.887 9.888a2.6 2.6 0 0 0 3.677 0l9.888-9.888a1 1 0 0 0-1.414-1.414L17 27.274v-24.3Z" })))));
      }
      return (h("p", { class: "tds-table__header-text", style: { textAlign: this.textAlignState } }, this.cellValue));
    };
    this.onHeadCellHover = (key) => {
      this.internalTdsHover.emit({
        tableId: this.tableId,
        key,
      });
    };
    this.cellKey = undefined;
    this.cellValue = undefined;
    this.customWidth = undefined;
    this.sortable = false;
    this.textAlign = undefined;
    this.textAlignState = undefined;
    this.sortingDirection = 'asc';
    this.sortedByMyKey = false;
    this.verticalDividers = false;
    this.compactDesign = false;
    this.noMinWidth = false;
    this.multiselect = false;
    this.enableToolbarDesign = false;
    this.tableId = '';
    this.expandableRows = false;
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
  updateOptionsContent(event) {
    const { tableId, key } = event.detail;
    if (this.tableId === tableId) {
      if (this.cellKey !== key) {
        this.sortedByMyKey = false;
        // To sync with CSS transition timing
        setTimeout(() => {
          this.sortingDirection = null;
        }, 200);
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
  componentWillRender() {
    // enable only right or left text align
    if (this.textAlign === 'right' || this.textAlign === 'end') {
      this.textAlignState = 'right';
    }
    else {
      this.textAlignState = 'left';
    }
    // To enable body cells text align per rules set in head cell
    this.internalTdsTextAlign.emit([this.tableId, this.cellKey, this.textAlignState]);
    this.enableToolbarDesign =
      this.host.closest('tds-table').getElementsByTagName('tds-table-toolbar').length >= 1;
  }
  render() {
    return (h(Host, { class: {
        'tds-table__header-cell': true,
        'tds-table__header-cell--sortable': this.sortable,
        'tds-table__header-cell--is-sorted': this.sortedByMyKey,
        'tds-table__header-cell--custom-width': this.customWidth !== '',
        'tds-table__header-cell--right-align': this.textAlignState === 'right',
        'tds-table--compact': this.compactDesign,
        'tds-table--divider': this.verticalDividers,
        'tds-table--no-min-width': this.noMinWidth,
        'tds-table--extra-column': this.multiselect || this.expandableRows,
        'tds-table--toolbar-available': this.enableToolbarDesign,
      }, style: { width: this.customWidth },
      // Calling actions from here to enable hover functionality for both sortable and unsortable Tables
      onMouseOver: () => this.onHeadCellHover(this.cellKey), onMouseLeave: () => this.onHeadCellHover('') }, this.headerCellContent()));
  }
  get host() { return this; }
  static get style() { return tableHeaderCellCss; }
}, [1, "tds-header-cell", {
    "cellKey": [513, "cell-key"],
    "cellValue": [513, "cell-value"],
    "customWidth": [513, "custom-width"],
    "sortable": [4],
    "textAlign": [513, "text-align"],
    "textAlignState": [32],
    "sortingDirection": [32],
    "sortedByMyKey": [32],
    "verticalDividers": [32],
    "compactDesign": [32],
    "noMinWidth": [32],
    "multiselect": [32],
    "enableToolbarDesign": [32],
    "tableId": [32],
    "expandableRows": [32]
  }, [[16, "internalTdsPropChange", "internalTdsPropChangeListener"], [16, "internalSortButtonClicked", "updateOptionsContent"]]]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tds-header-cell"];
  components.forEach(tagName => { switch (tagName) {
    case "tds-header-cell":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TdsTableHeaderCell);
      }
      break;
  } });
}

const TdsHeaderCell = TdsTableHeaderCell;
const defineCustomElement = defineCustomElement$1;

export { TdsHeaderCell, defineCustomElement };
