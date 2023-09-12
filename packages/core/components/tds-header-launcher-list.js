import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { g as generateUniqueId } from './utils.js';
import { d as defineCustomElement$2 } from './header-dropdown-list.js';

const TdsHeaderLauncherList$1 = /*@__PURE__*/ proxyCustomElement(class TdsHeaderLauncherList extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.uuid = generateUniqueId();
  }
  render() {
    return (h(Host, null, h("tds-header-dropdown-list", { size: "lg" }, h("slot", null))));
  }
}, [4, "tds-header-launcher-list"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tds-header-launcher-list", "tds-header-dropdown-list"];
  components.forEach(tagName => { switch (tagName) {
    case "tds-header-launcher-list":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TdsHeaderLauncherList$1);
      }
      break;
    case "tds-header-dropdown-list":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const TdsHeaderLauncherList = TdsHeaderLauncherList$1;
const defineCustomElement = defineCustomElement$1;

export { TdsHeaderLauncherList, defineCustomElement };
