import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { i as inheritAriaAttributes } from './utils.js';
import { d as defineCustomElement$2 } from './icon.js';

const sideMenuCloseButtonCss = ":host button{height:64px;width:100%;text-align:left;padding:0 24px;border:none;background-color:var(--tds-sidebar-side-menu-background-cover);font:var(--tds-headline-07);letter-spacing:var(--tds-headline-07-ls);color:var(--tds-sidebar-side-menu-single-item-color);display:flex;align-items:center;border-bottom:1px solid var(--tds-sidebar-side-menu-bottom-menu-border-top)}:host button:hover{cursor:pointer;background-color:var(--tds-sidebar-item-state-hover)}:host button:focus-visible{cursor:pointer;border:1px solid var(--tds-sidebar-side-menu-single-subitem-selected-border-color)}";

const TdsSideMenuCloseButton$1 = /*@__PURE__*/ proxyCustomElement(class TdsSideMenuCloseButton extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
  }
  render() {
    const buttonProps = Object.assign({ 'aria-label': 'Close' }, inheritAriaAttributes(this.host));
    return (h(Host, null, h("button", Object.assign({}, buttonProps), h("tds-icon", { name: "cross", size: "20px" }))));
  }
  get host() { return this; }
  static get style() { return sideMenuCloseButtonCss; }
}, [1, "tds-side-menu-close-button"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tds-side-menu-close-button", "tds-icon"];
  components.forEach(tagName => { switch (tagName) {
    case "tds-side-menu-close-button":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TdsSideMenuCloseButton$1);
      }
      break;
    case "tds-icon":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const TdsSideMenuCloseButton = TdsSideMenuCloseButton$1;
const defineCustomElement = defineCustomElement$1;

export { TdsSideMenuCloseButton, defineCustomElement };
