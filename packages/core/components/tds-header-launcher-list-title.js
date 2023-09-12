import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { g as generateUniqueId } from './utils.js';

const headerLauncherListTitleCss = ".tds-header-launcher-list-title{all:unset;box-sizing:border-box;font:var(--tds-detail-06);letter-spacing:var(--tds-detail-06-ls);color:var(--tds-header-app-launcher-category-title-color);text-transform:uppercase;height:48px;padding:0 16px;display:flex;align-items:center;border-bottom:1px solid var(--tds-nav-dropdown-item-border-color);margin:0}";

const TdsHeaderLauncherListTitle$1 = /*@__PURE__*/ proxyCustomElement(class TdsHeaderLauncherListTitle extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.uuid = generateUniqueId();
  }
  render() {
    return (h(Host, null, h("h3", { class: "tds-header-launcher-list-title", id: `tds-header-launcher-${this.uuid}` }, h("slot", null))));
  }
  get host() { return this; }
  static get style() { return headerLauncherListTitleCss; }
}, [4, "tds-header-launcher-list-title"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tds-header-launcher-list-title"];
  components.forEach(tagName => { switch (tagName) {
    case "tds-header-launcher-list-title":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TdsHeaderLauncherListTitle$1);
      }
      break;
  } });
}

const TdsHeaderLauncherListTitle = TdsHeaderLauncherListTitle$1;
const defineCustomElement = defineCustomElement$1;

export { TdsHeaderLauncherListTitle, defineCustomElement };
