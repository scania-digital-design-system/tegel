import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { h as hasSlot } from './utils.js';

const footerCss = ":host{display:block}:host slot[name=top]::slotted(*){box-sizing:border-box;background-color:var(--tds-footer-top-background);padding:40px;display:grid;grid-template-columns:repeat(4, 1fr);row-gap:40px;width:100%}:host .footer-main{background-color:var(--tds-footer-main-background);padding:0 40px}:host .footer-main-top{padding:40px 0;display:flex;justify-content:space-between}:host slot[name=start]::slotted(*),:host slot[name=end]::slotted(*){display:flex;column-gap:24px}:host .footer-main-bottom{padding:40px 0;display:flex;justify-content:space-between;border-top:1px solid var(--tds-footer-main-divider)}:host .footer-main-bottom small.copyright{margin:0;font:var(--tds-detail-02);letter-spacing:var(--tds-detail-02-ls);color:var(--tds-footer-main-copyright)}:host .footer-main-bottom .brand{background-image:var(--tds-background-image-scania-wordmark-white-svg);background-repeat:no-repeat;background-size:117px;background-position:right;width:117px;height:20px}:host .footer-main-bottom .brand p{color:transparent;padding:0;margin:0;height:100%;visibility:hidden}@media all and (max-width: 992px){:host slot[name=top]::slotted(*){display:block;width:100%;padding:0}:host .footer-main{padding:0 24px}:host .footer-main-top{flex-direction:column;row-gap:48px;padding:24px 0}:host slot[name=end]::slotted(*){flex-direction:row;gap:8px}:host .footer-main-bottom{flex-direction:column;padding-bottom:32px}:host .footer-main-bottom p.copyright{padding-bottom:96px}:host .footer-main-bottom .brand{width:100%}}";

const TdsFooter$1 = /*@__PURE__*/ proxyCustomElement(class TdsFooter extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.modeVariant = null;
  }
  render() {
    const usesTopSlot = hasSlot('top', this.host);
    const usesStartSlot = hasSlot('start', this.host);
    const usesEndSlot = hasSlot('end', this.host);
    return (h(Host, { class: `${this.modeVariant ? `tds-mode-variant-${this.modeVariant}` : ''}` }, h("footer", null, usesTopSlot && h("slot", { name: "top" }), h("div", { class: "footer-main" }, h("div", { class: "footer-main-top" }, usesStartSlot && h("slot", { name: "start" }), usesEndSlot && h("slot", { name: "end" })), h("div", { class: "footer-main-bottom" }, h("small", { class: "copyright" }, "Copyright \u00A9 ", new Date().getFullYear(), " Scania"), h("div", { class: "brand" }, h("p", null, "Scania")))))));
  }
  get host() { return this; }
  static get style() { return footerCss; }
}, [1, "tds-footer", {
    "modeVariant": [1, "mode-variant"]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tds-footer"];
  components.forEach(tagName => { switch (tagName) {
    case "tds-footer":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TdsFooter$1);
      }
      break;
  } });
}

const TdsFooter = TdsFooter$1;
const defineCustomElement = defineCustomElement$1;

export { TdsFooter, defineCustomElement };
