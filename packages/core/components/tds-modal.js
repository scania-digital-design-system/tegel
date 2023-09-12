import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { h as hasSlot } from './utils.js';
import { d as defineCustomElement$2 } from './icon.js';

const modalCss = ":root,.tds-mode-light{--tds-modal-backdrop:rgba(0 0 0 / 40%);--tds-modal-background:var(--tds-white);--tds-modal-text:var(--tds-grey-958);--tds-modal-icon:var(--tds-black);--tds-modal-icon-native:url(\"data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M3.40338 2.34308C3.11048 2.05019 2.63561 2.05019 2.34272 2.34308C2.04982 2.63598 2.04982 3.11085 2.34272 3.40374L6.93897 8L2.34283 12.5961C2.04994 12.889 2.04994 13.3639 2.34283 13.6568C2.63572 13.9497 3.1106 13.9497 3.40349 13.6568L7.99963 9.06066L12.5958 13.6568C12.8887 13.9497 13.3635 13.9497 13.6564 13.6568C13.9493 13.3639 13.9493 12.889 13.6564 12.5961L9.06029 8L13.6565 3.40376C13.9494 3.11086 13.9494 2.63599 13.6565 2.3431C13.3636 2.0502 12.8888 2.0502 12.5959 2.3431L7.99963 6.93934L3.40338 2.34308Z' fill='black'/%3E%3C/svg%3E%0A\");--tds-modal-scrollbar:var(--tds-grey-300);--tds-modal-scrollbar-track:var(--tds-grey-300);--tds-modal-scrollbar-thumb:var(--tds-grey-500)}.tds-mode-dark{--tds-modal-backdrop:rgba(0 0 0 / 40%);--tds-modal-background:var(--tds-grey-900);--tds-modal-text:var(--tds-grey-50);--tds-modal-icon:var(--tds-white);--tds-modal-icon-native:url(\"data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M3.40338 2.34308C3.11048 2.05019 2.63561 2.05019 2.34272 2.34308C2.04982 2.63598 2.04982 3.11085 2.34272 3.40374L6.93897 8L2.34283 12.5961C2.04994 12.889 2.04994 13.3639 2.34283 13.6568C2.63572 13.9497 3.1106 13.9497 3.40349 13.6568L7.99963 9.06066L12.5958 13.6568C12.8887 13.9497 13.3635 13.9497 13.6564 13.6568C13.9493 13.3639 13.9493 12.889 13.6564 12.5961L9.06029 8L13.6565 3.40376C13.9494 3.11086 13.9494 2.63599 13.6565 2.3431C13.3636 2.0502 12.8888 2.0502 12.5959 2.3431L7.99963 6.93934L3.40338 2.34308Z' fill='white'/%3E%3C/svg%3E%0A\");--tds-modal-scrollbar:var(--tds-grey-300);--tds-modal-scrollbar-track:var(--tds-grey-300);--tds-modal-scrollbar-thumb:var(--tds-grey-500)}.tds-modal{box-sizing:border-box;background-color:var(--tds-modal-background);margin:auto;position:relative;border-radius:4px;padding:16px;max-height:85vh;overflow-y:auto;}.tds-modal *{box-sizing:border-box}.tds-modal::-webkit-scrollbar{width:5px;background-color:var(--tds-grey-300);border-radius:0 1em 1em 0}.tds-modal::-webkit-scrollbar-track{background-color:var(--tds-grey-300);border-radius:0 1em 1em 0}.tds-modal::-webkit-scrollbar-thumb{background-color:var(--tds-grey-500);border-radius:0 1em 1em 0}.tds-modal__actions-sticky{overflow:hidden}.tds-modal__actions-sticky .body{font:var(--tds-body-01);letter-spacing:var(--tds-body-01-ls);padding-bottom:96px;margin:0 -16px 0 0;max-height:calc(85vh - 36px);overflow-y:auto}.tds-modal__actions-sticky slot[name=actions]{position:absolute;bottom:-1px;left:0;right:0;background-color:var(--tds-modal-background);padding:var(--tds-spacing-element-16);display:flex;gap:16px}.tds-modal__actions-static slot[name=actions]{background-color:var(--tds-modal-background);display:flex;gap:16px}@media (min-width: 320px){.tds-modal-xs{width:100%}.tds-modal-sm{width:100%}.tds-modal-md{width:100%}.tds-modal-lg{width:100%}}@media (min-width: 672px){.tds-modal-xs{width:75%}.tds-modal-sm{width:62.5%}.tds-modal-md{width:75%}.tds-modal-lg{width:100%}}@media (min-width: 1056px){.tds-modal-xs{width:31.25%}.tds-modal-sm{width:43.75%}.tds-modal-md{width:62.5%}.tds-modal-lg{width:75%}}@media (min-width: 1312px){.tds-modal-xs{width:31.25%}.tds-modal-sm{width:37.5%}.tds-modal-md{width:62.5%}.tds-modal-lg{width:75%}}@media (min-width: 1584px){.tds-modal-xs{width:25%}.tds-modal-sm{width:37.5%}.tds-modal-md{width:50%}.tds-modal-lg{width:75%}}@media (max-width: 320px){.tds-modal-md,.tds-modal-lg,.tds-modal-sm{height:100%}.tds-modal-md slot[name=actions]::slotted(*),.tds-modal-lg slot[name=actions]::slotted(*),.tds-modal-sm slot[name=actions]::slotted(*){display:flex}}.header{display:flex;padding-bottom:var(--tds-spacing-element-8);position:sticky;top:0;background-color:var(--tds-modal-background);z-index:1}.header::before{content:\" \";position:absolute;height:16px;top:-16px;width:100%;background-color:var(--tds-modal-background)}.header,slot[name=header]::slotted(*){color:var(--tds-modal-text);font:var(--tds-headline-05);letter-spacing:var(--tds-headline-05-ls);margin:0;flex:1}.body{color:var(--tds-modal-text);font:var(--tds-body-01);letter-spacing:var(--tds-body-01-ls);padding-bottom:40px;overflow-y:visible;padding-right:16px;}.body::-webkit-scrollbar{width:5px;background-color:var(--tds-grey-300)}.body::-webkit-scrollbar-track{background-color:var(--tds-grey-300)}.body::-webkit-scrollbar-thumb{background-color:var(--tds-grey-500)}@media (min-width: 1056px){.body{padding-right:64px}}.tds-modal-backdrop{box-sizing:border-box;left:0;top:0;position:fixed;height:100%;width:100%;z-index:700;background-color:var(--tds-modal-backdrop);padding:0 16px}.tds-modal-backdrop *{box-sizing:border-box}@media (max-width: 320px){.tds-modal-backdrop{padding:0}}.tds-modal-backdrop.show{display:flex}.tds-modal-backdrop.hide{display:none}button.tds-modal-close{margin:0 0 auto auto;background-color:transparent;border:0;padding:0;appearance:unset}.tds-modal-close{display:inline-block;height:auto;color:var(--tds-modal-icon);cursor:pointer}.tds-modal-close:focus{outline:2px solid var(--tds-blue-400);outline-offset:-2px}@media (min-width: 320px){.tds-modal-close{margin-left:var(--tds-spacing-element-16)}}@media (min-width: 1056px){.tds-modal-close{margin-left:var(--tds-spacing-element-48)}}.tds-modal-close-btn{display:inline-block;height:auto;background-repeat:no-repeat;cursor:pointer}@media (min-width: 320px){.tds-modal-close-btn{margin-left:var(--tds-spacing-element-16)}}@media (min-width: 1056px){.tds-modal-close-btn{margin-left:var(--tds-spacing-element-48)}}.tds-modal-close-btn svg{fill:var(--tds-modal-icon)}.tds-modal-overflow{overflow:hidden}:host{left:0;top:0;position:fixed;height:100%;width:100%;z-index:700;background-color:var(--tds-modal-backdrop);padding:0 16px}@media (max-width: 320px){:host{padding:0}}:host.show{display:flex}:host.hide{display:none}:host .tds-modal-close{border:none;background-color:transparent}:host .tds-modal-close-btn{border:none;background-color:transparent}:host(.show){display:flex}:host(.hide){display:none}";

const TdsModal$1 = /*@__PURE__*/ proxyCustomElement(class TdsModal extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.tdsClose = createEvent(this, "tdsClose", 7);
    this.handleClose = (event) => {
      const closeEvent = this.tdsClose.emit(event);
      if (!closeEvent.defaultPrevented) {
        this.isShown = false;
      }
    };
    this.handleShow = () => {
      this.isShown = true;
    };
    /** Adds an event listener to the reference element that shows/closes the Modal. */
    this.initializeReferenceElement = (referenceEl) => {
      if (referenceEl) {
        referenceEl.addEventListener('click', (event) => {
          if (this.isShown) {
            this.handleClose(event);
          }
          else {
            this.handleShow();
          }
        });
      }
    };
    /** Check if there is a referenceElement or selector and adds event listener to them if so. */
    this.setShowButton = () => {
      var _a;
      if (this.selector || this.referenceEl) {
        const referenceEl = (_a = this.referenceEl) !== null && _a !== void 0 ? _a : document.querySelector(this.selector);
        if (referenceEl) {
          this.initializeReferenceElement(referenceEl);
        }
      }
    };
    this.header = undefined;
    this.prevent = false;
    this.size = 'md';
    this.actionsPosition = 'static';
    this.selector = undefined;
    this.referenceEl = undefined;
    this.show = undefined;
    this.isShown = false;
  }
  /** Shows the Modal.  */
  async showModal() {
    this.isShown = true;
  }
  /** Closes the Modal. */
  async closeModal() {
    this.isShown = false;
  }
  connectedCallback() {
    if (this.show !== null) {
      this.isShown = this.show;
    }
    this.setDismissButtons();
    this.setShowButton();
    if (this.header && hasSlot('header', this.host)) {
      console.warn("Tegel Modal component: Using both header prop and header slot might break modal's design. Please use just one of them. ");
    }
  }
  /** Checks if click on Modal is on overlay, if so it closes the Modal if prevent is not true. */
  handleOverlayClick(event) {
    const targetList = event.composedPath();
    const target = targetList[0];
    if (target.classList[0] === 'tds-modal-close' ||
      (target.classList[0] === 'tds-modal-backdrop' && this.prevent === false)) {
      this.handleClose(event);
    }
  }
  /** Adds an event listener to the dismiss buttons that closes the Modal. */
  setDismissButtons() {
    this.host.querySelectorAll('[data-dismiss-modal]').forEach((dismissButton) => {
      dismissButton.addEventListener('click', (event) => {
        this.handleClose(event);
      });
    });
  }
  render() {
    const usesHeaderSlot = hasSlot('header', this.host);
    const usesActionsSlot = hasSlot('actions', this.host);
    return (h(Host, { onClick: (event) => {
        this.handleOverlayClick(event);
      }, class: `tds-modal-backdrop ${this.isShown ? 'show' : 'hide'}` }, h("div", { class: `tds-modal tds-modal__actions-${this.actionsPosition} tds-modal-${this.size}` }, h("div", { class: "header" }, this.header && h("div", { class: "header" }, this.header), usesHeaderSlot && h("slot", { name: "header" }), h("button", { class: "tds-modal-close", "aria-label": "close", onClick: (event) => {
        this.handleClose(event);
      } }, h("tds-icon", { name: "cross", size: "20px" }))), h("div", { class: "body" }, h("slot", { name: "body" })), usesActionsSlot && h("slot", { name: "actions" }))));
  }
  get host() { return this; }
  static get style() { return modalCss; }
}, [1, "tds-modal", {
    "header": [1],
    "prevent": [4],
    "size": [1],
    "actionsPosition": [1, "actions-position"],
    "selector": [1],
    "referenceEl": [16],
    "show": [4],
    "isShown": [32],
    "showModal": [64],
    "closeModal": [64]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tds-modal", "tds-icon"];
  components.forEach(tagName => { switch (tagName) {
    case "tds-modal":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TdsModal$1);
      }
      break;
    case "tds-icon":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const TdsModal = TdsModal$1;
const defineCustomElement = defineCustomElement$1;

export { TdsModal, defineCustomElement };
