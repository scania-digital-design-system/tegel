import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const dividerCss = ".divider{box-sizing:border-box}.divider *{box-sizing:border-box}.divider.horizontal{background-color:var(--tds-divider-background);width:100%;height:1px}.divider.vertical{background-color:var(--tds-divider-background);height:100%;width:1px}";

const Divider = /*@__PURE__*/ proxyCustomElement(class Divider extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.orientation = 'horizontal';
  }
  render() {
    return (h(Host, { role: "separator", "aria-orientation": this.orientation === 'vertical' ? 'vertical' : undefined }, h("div", { class: `divider ${this.orientation}` })));
  }
  static get style() { return dividerCss; }
}, [1, "tds-divider", {
    "orientation": [1]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tds-divider"];
  components.forEach(tagName => { switch (tagName) {
    case "tds-divider":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, Divider);
      }
      break;
  } });
}

export { Divider as D, defineCustomElement as d };
