import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';

const breadcrumbsCss = ":host{box-sizing:border-box}:host *{box-sizing:border-box}:host [role=list]{padding:0;margin:0;font:var(--tds-detail-02);letter-spacing:var(--tds-detail-02-ls);display:flex;flex-wrap:wrap;list-style-type:none}";

const TdsBreadcrumbs$1 = /*@__PURE__*/ proxyCustomElement(class TdsBreadcrumbs extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
  }
  render() {
    return (h("nav", null, h("div", { role: "list", class: 'tds-breadcrumb' }, h("slot", null))));
  }
  get el() { return this; }
  static get style() { return breadcrumbsCss; }
}, [1, "tds-breadcrumbs"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tds-breadcrumbs"];
  components.forEach(tagName => { switch (tagName) {
    case "tds-breadcrumbs":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TdsBreadcrumbs$1);
      }
      break;
  } });
}

const TdsBreadcrumbs = TdsBreadcrumbs$1;
const defineCustomElement = defineCustomElement$1;

export { TdsBreadcrumbs, defineCustomElement };
