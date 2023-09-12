import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { g as generateUniqueId, h as hasSlot } from './utils.js';
import { d as defineCustomElement$2 } from './icon.js';

const toastCss = ":host(.hide){display:none;visibility:hidden}:host{z-index:800}:host .wrapper{display:flex;width:348px;background-color:var(--tds-toast-background-color);border-radius:4px}:host .wrapper.information{border-left:4px solid var(--tds-information)}:host .wrapper.information tds-icon{color:var(--tds-information)}:host .wrapper.success{border-left:4px solid var(--tds-positive)}:host .wrapper.success tds-icon{color:var(--tds-positive)}:host .wrapper.error{border-left:4px solid var(--tds-negative)}:host .wrapper.error tds-icon{color:var(--tds-negative)}:host .wrapper.warning{border-left:4px solid var(--tds-warning)}:host .wrapper.warning tds-icon{color:var(--tds-warning)}:host .wrapper button.close{height:20px;width:20px;display:flex;align-items:center;justify-content:center;margin:14px 14px 0 0;border:none;background:transparent}:host .wrapper button.close:hover{cursor:pointer}:host .wrapper button.close:focus{outline:2px solid var(--tds-blue-400);outline-offset:-2px}:host .wrapper button.close tds-icon{color:var(--tds-toast-dissmiss-color);padding:0}:host tds-icon{padding:14px 0 0 12px}:host .content{padding:16px 0 16px 10px;display:flex;flex-direction:column;flex:1}:host .content .header-subheader{display:flex;flex-direction:column;gap:4px}:host .content .header,:host .content slot[name=header]::slotted(*){font:var(--tds-headline-07);letter-spacing:var(--tds-headline-07-ls);color:var(--tds-toast-headline-color)}:host .content .subheader,:host .content slot[name=subheader]::slotted(*){color:var(--tds-toast-subheadline-color);font:var(--tds-detail-02);letter-spacing:var(--tds-detail-02-ls);max-width:252px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host .content .subheader.no-link slot::slotted(*),:host .content slot[name=subheader]::slotted(*).no-link slot::slotted(*){padding-bottom:0}:host .content .toast-bottom{margin-top:12px}:host slot[name=actions]::slotted(*){color:var(--tds-toast-link-color)}:host .tds-mode-variant-primary{--tds-toast-background:var(--tds-toast-background-primary)}:host .tds-mode-variant-secondary{--tds-toast-background:var(--tds-toast-background-secondary)}";

const TdsToast$1 = /*@__PURE__*/ proxyCustomElement(class TdsToast extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.tdsClose = createEvent(this, "tdsClose", 7);
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
    this.handleClose = () => {
      const tdsCloseEvent = this.tdsClose.emit({
        toastId: this.toastId,
      });
      if (!tdsCloseEvent.defaultPrevented) {
        this.hidden = true;
      }
    };
    this.handleShow = () => {
      const tdsCloseEvent = this.tdsClose.emit({
        toastId: this.toastId,
      });
      if (!tdsCloseEvent.defaultPrevented) {
        this.hidden = false;
      }
    };
    this.toastId = generateUniqueId();
    this.header = undefined;
    this.subheader = undefined;
    this.variant = 'information';
    this.hidden = false;
    this.toastRole = 'alert';
  }
  /** Hides the Toast. */
  async hideToast() {
    this.hidden = true;
  }
  /** Shows the Toast. */
  async showToast() {
    this.hidden = false;
  }
  render() {
    const usesHeaderSlot = hasSlot('header', this.host);
    const usesSubheaderSlot = hasSlot('subheader', this.host);
    const usesActionsSlot = hasSlot('actions', this.host);
    return (h(Host, { toastRole: this.toastRole, "aria-describedby": this.host.getAttribute('aria-describedby'), class: `${this.hidden ? 'hide' : 'show'}` }, h("div", { class: `
            wrapper
            ${this.variant}` }, h("tds-icon", { name: this.getIconName(), size: "20px" }), h("div", { class: `content` }, h("div", { class: "header-subheader" }, this.header && h("div", { class: "header" }, this.header), usesHeaderSlot && h("slot", { name: "header" }), this.subheader && h("div", { class: "subheader" }, this.subheader), usesSubheaderSlot && h("slot", { name: "subheader" })), usesActionsSlot && (h("div", { class: `toast-bottom ${usesSubheaderSlot || this.subheader ? 'subheader' : 'no-subheader'}` }, h("slot", { name: "actions" })))), h("button", { onClick: () => {
        this.handleClose();
      }, class: `close` }, h("tds-icon", { name: "cross", size: "20px" })))));
  }
  get host() { return this; }
  static get style() { return toastCss; }
}, [1, "tds-toast", {
    "toastId": [1, "toast-id"],
    "header": [1],
    "subheader": [1],
    "variant": [1],
    "hidden": [516],
    "toastRole": [1, "toast-role"],
    "hideToast": [64],
    "showToast": [64]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tds-toast", "tds-icon"];
  components.forEach(tagName => { switch (tagName) {
    case "tds-toast":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TdsToast$1);
      }
      break;
    case "tds-icon":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const TdsToast = TdsToast$1;
const defineCustomElement = defineCustomElement$1;

export { TdsToast, defineCustomElement };
