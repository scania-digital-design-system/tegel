import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { i as inheritAriaAttributes } from './utils.js';
import { d as defineCustomElement$3 } from './core-header-item.js';
import { d as defineCustomElement$2 } from './header-item.js';
import { d as defineCustomElement$1 } from './icon.js';

const headerLauncherButtonCss = ":host{display:block}:host tds-header-item{display:block}:host .icon{position:relative;margin-left:-6px;left:3px;transition:all 0.2s ease-in-out}";

const TdsHeaderLauncherButton = /*@__PURE__*/ proxyCustomElement(class TdsHeaderLauncherButton extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.active = false;
  }
  render() {
    this.ariaAttributes = Object.assign(Object.assign({}, this.ariaAttributes), inheritAriaAttributes(this.host));
    const buttonProps = Object.assign({}, this.ariaAttributes);
    return (h(Host, null, h("tds-header-item", { active: this.active }, h("button", Object.assign({}, buttonProps), h("tds-icon", { class: "icon", name: "bento", size: "20px" })))));
  }
  get host() { return this; }
  static get style() { return headerLauncherButtonCss; }
}, [1, "tds-header-launcher-button", {
    "active": [4]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tds-header-launcher-button", "tds-core-header-item", "tds-header-item", "tds-icon"];
  components.forEach(tagName => { switch (tagName) {
    case "tds-header-launcher-button":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TdsHeaderLauncherButton);
      }
      break;
    case "tds-core-header-item":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "tds-header-item":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "tds-icon":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { TdsHeaderLauncherButton as T, defineCustomElement as d };
