import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { d as defineCustomElement$2 } from './header-dropdown-list-item.js';

const headerLauncherListItemCss = ":host{display:block;border-bottom:1px solid var(--tds-nav-dropdown-item-border-color)}";

const TdsHeaderLauncherListItem$1 = /*@__PURE__*/ proxyCustomElement(class TdsHeaderLauncherListItem extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
  }
  render() {
    return (h(Host, null, h("tds-header-dropdown-list-item", { size: "lg" }, h("slot", null))));
  }
  static get style() { return headerLauncherListItemCss; }
}, [1, "tds-header-launcher-list-item"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tds-header-launcher-list-item", "tds-header-dropdown-list-item"];
  components.forEach(tagName => { switch (tagName) {
    case "tds-header-launcher-list-item":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TdsHeaderLauncherListItem$1);
      }
      break;
    case "tds-header-dropdown-list-item":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const TdsHeaderLauncherListItem = TdsHeaderLauncherListItem$1;
const defineCustomElement = defineCustomElement$1;

export { TdsHeaderLauncherListItem, defineCustomElement };
