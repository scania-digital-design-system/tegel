import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const sideMenuUserLabelCss = ":host{display:block;font:var(--tds-headline-07);letter-spacing:var(--tds-headline-07-ls);color:var(--tds-sidebar-side-menu-single-item-color)}:host .subheading{color:var(--tds-grey-500)}";

const TdsSideMenuUserLabel = /*@__PURE__*/ proxyCustomElement(class TdsSideMenuUserLabel extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.heading = undefined;
    this.subheading = undefined;
  }
  render() {
    return (h(Host, null, this.heading, this.subheading && h("div", { class: "subheading" }, this.subheading)));
  }
  static get style() { return sideMenuUserLabelCss; }
}, [1, "tds-side-menu-user-label", {
    "heading": [1],
    "subheading": [1]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tds-side-menu-user-label"];
  components.forEach(tagName => { switch (tagName) {
    case "tds-side-menu-user-label":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TdsSideMenuUserLabel);
      }
      break;
  } });
}

export { TdsSideMenuUserLabel as T, defineCustomElement as d };
