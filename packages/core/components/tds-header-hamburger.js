import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { i as inheritAriaAttributes } from './utils.js';
import { d as defineCustomElement$4 } from './core-header-item.js';
import { d as defineCustomElement$3 } from './header-item.js';
import { d as defineCustomElement$2 } from './icon.js';

const headerHamburgerCss = ":host{color:var(--tds-white)}:host tds-header-item{display:block}:host .icon{position:relative;margin-left:-6px;left:3px;transition:background 0.2s ease-in-out, color 0.2s ease-in-out}@media screen and (min-width: 992px){:host tds-header-item{display:none}:host([persistent]) tds-header-item{display:block}}";

const TdsHeaderHamburger$1 = /*@__PURE__*/ proxyCustomElement(class TdsHeaderHamburger extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
  }
  render() {
    const inheritedButtonProps = Object.assign({}, inheritAriaAttributes(this.host));
    return (h(Host, null, h("tds-header-item", null, h("button", Object.assign({}, inheritedButtonProps), h("tds-icon", { class: "icon", name: "burger", size: "20px" })))));
  }
  get host() { return this; }
  static get style() { return headerHamburgerCss; }
}, [1, "tds-header-hamburger"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tds-header-hamburger", "tds-core-header-item", "tds-header-item", "tds-icon"];
  components.forEach(tagName => { switch (tagName) {
    case "tds-header-hamburger":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TdsHeaderHamburger$1);
      }
      break;
    case "tds-core-header-item":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "tds-header-item":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "tds-icon":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const TdsHeaderHamburger = TdsHeaderHamburger$1;
const defineCustomElement = defineCustomElement$1;

export { TdsHeaderHamburger, defineCustomElement };
