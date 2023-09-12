import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const navigationTabCss = ":host{box-sizing:border-box;z-index:200;display:block}:host *{box-sizing:border-box}:host ::slotted(*){all:unset;font:var(--tds-headline-07);letter-spacing:var(--tds-headline-07-ls);color:var(--tds-navigation-tabs-tab-color);text-decoration:none;display:block;position:relative;transition:color 0.15s ease-in-out 0s;white-space:nowrap;background-color:transparent;border:0;width:100%;padding:26px 4px}:host ::slotted(*:focus-visible)::before{content:\"\";position:absolute;left:0;right:0;top:26px;bottom:26px;outline:2px solid var(--tds-blue-400)}:host .navigation-tab-item:not(.selected)::after{width:0%;transition:width 0.15s ease-in-out 0s}:host .navigation-tab-item{position:relative;margin-right:32px}:host .navigation-tab-item:hover{cursor:pointer}:host .navigation-tab-item:hover::after{width:100%}:host .navigation-tab-item::after{content:\" \";position:absolute;bottom:0;right:0;left:0;margin-left:auto;width:0%;margin-right:auto;height:2px;background-color:var(--tds-navigation-tabs-tab-indicator-background-hover);z-index:1}:host .selected ::slotted(*){color:var(--tds-navigation-tabs-tab-color-selected)}:host .selected::after{width:100%;background-color:var(--tds-navigation-tabs-tab-indicator-background-active)}:host .disabled{color:var(--tds-navigation-tabs-tab-color-disabled)}:host .disabled ::slotted(*){opacity:var(--tds-navigation-tabs-tab-color-opacity-disabled)}:host .disabled::after{content:none}:host .disabled ::slotted(*:hover){cursor:not-allowed}:host .disabled ::slotted(*:focus-visible){outline:none}:host(.first){margin-left:32px}:host(.last){margin-right:32px}";

const TdsNavigationTab$1 = /*@__PURE__*/ proxyCustomElement(class TdsNavigationTab extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.disabled = false;
    this.selected = false;
  }
  /** @internal Method to set the Tab as selected. Used by the <tds-navigation-tabs> */
  async setSelected(selected) {
    this.selected = selected;
  }
  render() {
    return (h(Host, { role: "listitem" }, h("div", { class: `navigation-tab-item  ${this.selected ? 'selected' : ''}
           ${this.disabled ? 'disabled' : ''}` }, h("slot", null))));
  }
  static get style() { return navigationTabCss; }
}, [1, "tds-navigation-tab", {
    "disabled": [4],
    "selected": [32],
    "setSelected": [64]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tds-navigation-tab"];
  components.forEach(tagName => { switch (tagName) {
    case "tds-navigation-tab":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TdsNavigationTab$1);
      }
      break;
  } });
}

const TdsNavigationTab = TdsNavigationTab$1;
const defineCustomElement = defineCustomElement$1;

export { TdsNavigationTab, defineCustomElement };
