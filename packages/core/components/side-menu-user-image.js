import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const sideMenuUserImageCss = ":host img,:host ::slotted(*){width:34px;height:34px;border-radius:50%}";

const TdsSideMenuUserImage = /*@__PURE__*/ proxyCustomElement(class TdsSideMenuUserImage extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.src = undefined;
    this.alt = undefined;
  }
  render() {
    return (h(Host, null, h("slot", null), this.src && h("img", { src: this.src, alt: this.alt })));
  }
  static get style() { return sideMenuUserImageCss; }
}, [1, "tds-side-menu-user-image", {
    "src": [1],
    "alt": [1]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tds-side-menu-user-image"];
  components.forEach(tagName => { switch (tagName) {
    case "tds-side-menu-user-image":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TdsSideMenuUserImage);
      }
      break;
  } });
}

export { TdsSideMenuUserImage as T, defineCustomElement as d };
