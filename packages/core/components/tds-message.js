import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { d as defineCustomElement$2 } from './icon.js';

const messageCss = ":host .wrapper{display:flex;padding:16px;background-color:var(--tds-message-background);border-radius:4px}:host .wrapper.information{border-left:4px solid var(--tds-information)}:host .wrapper.information tds-icon{color:var(--tds-information)}:host .wrapper.success{border-left:4px solid var(--tds-positive)}:host .wrapper.success tds-icon{color:var(--tds-positive)}:host .wrapper.error{background-color:var(--tds-message-type-error-background);border-left:4px solid var(--tds-negative)}:host .wrapper.error tds-icon{color:var(--tds-negative)}:host .wrapper.warning{border-left:4px solid var(--tds-warning)}:host .wrapper.warning tds-icon{color:var(--tds-warning)}:host .wrapper.minimal{border:none;display:flex;align-items:center;padding:0;background-color:transparent}:host .wrapper.minimal .header{font:var(--tds-detail-02);letter-spacing:var(--tds-detail-02-ls)}:host .wrapper.minimal.error .header{color:var(--tds-negative)}:host tds-icon{padding-right:16px}:host .content{display:flex;flex-direction:column;gap:4px;color:var(--tds-message-color);padding:2px 0}:host .content .header{font:var(--tds-headline-07);letter-spacing:var(--tds-headline-07-ls)}:host .content .extended-message{color:var(--tds-message-color);font:var(--tds-detail-02);letter-spacing:var(--tds-detail-02-ls)}:host .tds-mode-variant-primary{--tds-message-background:var(--tds-message-background-primary)}:host .tds-mode-variant-secondary{--tds-message-background:var(--tds-message-background-secondary)}";

const TdsMessage$1 = /*@__PURE__*/ proxyCustomElement(class TdsMessage extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.getIconName = () => {
      switch (this.variant) {
        case 'information':
          return 'info';
        case 'error':
          return 'error';
        case 'warning':
          return 'warning';
        case 'success':
          return 'tick';
        default:
          return 'info';
      }
    };
    this.header = undefined;
    this.modeVariant = null;
    this.variant = 'information';
    this.noIcon = false;
    this.minimal = false;
  }
  render() {
    return (h(Host, null, h("div", { class: `
        wrapper ${this.variant}
        ${this.minimal ? 'minimal' : ''}
        ${this.modeVariant !== null ? `tds-mode-variant-${this.modeVariant}` : ''}` }, !this.noIcon && h("tds-icon", { name: this.getIconName(), size: "20px" }), h("div", { class: `content` }, this.header && h("div", { class: "header" }, this.header), !this.minimal && (h("div", { class: "extended-message" }, h("slot", null)))))));
  }
  static get style() { return messageCss; }
}, [1, "tds-message", {
    "header": [1],
    "modeVariant": [1, "mode-variant"],
    "variant": [1],
    "noIcon": [4, "no-icon"],
    "minimal": [4]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tds-message", "tds-icon"];
  components.forEach(tagName => { switch (tagName) {
    case "tds-message":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TdsMessage$1);
      }
      break;
    case "tds-icon":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const TdsMessage = TdsMessage$1;
const defineCustomElement = defineCustomElement$1;

export { TdsMessage, defineCustomElement };
