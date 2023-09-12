import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { g as generateUniqueId, h as hasSlot } from './utils.js';
import { d as defineCustomElement$2 } from './icon.js';

const bannerCss = ":root,.tds-mode-light{--tds-link:var(--tds-blue-500);--tds-link-hover:var(--tds-blue-400);--tds-link-focus:var(--tds-blue-400);--tds-link-visited:var(--tds-grey-900);--tds-link-disabled:var(--tds-grey-400)}:root tds-toast,.tds-mode-light tds-toast{--tds-link:var(--tds-blue-300);--tds-link-hover:var(--tds-blue-400);--tds-link-focus:var(--tds-blue-400);--tds-link-visited:var(--tds-blue-100);--tds-link-disabled:var(--tds-grey-800)}.tds-mode-dark{--tds-link:var(--tds-blue-300);--tds-link-hover:var(--tds-blue-400);--tds-link-focus:var(--tds-blue-400);--tds-link-visited:var(--tds-blue-100);--tds-link-disabled:var(--tds-grey-800)}.tds-mode-dark tds-toast{--tds-link:var(--tds-blue-500);--tds-link-hover:var(--tds-blue-400);--tds-link-focus:var(--tds-blue-400);--tds-link-visited:var(--tds-grey-900);--tds-link-disabled:var(--tds-grey-400)}:host(.hide){display:none;visibility:hidden}:host(.error){background-color:var(--tds-banner-background-error)}:host(.information){background-color:var(--tds-banner-background-info)}:host{display:flex;background-color:var(--tds-banner-background-default);z-index:400}:host .banner-icon{padding-left:20px;padding-top:14px;padding-right:12px;color:var(--tds-banner-prefix-default-color)}:host .banner-icon.error{color:var(--tds-banner-prefix-error-color)}:host .banner-icon.information{color:var(--tds-banner-prefix-info-color)}:host .content{color:var(--tds-banner-text-color);display:flex;flex-direction:column;flex-grow:1;padding:16px 0}:host .content.no-icon{padding-left:16px}:host .header-subheader{display:flex;flex-direction:column;gap:4px}:host .header,:host slot[name=header]{font:var(--tds-headline-06);letter-spacing:var(--tds-headline-06-ls)}:host .subheader,:host slot[name=subheader]{display:block;font:var(--tds-detail-02);letter-spacing:var(--tds-detail-02-ls)}:host slot[name=actions]::slotted(*){display:block;width:fit-content;margin-top:16px}:host .banner-close{color:var(--tds-banner-x-color)}:host .banner-close button{padding-right:16px;padding-top:14px;background-color:transparent;border:none;color:var(--tds-banner-x-color)}:host .banner-close button:hover{cursor:pointer}:host .banner-close button:focus-visible{outline:none}:host .banner-close button:focus-visible tds-icon{outline:2px solid var(--tds-blue-400);outline-offset:-2px}";

const TdsBanner$1 = /*@__PURE__*/ proxyCustomElement(class TdsBanner extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.tdsClose = createEvent(this, "tdsClose", 7);
    this.handleClose = () => {
      const tdsCloseEvent = this.tdsClose.emit({
        bannerId: this.bannerId,
      });
      if (!tdsCloseEvent.defaultPrevented) {
        this.hidden = true;
      }
    };
    this.icon = undefined;
    this.header = undefined;
    this.subheader = undefined;
    this.variant = 'default';
    this.bannerId = generateUniqueId();
    this.hidden = false;
  }
  /** Hides the Banner. */
  async hideBanner() {
    this.hidden = true;
  }
  /** Shows the Banner */
  async showBanner() {
    this.hidden = false;
  }
  connectedCallback() {
    if (this.variant === 'error') {
      this.icon = 'error';
    }
    else if (this.variant === 'information') {
      this.icon = 'info';
    }
  }
  render() {
    const usesHeaderSlot = hasSlot('subheader', this.host);
    const usesSubheaderSlot = hasSlot('subheader', this.host);
    const usesActionsSlot = hasSlot('actions', this.host);
    return (h(Host, { role: "banner", "aria-hidden": `${this.hidden}`, "aria-live": this.host.getAttribute('aria-live') ? this.host.getAttribute('aria-live') : 'polite', "aria-atomic": this.host.getAttribute('aria-atomic'), class: `${this.variant} ${this.hidden ? 'hide' : 'show'}` }, this.icon && (h("div", { class: `banner-icon ${this.variant}` }, h("tds-icon", { name: this.icon, size: "20px" }))), h("div", { class: "content" }, h("div", { class: "header-subheader" }, this.header && h("div", { class: "header" }, this.header), usesHeaderSlot && h("slot", { name: "header" }), this.subheader && h("div", { class: "subheader" }, this.subheader), usesSubheaderSlot && h("slot", { name: "subheader" })), usesActionsSlot && h("slot", { name: "actions" })), h("div", { class: `banner-close` }, h("button", { onClick: () => {
        this.handleClose();
      } }, h("tds-icon", { name: "cross", size: "20px" })))));
  }
  get host() { return this; }
  static get style() { return bannerCss; }
}, [1, "tds-banner", {
    "icon": [1],
    "header": [1],
    "subheader": [1],
    "variant": [1],
    "bannerId": [1, "banner-id"],
    "hidden": [516],
    "hideBanner": [64],
    "showBanner": [64]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tds-banner", "tds-icon"];
  components.forEach(tagName => { switch (tagName) {
    case "tds-banner":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TdsBanner$1);
      }
      break;
    case "tds-icon":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const TdsBanner = TdsBanner$1;
const defineCustomElement = defineCustomElement$1;

export { TdsBanner, defineCustomElement };
