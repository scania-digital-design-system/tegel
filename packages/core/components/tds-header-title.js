import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const headerTitleCss = ":host{display:block;flex-shrink:1;box-sizing:border-box;color:var(--tds-header-nav-item-color);font-weight:normal;font-family:var(--tds-font-family-headline);letter-spacing:normal;position:relative;white-space:nowrap;text-overflow:ellipsis;overflow:hidden}:host slot{display:block;align-items:center;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;padding:0 32px 0 16px}";

const TdsHeaderTitle$1 = /*@__PURE__*/ proxyCustomElement(class TdsHeaderTitle extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
  }
  render() {
    return (h(Host, null, h("div", { class: "component" }, h("slot", null))));
  }
  static get style() { return headerTitleCss; }
}, [1, "tds-header-title"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tds-header-title"];
  components.forEach(tagName => { switch (tagName) {
    case "tds-header-title":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TdsHeaderTitle$1);
      }
      break;
  } });
}

const TdsHeaderTitle = TdsHeaderTitle$1;
const defineCustomElement = defineCustomElement$1;

export { TdsHeaderTitle, defineCustomElement };
