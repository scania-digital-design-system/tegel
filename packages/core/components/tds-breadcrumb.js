import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';

const breadcrumbCss = "@charset \"UTF-8\";[role=listitem] ::slotted(*){color:var(--tds-breadcrumb-color);text-decoration:none}[role=listitem]:hover ::slotted(*){color:var(--tds-breadcrumb-color-hover);text-decoration:underline}[role=listitem]:focus-visible{outline:2px solid var(--tds-blue-400);outline-offset:-2px}[role=listitem].current ::slotted(*),[role=listitem] [aria-current=page] ::slotted(*){pointer-events:none;cursor:default;color:var(--tds-breadcrumb-color-current)}[role=listitem].current:hover ::slotted(*),[role=listitem] [aria-current=page]:hover ::slotted(*){text-decoration:none;cursor:not-allowed}[role=listitem] ::slotted(*)::after{content:\"›\";color:var(--tds-breadcrumb-separator-color);margin-right:4px;margin-left:4px;display:inline-block;width:4px;height:8px}:host(:last-of-type) ::slotted(*)::after{display:none}";

const TdsBreadcrumb$1 = /*@__PURE__*/ proxyCustomElement(class TdsBreadcrumb extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.current = false;
  }
  render() {
    return (h("div", { role: "listitem", class: `${this.current ? 'current' : ''}` }, h("slot", null)));
  }
  static get style() { return breadcrumbCss; }
}, [1, "tds-breadcrumb", {
    "current": [4]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tds-breadcrumb"];
  components.forEach(tagName => { switch (tagName) {
    case "tds-breadcrumb":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TdsBreadcrumb$1);
      }
      break;
  } });
}

const TdsBreadcrumb = TdsBreadcrumb$1;
const defineCustomElement = defineCustomElement$1;

export { TdsBreadcrumb, defineCustomElement };
