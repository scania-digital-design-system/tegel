import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const folderTabCss = ":host{box-sizing:border-box;position:relative}:host *{box-sizing:border-box}:host ::slotted(*){all:unset;min-width:142px;display:block;width:calc(100% - 32px);font:var(--tds-headline-07);letter-spacing:var(--tds-headline-07-ls);cursor:pointer;padding:16px;white-space:nowrap;text-decoration:none;text-align:left;outline:none;border:none;border-left:1px solid;border-left-color:transparent}:host ::slotted(*:focus-visible){outline:2px solid var(--tds-blue-400);outline-offset:-2px}:host div:not(.selected){background-color:var(--tds-folder-tab-background)}:host div:not(.selected) ::slotted(*){border-left-color:var(--tds-folder-tab-divider-color);border-top:2px solid var(--tds-folder-tab-background);color:var(--tds-folder-tab-item-color)}:host div:not(.selected):hover:not(.disabled){background-color:var(--tds-folder-tab-background-hover);cursor:pointer}:host div:not(.selected):hover:not(.disabled) ::slotted(*){border-top-color:var(--tds-folder-tab-background-hover);color:var(--tds-folder-tab-color)}:host div:not(.selected).disabled ::slotted(*){color:var(--tds-folder-tab-item-color-disabled)}:host div:not(.selected).disabled ::slotted(*:focus-visible){outline:none}:host div:not(.selected).disabled ::slotted(*:hover){cursor:not-allowed}:host div:not(.selected).disabled ::slotted(*::after){content:none}:host .selected{background-color:var(--tds-folder-tab-background-selected);border-top:2px solid var(--tds-folder-tab-border-selected)}:host .selected::after{content:\" \";background-color:var(--tds-folder-tab-background-selected);width:1px;top:0;bottom:0;right:-1px;display:block;position:absolute;z-index:1}:host .selected ::slotted(*){color:var(--tds-folder-tab-color)}:host(.first) :not(.selected) ::slotted(*){border-left-color:transparent}";

const TdsFolderTab$1 = /*@__PURE__*/ proxyCustomElement(class TdsFolderTab extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.disabled = false;
    this.selected = false;
    this.tabWidth = undefined;
  }
  /** @internal Method to set the width of the tab. Used by the <tds-folder-tabs> */
  async setTabWidth(width) {
    this.tabWidth = width;
  }
  /** @internal Method to set the tab as selected. Used by the <tds-folder-tabs> */
  async setSelected(selected) {
    this.selected = selected;
  }
  render() {
    return (h(Host, { role: "listitem" }, h("div", { class: `${this.disabled ? 'disabled' : ''}
                  ${this.selected ? 'selected' : ''}`, style: { width: `${this.tabWidth}px` } }, h("slot", null))));
  }
  static get style() { return folderTabCss; }
}, [1, "tds-folder-tab", {
    "disabled": [4],
    "selected": [32],
    "tabWidth": [32],
    "setTabWidth": [64],
    "setSelected": [64]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tds-folder-tab"];
  components.forEach(tagName => { switch (tagName) {
    case "tds-folder-tab":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TdsFolderTab$1);
      }
      break;
  } });
}

const TdsFolderTab = TdsFolderTab$1;
const defineCustomElement = defineCustomElement$1;

export { TdsFolderTab, defineCustomElement };
