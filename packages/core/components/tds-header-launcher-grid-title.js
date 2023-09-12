import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { g as generateUniqueId } from './utils.js';

const headerLauncherGridTitleCss = ".tds-header-launcher-grid-title{all:unset;box-sizing:border-box;font:var(--tds-detail-04);letter-spacing:var(--tds-detail-04-ls);color:var(--tds-header-app-launcher-grid-category-title-color);text-transform:uppercase;height:48px;padding:0 16px;display:flex;align-items:center;border-bottom:1px solid var(--tds-nav-dropdown-item-border-color);margin:0}";

const TdsHeaderLauncherGridTitle$1 = /*@__PURE__*/ proxyCustomElement(class TdsHeaderLauncherGridTitle extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.uuid = generateUniqueId();
  }
  render() {
    return (h(Host, null, h("h3", { class: "tds-header-launcher-grid-title", id: `tds-header-launcher-grid-title-${this.uuid}` }, h("slot", null))));
  }
  static get style() { return headerLauncherGridTitleCss; }
}, [4, "tds-header-launcher-grid-title"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tds-header-launcher-grid-title"];
  components.forEach(tagName => { switch (tagName) {
    case "tds-header-launcher-grid-title":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TdsHeaderLauncherGridTitle$1);
      }
      break;
  } });
}

const TdsHeaderLauncherGridTitle = TdsHeaderLauncherGridTitle$1;
const defineCustomElement = defineCustomElement$1;

export { TdsHeaderLauncherGridTitle, defineCustomElement };
