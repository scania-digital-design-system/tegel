import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const coreHeaderItemCss = ":host{font:var(--tds-headline-07);letter-spacing:var(--tds-headline-07-ls);color:var(--tds-header-nav-item-color)}:host .item{all:unset;box-sizing:border-box;display:flex;justify-content:center;align-items:center;min-width:var(--tds-header-height);height:var(--tds-header-height);margin:0}:host .item *{box-sizing:border-box}:host slot{white-space:nowrap}:host ::slotted(svg){font-size:20px}";

const TdsCoreHeaderItem = /*@__PURE__*/ proxyCustomElement(class TdsCoreHeaderItem extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
  }
  render() {
    return (h(Host, null, h("div", { class: "item" }, h("slot", null))));
  }
  static get style() { return coreHeaderItemCss; }
}, [1, "tds-core-header-item"]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tds-core-header-item"];
  components.forEach(tagName => { switch (tagName) {
    case "tds-core-header-item":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TdsCoreHeaderItem);
      }
      break;
  } });
}

export { TdsCoreHeaderItem as T, defineCustomElement as d };
