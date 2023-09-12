import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const accordionCss = ":host{display:block;box-sizing:border-box}:host *{box-sizing:border-box}:host .tds-accordion-header-icon-start,:host .tds-accordion-header-icon-end{position:relative}:host(:focus){outline:2px solid var(--tds-blue-400);outline-offset:-2px}:host(:focus) .tds-accordion-item .tds-accordion-header-icon-start,:host(:focus) .tds-accordion-item .tds-accordion-header-icon-end{background-color:var(--tds-accordion-background-focus);outline:none}:host(:focus) .tds-accordion-item .tds-accordion-header-icon-start::after,:host(:focus) .tds-accordion-item .tds-accordion-header-icon-end::after{border-color:var(--tds-accordion-border-focus)}:host(:focus) .disabled,:host(:focus) .disabled *{cursor:not-allowed}:host(:focus) .disabled .tds-accordion-header-icon-start,:host(:focus) .disabled .tds-accordion-header-icon-end{background-color:var(--tds-accordion-bg);outline:none;pointer-events:none}:host(:focus) .disabled .tds-accordion-header-icon-start::after,:host(:focus) .disabled .tds-accordion-header-icon-end::after{border-color:transparent}:host(:active) .tds-accordion-header-icon-start,:host(:active) .tds-accordion-header-icon-end{background-color:var(--tds-accordion-background-active);outline:none}:host(:active) .disabled,:host(:active) .disabled *{cursor:not-allowed}:host(:active) .disabled .tds-accordion-header-icon-start,:host(:active) .disabled .tds-accordion-header-icon-end{background-color:var(--tds-accordion-bg);outline:none;pointer-events:none}:host(:active) .disabled .tds-accordion-header-icon-start::after,:host(:active) .disabled .tds-accordion-header-icon-end::after{border-color:transparent}:host(:last-child){border-bottom:1px solid var(--tds-accordion-border)}";

const TdsAccordion$1 = /*@__PURE__*/ proxyCustomElement(class TdsAccordion extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.modeVariant = null;
  }
  render() {
    return (h(Host, { class: `tds-accordion ${this.modeVariant !== null ? `tds-mode-variant-${this.modeVariant}` : ''}` }, h("slot", null)));
  }
  static get style() { return accordionCss; }
}, [1, "tds-accordion", {
    "modeVariant": [1, "mode-variant"]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tds-accordion"];
  components.forEach(tagName => { switch (tagName) {
    case "tds-accordion":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TdsAccordion$1);
      }
      break;
  } });
}

const TdsAccordion = TdsAccordion$1;
const defineCustomElement = defineCustomElement$1;

export { TdsAccordion, defineCustomElement };
