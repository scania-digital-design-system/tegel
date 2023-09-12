import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { d as defineCustomElement$3 } from './core-header-item.js';
import { d as defineCustomElement$2 } from './header-item.js';

const headerBrandSymbolCss = ":host tds-header-item{display:none}:host tds-header-item ::slotted(*){background-image:var(--tds-background-image-scania-symbol-svg), var(--tds-background-image-scania-symbol-png);background-size:30px auto;background-position:center;background-repeat:no-repeat}@media (min-width: 992px){:host tds-header-item{display:block}}";

const TdsHeaderBrandSymbol$1 = /*@__PURE__*/ proxyCustomElement(class TdsHeaderBrandSymbol extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
  }
  render() {
    return (h(Host, null, h("tds-header-item", null, h("slot", null))));
  }
  get host() { return this; }
  static get style() { return headerBrandSymbolCss; }
}, [1, "tds-header-brand-symbol"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tds-header-brand-symbol", "tds-core-header-item", "tds-header-item"];
  components.forEach(tagName => { switch (tagName) {
    case "tds-header-brand-symbol":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TdsHeaderBrandSymbol$1);
      }
      break;
    case "tds-core-header-item":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "tds-header-item":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const TdsHeaderBrandSymbol = TdsHeaderBrandSymbol$1;
const defineCustomElement = defineCustomElement$1;

export { TdsHeaderBrandSymbol, defineCustomElement };
