import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';

const blockCss = ".tds-block{box-sizing:border-box;color:var(--tds-block-color);border-radius:4px;padding:16px;font:var(--tds-body-01);letter-spacing:var(--tds-body-01-ls);background-color:var(--tds-block-background)}.tds-block *{box-sizing:border-box}.tds-mode-variant-primary{--tds-block-background:var(--tds-block-background-primary);--tds-block-background-nested:var(--tds-block-background-nested-primary)}.tds-mode-variant-secondary{--tds-block-background:var(--tds-block-background-secondary);--tds-block-background-nested:var(--tds-block-background-nested-secondary)}";

const TdsBlock$1 = /*@__PURE__*/ proxyCustomElement(class TdsBlock extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.modeVariant = null;
  }
  connectedCallback() {
    this.children = Array.from(this.host.children).filter((item) => item.tagName === 'TDS-BLOCK');
    this.children.forEach((item) => {
      if (!this.modeVariant) {
        item.setAttribute('mode-variant', 'secondary');
      }
      else {
        item.setAttribute('mode-variant', this.modeVariant === 'primary' ? 'secondary' : 'primary');
      }
    });
  }
  render() {
    return (h("div", { class: `tds-block ${this.modeVariant !== null ? `tds-mode-variant-${this.modeVariant}` : ''}` }, h("slot", null)));
  }
  get host() { return this; }
  static get style() { return blockCss; }
}, [1, "tds-block", {
    "modeVariant": [1, "mode-variant"]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tds-block"];
  components.forEach(tagName => { switch (tagName) {
    case "tds-block":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TdsBlock$1);
      }
      break;
  } });
}

const TdsBlock = TdsBlock$1;
const defineCustomElement = defineCustomElement$1;

export { TdsBlock, defineCustomElement };
