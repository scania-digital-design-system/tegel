import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { d as defineCustomElement$3 } from './side-menu-user-image.js';
import { d as defineCustomElement$2 } from './side-menu-user-label.js';

const sideMenuUserCss = ":host{display:flex;align-items:center;gap:12px;height:68px}:host tds-side-menu-user-image{margin-left:-4px}";

const TdsSideMenuUser$1 = /*@__PURE__*/ proxyCustomElement(class TdsSideMenuUser extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.heading = undefined;
    this.subheading = undefined;
    this.imgSrc = undefined;
    this.imgAlt = undefined;
  }
  render() {
    return (h(Host, null, h("tds-side-menu-user-image", { src: this.imgSrc, alt: this.imgAlt }, h("slot", { name: "image" })), h("tds-side-menu-user-label", { heading: this.heading, subheading: this.subheading })));
  }
  static get style() { return sideMenuUserCss; }
}, [1, "tds-side-menu-user", {
    "heading": [1],
    "subheading": [1],
    "imgSrc": [1, "img-src"],
    "imgAlt": [1, "img-alt"]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tds-side-menu-user", "tds-side-menu-user-image", "tds-side-menu-user-label"];
  components.forEach(tagName => { switch (tagName) {
    case "tds-side-menu-user":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TdsSideMenuUser$1);
      }
      break;
    case "tds-side-menu-user-image":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "tds-side-menu-user-label":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const TdsSideMenuUser = TdsSideMenuUser$1;
const defineCustomElement = defineCustomElement$1;

export { TdsSideMenuUser, defineCustomElement };
