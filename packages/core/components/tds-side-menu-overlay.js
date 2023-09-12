import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const sideMenuOverlayCss = ":host{position:fixed;width:100%;height:100%;background-color:black}div{position:fixed;width:100%;height:100%;pointer-events:none}";

const TdsSideMenuOverlay$1 = /*@__PURE__*/ proxyCustomElement(class TdsSideMenuOverlay extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
  }
  render() {
    return (h(Host, null, h("div", null)));
  }
  static get style() { return sideMenuOverlayCss; }
}, [1, "tds-side-menu-overlay"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tds-side-menu-overlay"];
  components.forEach(tagName => { switch (tagName) {
    case "tds-side-menu-overlay":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TdsSideMenuOverlay$1);
      }
      break;
  } });
}

const TdsSideMenuOverlay = TdsSideMenuOverlay$1;
const defineCustomElement = defineCustomElement$1;

export { TdsSideMenuOverlay, defineCustomElement };
